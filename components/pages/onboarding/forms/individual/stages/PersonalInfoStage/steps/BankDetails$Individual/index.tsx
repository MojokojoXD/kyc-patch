import { useKYCFormContext } from '@/components/pages/onboarding/forms/utils/formController';
import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/UIcomponents/ui/accordion';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import FormFactory from '@/components/UIcomponents/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import { useAsyncAction } from '@/components/pages/onboarding/forms/utils/customHooks/useAsyncAction';
import Loading from '@/components/UIcomponents/Loading';
import { getBankList } from '@/utils/vars/banks';
import { useMemo } from 'react';
import { FormFieldAggregator } from '@/components/pages/onboarding/forms/utils/FormFieldAggregator';
import { bankDetailsModel$Individual } from './model/bankDetailsModel$Individual';
import type { Path } from 'react-hook-form';

export const BankDetails$Individual: FormStep = ({ countryList }) => {
	const {
		form: { getValues },
	} = useKYCFormContext<IndividualFormSchema>();
	const [bankList, loading, error] = useAsyncAction(getBankList);

	const applicants = getValues('applicant') ?? [];

	if (error.flag) {
		console.log(error.message);
		return <p className='p-10'>Something went wrong! Please try again later.</p>;
	}

	return (
		<>
			<Loading reveal={loading} />
			<FormHeader>
				<FormTitle>Settlement Bank Account</FormTitle>
				<FormSubHeader>Enter your bank account information.</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-[8px] py-5'>
					{applicants.map((a, i) => {
						return (
							<Accordion
								key={a.id}
								type='single'
								defaultValue='item-0'
								collapsible>
								<AccordionItem value={`item-${i}`}>
									<AccordionTrigger>
										Applicant #{i + 1}: {a.firstName} {a.lastName}
									</AccordionTrigger>
									<AccordionContent
										className='data-[state=closed]:hidden py-10'
										forceMount>
										<BankForm
											applicantId={i}
											countryList={countryList}
											bankList={bankList || []}
										/>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						);
					})}
				</div>
			</FormContent>
		</>
	);
};

type BankFormProps = SingleFormFieldsGeneratorProps & {
	bankList: Awaited<ReturnType<typeof getBankList>>;
};

function BankForm({ applicantId, countryList = [], bankList }: BankFormProps) {
	const {
		form: { watch },
	} = useKYCFormContext<IndividualFormSchema>();

	const currentBankCountry = watch(
		`applicant.${applicantId}.bank.locale.country`
	);
	const currentResidence = watch(`applicant.${applicantId}.countryOfResidence`);

	const bankFieldName =
		`applicant.${applicantId}.bank.locale.name` as Path<IndividualFormSchema>;

	const aggregatorResults = useMemo(() => {
		const rawFields = bankDetailsModel$Individual({
			index: applicantId,
			countryList,
			bankList,
		});
		const aggregator = new FormFieldAggregator(rawFields);

		const isPriorityCountry = ['KENYA', 'GHANA', 'NIGERIA'].includes(
			currentBankCountry
		);

		!isPriorityCountry &&
			aggregator.modifyFields(bankFieldName, (f) => {
				return {
					...f,
					fieldType: 'text',
					placeholder: 'Enter bank name',
					rules: {
						required: 'Please enter bank name',
					},
				};
			});

		aggregator.modifyFields('KE', {
			required: currentResidence === 'KENYA',
		});

		aggregator.modifyFields('NG', {
			required: currentResidence === 'NIGERIA',
		});

		return aggregator.generate();
	}, [
		applicantId,
		countryList,
		bankList,
		currentResidence,
		currentBankCountry,
		bankFieldName,
	]);

	// useEffect(() => {
	// 	resetField(bankFieldName, { defaultValue: '' });
	// }, [ currentBankCountry, bankFieldName, resetField ] );

	return (
		<>
			{aggregatorResults.map((f) => (
				<FormFactory
					key={f.name}
					{...f}
				/>
			))}
		</>
	);
}

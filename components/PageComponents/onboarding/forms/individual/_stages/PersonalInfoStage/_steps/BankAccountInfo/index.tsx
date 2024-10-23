import { useFormContext } from 'react-hook-form';
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
import type { IndividualFormSchema } from '@/types/forms/individual';
import FormFactory from '@/components/UIcomponents/FormFactory';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import { useAsyncAction } from '@/customHooks/useAsyncAction';
import Loading from '@/components/UIcomponents/Loading';
import { getBankList } from '@/utils/vars/banks';
import { useMemo, useEffect } from 'react';
import { FormFieldAggregator } from '@/components/PageComponents/onboarding/forms/individual/utils/FormFieldAggregator';
import { bankAccountModel } from './formBuilder/bankAccountFormFields';
import { priorityCountries } from '@/utils/vars/countries';
import type { Path } from 'react-hook-form';

export const BankAccountInfo: FormStep = ({
	applicantCount,
	countryList,
}) => {
	const { getValues } = useFormContext<IndividualFormSchema>();
	const [bankList, loading, error] = useAsyncAction(getBankList);

	if (error.flag) {
		console.log(error.message);
		return (
			<p className='p-10'>
				Something went wrong! Please try again later.
			</p>
		);
	}

	return (
		<>
			{loading && <Loading />}
			<FormHeader>
				<FormTitle>Settlement Bank Account</FormTitle>
				<FormSubHeader>
					Enter your bank account information.
				</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-[8px] py-5'>
					{[...Array(applicantCount).keys()].map((c) => {
						const firstName = getValues(`applicant.${c}.firstName`);
						const lastName = getValues(`applicant.${c}.lastName`);

						return (
							<Accordion
								key={c}
								type='single'
								defaultValue='item-0'
								collapsible>
								<AccordionItem value={`item-${c}`}>
									<AccordionTrigger>
										Applicant #{c + 1}: {firstName} {lastName}
									</AccordionTrigger>
									<AccordionContent
										className='data-[state=closed]:hidden pb-16'
										forceMount>
										<BankForm
											applicantId={c}
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

function BankForm({
	applicantId,
	countryList = [],
	bankList,
}: BankFormProps) {
	const { watch, resetField } = useFormContext<IndividualFormSchema>();

	const currentBankCountry = watch(
		`applicant.${applicantId}.bank.country`
	);
	const currentResidence = watch(
		`applicant.${applicantId}.countryOfResidence`
	);

	const bankFieldName =
		`applicant.${applicantId}.bank.name` as Path<IndividualFormSchema>;

	const currentBankCountryCode =
		FormHelpers.getCodeFromFullCountryName(
			currentBankCountry,
			countryList
		) ?? '';

	const aggregatorResults = useMemo(() => {
		const rawFields = bankAccountModel({
			index: applicantId,
			countryList,
			bankList,
		});
		const aggregator = new FormFieldAggregator(rawFields);

		const isPriorityCountry = priorityCountries.includes(
			currentBankCountryCode
		);

		!isPriorityCountry &&
			aggregator.modifyFields(
				`applicant.${applicantId}.bank.name`,
				(f) => {
					return {
						...f,
						fieldType: 'text',
						placeholder: 'Enter bank name',
						rules: {
							required: 'Please enter bank name',
						},
					};
				}
            );
        
        aggregator.modifyFields( 'KE', {
            required: currentResidence === 'KENYA'
        } )
        
        aggregator.modifyFields( 'NG', {
            required: currentResidence === 'NIGERIA'
        })

		return aggregator.generate();
	}, [applicantId, countryList, bankList, currentResidence]);

	useEffect(() => {
		resetField(bankFieldName, { defaultValue: '' });
	}, [currentBankCountry, bankFieldName, resetField]);

	return (
		<>
			{aggregatorResults.fields.map((f) => (
				<FormFactory
					key={f.name}
					{...f}
				/>
			))}
		</>
	);
}

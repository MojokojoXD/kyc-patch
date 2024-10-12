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
import type { BankList } from '@/types/forms/universal';
import { useMemo, useEffect } from 'react';
import { FormFieldAggregator } from '@/components/PageComponents/onboarding/forms/utils/FormFieldAggregator';
import { bankAccountModel } from './formBuilder/bankAccountFormFields';
import { priorityCountries } from '@/utils/vars/countries';

export const BankAccountInfo: FormStep = ({
	applicantCount,
	passCountryList,
	passBrokerInfo,
}) => {
	const { getValues } = useFormContext<IndividualFormSchema>();
	const [bankList, loading, error] = useAsyncAction(getBankList);

	const countryList = passCountryList?.call(this, true);
	const broker = passBrokerInfo?.call(this, true);

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
										className='data-[state=closed]:hidden'
										forceMount>
										<BankForm
											applicantId={c}
											countryList={countryList}
											bankList={bankList || []}
											broker={broker}
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
	bankList: Banklist[];
};

function BankForm({
	applicantId,
	countryList,
	bankList,
	broker = { org_code: 'AFRIN' },
}: BankFormProps) {
	const { watch, getValues, resetField } =
		useFormContext<IndividualFormSchema>();

	const currentBankCountry = watch(
		`applicant.${applicantId}.bank.country`
	);
	const currentNationality = getValues(
		`applicant.${applicantId}.countryOfCitizenship`
	);

	const bankFieldName = `applicant.${applicantId}.bank.name`;

	const currentBankCountryCode =
		FormHelpers.getCodeFromFullCountryName(
			currentBankCountry,
			countryList
		);
	const currentNationalityCode =
		FormHelpers.getCodeFromFullCountryName(
			currentNationality,
			countryList
		);

	const aggregatorResults = useMemo(() => {
		const aggregator = new FormFieldAggregator(bankAccountModel).init(
			broker?.org_code,
			{
				index: applicantId,
				countryList,
				bankList,
			}
		);

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

		aggregator.modifyFields('local', {
			required:
				currentNationalityCode === 'NG' && broker.org_code === 'AFRIN',
		});

		return aggregator.generate();
	}, [applicantId, countryList, bankList, currentBankCountryCode]);

	useEffect(() => {
		resetField(bankFieldName, { defaultValue: '' });
	}, [currentBankCountry]);

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

import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import FormFactory from '@/components/UIcomponents/FormFactory';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import { useAsyncAction } from '@/customHooks/useAsyncAction';
import Loading from '@/components/UIcomponents/Loading';
import { getBankList } from '@/utils/vars/banks';
import { useMemo, useEffect } from 'react';
import { FormFieldAggregator } from '@/components/pages/onboarding/forms/utils/FormFieldAggregator';
import { priorityCountries } from '@/utils/vars/countries';
import { accountDetailsModel$Corporate } from './model/accountDetailsModel$Corporate';
import { useKYCFormContext } from '@/components/pages/onboarding/forms/utils/formController';

export const AccountDetails$Corporate: FormStep = ({ countryList }) => {
	const [bankList, loading, error] = useAsyncAction(getBankList);

	if (error.flag) {
		console.log(error.message);
		return <p className='p-10'>Something went wrong! Please try again later.</p>;
	}

	return (
		<>
			{loading && <Loading />}
			<FormHeader>
				<FormTitle>Settlement Account Details</FormTitle>
				<FormSubHeader>Enter the required information below.</FormSubHeader>
			</FormHeader>
            <FormContent>
                <div className='space-y-[40px]'>

					<BankForm
						countryList={countryList}
						bankList={bankList || []}
					/>
                </div>
			</FormContent>
		</>
	);
};

type BankFormProps = Omit<SingleFormFieldsGeneratorProps,'applicantId'> & {
	bankList: Awaited<ReturnType<typeof getBankList>>;
};

function BankForm( { countryList = [], bankList }: BankFormProps )
{
    const { form } = useKYCFormContext();
    const { watch, resetField } = form;

	const currentBankCountry = watch(`settlementAccount.bank.locale.country`) as string;
	const currentCountryOfIncorporation = watch(`businessInfo.details.countryOfIncorporation`) as string;

	const bankFieldName =
		`settlement.bank.locale.name` as const;

	const currentBankCountryCode =
		FormHelpers.getCodeFromFullCountryName(currentBankCountry, countryList) ?? '';

	const aggregatorResults = useMemo(() => {
		const rawFields = accountDetailsModel$Corporate({
			countryList,
			bankList,
		});
		const aggregator = new FormFieldAggregator(rawFields);

		const isPriorityCountry = priorityCountries.includes(currentBankCountryCode);

		!isPriorityCountry &&
			aggregator.modifyFields(`settlementAccount.bank.locale.name`, (f) => {
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
			required: currentCountryOfIncorporation === 'KENYA',
		});

		aggregator.modifyFields('NG', {
			required: currentCountryOfIncorporation === 'NIGERIA',
		});

		return aggregator.generate();
	}, [
		countryList,
		bankList,
		currentCountryOfIncorporation,
		currentBankCountryCode,
	]);

	useEffect(() => {
		resetField(bankFieldName, { defaultValue: '' });
	}, [currentBankCountry, bankFieldName, resetField]);

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

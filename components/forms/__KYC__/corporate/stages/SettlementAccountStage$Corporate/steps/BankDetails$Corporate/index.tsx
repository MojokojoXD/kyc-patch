import type { Path } from 'react-hook-form';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/forms/FormLayout';
import FormFactory from '@/components/forms/FormFactory';
import type {
	SingleFormFieldsGeneratorProps,
	FormStep,
} from '@/types/Components/onboarding';
import type { CorporateFormSchema } from '@/types/forms/corporateSchema';
import { useAsyncAction } from '@/components/forms/utils/customHooks/useAsyncAction';
import Loading from '@/components/ui/Loading';
import { getBankList } from '@/utils/vars/banks';
import { useMemo, useEffect } from 'react';
import { FormFieldAggregator } from '@/components/forms/utils/FormFieldAggregator';
import { accountDetailsModel$Corporate } from './model/accountDetailsModel$Corporate';
import { useKYCFormContext } from '@/components/forms/utils/formController';

export const BankDetails$Corporate: FormStep = ({ countryList }) => {
	const [bankList, loading, error] = useAsyncAction(getBankList);

	if (error.flag) {
		console.log(error.message);
		return <p className='p-10'>Something went wrong! Please try again later.</p>;
	}

	return (
		<>
			{loading && <Loading reveal={loading} />}
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

type BankFormProps = Omit<SingleFormFieldsGeneratorProps, 'applicantId'> & {
	bankList: Awaited<ReturnType<typeof getBankList>>;
};

function BankForm({ countryList = [], bankList }: BankFormProps) {
	const {
		form,
		formVars: { brokerCode },
	} = useKYCFormContext<CorporateFormSchema>();
	const { watch, resetField } = form;

	const currentBankCountry = watch(
		`settlementAccount.bank.locale.country`
	) as string;
	const currentCountryOfIncorporation = watch(
		`businessInfo.details.countryOfIncorporation`
	) as string;

	const bankFieldName =
		`settlement.bank.locale.name` as Path<CorporateFormSchema>;

	const aggregatorResults = useMemo(() => {
		const rawFields = accountDetailsModel$Corporate({
			countryList,
			bankList,
		});
		const aggregator = new FormFieldAggregator(rawFields);

		const isPriorityCountry = ['GHANA', 'NIGERIA', 'KENYA'].includes(
			currentBankCountry
		);

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

		aggregator.modifyFields('KESTR', {
			remove: brokerCode !== 'KESTR',
		});

		aggregator.modifyFields('NG', {
			required: currentCountryOfIncorporation === 'NIGERIA',
		});

		return aggregator.generate();
	}, [
		countryList,
		bankList,
		currentCountryOfIncorporation,
		currentBankCountry,
		brokerCode,
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

import type { BankList } from '@/types/forms/common';
import type { FormFactoryProps } from '@/types/Components/formFactory';


export const bankDetailsModel$Individual = ({
	index,
	bankList = [],
}: {
	index: number;
	bankList?: BankList[];
}): FormFactoryProps[] => [
	{
		fieldType: 'dropdown',
		name: `applicant.${index}.bank.locale.country`,
		defaultValue: 'GHANA',
		label: 'Bank Country',
		placeholder: 'Select country',
		rules: {
			required: 'Select country',
		},
    componentProps: {
      isCountryList: true
    }
	},
	{
		fieldType: 'dropdown',
		name: `applicant.${index}.bank.locale.name`,
		label: 'Bank Name',
		placeholder: 'Select bank',
		rules: {
			required: 'Select bank',
		},
		options: {
			keys: bankList,
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.bank.locale.branch`,
		label: 'Bank Branch',
		placeholder: 'Enter bank branch',
		rules: {
			required: 'Please enter bank branch',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.bank.account.name`,
		label: 'Account Name',
		placeholder: 'Enter account name',
		rules: {
			required: 'Please enter account name',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.bank.account.number`,
		label: 'Account Number',
		placeholder: 'Enter account number',
		rules: {
			required: 'Please enter account number',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.bank.account.bvn`,
		label: 'BVN Number',
		placeholder: 'Enter account bvn number',
		tags: ['NG'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.bank.account.type`,
		label: 'Account Type',
		placeholder: 'Enter account type',
		rules: {
			required: 'Please enter account type',
		},
	},
	{
		fieldType: 'date',
		name: `applicant.${index}.bank.account.dateOpened`,
		label: 'Date Opened',
		placeholder: 'Select Date',
		rules: {
			required: 'Select date',
		},
		componentProps: {
			disableFutureDays: true
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.bank.account.swiftCode`,
		label: 'SWIFT Code',
		placeholder: 'Enter SWIFT code',
		rules: {
			required: 'Please enter SWIFT code',
		},
		tags: ['KE'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.bank.account.KRAPin`,
		label: 'KRA PIN Number',
		placeholder: 'Enter KRA PIN number',
		tags: ['KE', 'KESTR'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.bank.account.routingNumber`,
		label: 'Routing Number',
		placeholder: 'Enter routing number',
		rules: {
			required: 'Please enter routing number',
		},
		tags: ['KE'],
	},
];


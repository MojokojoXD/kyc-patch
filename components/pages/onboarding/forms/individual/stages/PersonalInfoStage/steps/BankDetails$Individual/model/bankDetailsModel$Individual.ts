import type { Country,CountryList, BankList } from '@/types/forms/common';
import type { FormFactoryProps } from '@/types/Components/formFactory';
import { sub } from 'date-fns';

const today = new Date();

export const bankDetailsModel$Individual = ({
	index,
	countryList = [],
	bankList = [],
}: {
	index: number;
	countryList?: CountryList;
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
		options: {
			keySelector: (key) => (key as Country).cty_name,
			keys: countryList[1],
			priorityKeys: countryList[0],
		},
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
			keySelector: (key) => (key as BankList).bank_name,
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
			endMonth: today,
			startMonth: sub(today, { years: 100 }),
			disabled: { after: today },
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


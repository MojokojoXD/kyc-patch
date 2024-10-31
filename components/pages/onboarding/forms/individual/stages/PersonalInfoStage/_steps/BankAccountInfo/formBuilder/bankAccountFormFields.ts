import type { Country, BankList } from '@/types/forms/common';
import type { FormFactoryProps } from '@/types/Components/formFactory';
import { sub } from 'date-fns';

const today = new Date();

const bankAccountModel = ({
	index,
	countryList = [],
	bankList = [],
}: {
	index: number;
	countryList?: Country[];
	bankList?: BankList[];
}): FormFactoryProps[] => [
	{
		fieldType: 'dropdown',
		name: `applicant.${index}.bank.country`,
		defaultValue: 'GHANA',
		label: 'Bank Country',
		placeholder: 'Select country',
		rules: {
			required: 'Select country',
		},
		options: {
			keySelector: (key) => (key as Country).cty_name,
			keys: countryList,
			priorityKeys: (keys) =>
				(keys as Country[]).filter(
					(c) =>
						c.cty_code === 'GH' ||
						c.cty_code === 'NG' ||
						c.cty_code === 'KE'
				),
		},
	},
	{
		fieldType: 'dropdown',
		name: `applicant.${index}.bank.name`,
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
		name: `applicant.${index}.bank.branch`,
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
		tags: ['AFRIN'],
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
		tags: ['AFRIN'],
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
		tags: ['KE'],
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

export { bankAccountModel };

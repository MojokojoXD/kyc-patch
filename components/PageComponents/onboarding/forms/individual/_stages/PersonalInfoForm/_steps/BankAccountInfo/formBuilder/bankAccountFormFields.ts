import type { FormFactoryProps } from '@/types/Components/formFactory';
import type { Country, BankList } from '@/types/forms/universal';
import { sub } from 'date-fns';
import { FormFieldAggregator } from '@/components/PageComponents/onboarding/forms/utils/FormFieldAggregator';

const today = new Date();

const bankAccountModel = ({
	index,
	countryList,
	bankList,
}: {
	index: number;
	countryList: Country[];
	bankList: bankList[];
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
			keySelector: (key: Country) => key.cty_name,
			keys: countryList,
			priorityKeys: (keys: Country[]) =>
				keys.filter(
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
			keySelector: (key: BankList) => key.bank_name,
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
		tags: [' ', 'local'],
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
		tags: ['KESTR'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.bank.account.kraPin`,
		label: 'KRA PIN Number',
		placeholder: 'Enter KRA PIN number',
		tags: ['KESTR'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.bank.account.routingNumber`,
		label: 'Routing Number',
		placeholder: 'Enter routing number',
		rules: {
			required: 'Please enter routing number',
		},
		tags: ['KESTR'],
	},
	{
        fieldType: 'radio',
		name: `applicant.${index}.bank.statement.modeOfDelivery`,
		label: 'Mode of Statement Delivery',
		rules: {
			required: 'Select mode of delivery',
		},
		options: {
			keys: ['Email', 'Online', 'Collection at Branch'],
			keySelector: (key) => key,
        },
        componentProps: {
            className: 'grid grid-cols-3 gap-[4px]',
            toggleStyles: 'paragraph1Regular text-[14px] truncate text-nowrap'
        },
		tags: ['DATAB'],
	},
	{
		fieldType: 'radio',
		name: `applicant.${index}.bank.statement.deliveryFrequency`,
		label: 'Statement Frequency',
		rules: {
			required: 'Select statement frequency',
		},
		options: {
			keys: ['Semi-Annual', 'Annual', 'Monthly'],
			keySelector: (key) => key,
        },
        componentProps: {
            className: 'grid grid-cols-3 gap-[4px]',
            toggleStyles: 'paragraph1Regular text-[14px] truncate text-nowrap'
        },
		tags: ['DATAB'],
	},
];

export { bankAccountModel };

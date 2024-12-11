import type { FormFactoryProps } from '@/types/Components/formFactory';

export const categoryOfInvestmentFields: FormFactoryProps[] = [
	{
		fieldType: 'text',
		name: 'businessInfo.csdNumber',
		label: 'CSD Number(If applicable)',
		placeholder: 'Enter CSD Number',
	},
	{
		fieldType: 'checkbox',
		name: `businessInfo.categoryOfInvestment`,
		label: 'Category of Investment',
		rules: {
			required: 'Please select option',
		},
		options: {
			keys: ['Fixed Income', 'Equities/Shares'],
		},
		componentProps: {
			classNames: { boxGroupStyles: 'grid-cols-2' },
		},
	},
	{
		fieldType: 'radio',
		name: `businessInfo.taxExempt`,
		label: 'Are you tax exempt?',
		rules: {
			required: 'Please select option',
		},
		options: {
			keys: ['Yes', 'No'],
		},
		componentProps: {
			classNames: { radioGroupStyles: 'grid-cols-2' },
		},
	},
];

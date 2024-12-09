import type { FormFactoryProps } from '@/types/Components/formFactory';

const investmentCatergoryFields: FormFactoryProps[] = [
	{
		fieldType: 'text',
		name: 'csdNumber',
		label: 'CSD Number (Optional)',
		placeholder: 'Enter CSD number',
	},
	{
		fieldType: 'checkbox',
		name: 'catInvestment',
		label: 'Category of Investment',
		options: {
			keys: ['Fixed Income', 'Equities/Shares'],
		},
		rules: {
			required: 'Select investment category',
		},
		componentProps: {
			classNames: { boxGroupStyles: 'grid grid-cols-2 gap-[4px]' },
		},
	},
	{
		fieldType: 'radio',
		name: 'taxExempt',
		label: 'Are you tax exempt?',
		options: {
			keys: ['Yes', 'No'],
		},
		componentProps: {
			classNames: { radioGroupStyles: 'grid grid-cols-2 gap-[4px]' },
		},
		rules: {
			required: 'Select tax exempt status',
		},
	},
];

export { investmentCatergoryFields };

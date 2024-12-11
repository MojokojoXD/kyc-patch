import type { FormFactoryProps } from '@/types/Components/formFactory';

export const statementsModel: FormFactoryProps[] = [
	{
		fieldType: 'text',
		name: `settlementAccount.investmentActivity.objective`,
		label: 'Investment Objective',
		placeholder: 'Enter investment objective',
		rules: {
			required: 'Please enter investment objective',
		},
	},
	{
		fieldType: 'radio',
		name: `settlementAccount.statements.modeOfDelivery`,
		label: 'Mode of Statement Delivery',
		rules: {
			required: 'Select mode of delivery',
		},
		options: {
			keys: ['Email', 'Online', 'Collection at Branch'],
		},
		componentProps: {
			classNames: {
				radioGroupStyles: 'grid grid-cols-3 gap-[4px]',
				toggleStyles: 'paragraph1Regular text-[14px] truncate text-nowrap',
			},
		},
	},
	{
		fieldType: 'radio',
		name: `settlementAccount.statements.frequency`,
		label: 'Statement Frequency',
		rules: {
			required: 'Select statement frequency',
		},
		options: {
			keys: ['Semi-Annual', 'Annual', 'Monthly'],
		},
		componentProps: {
			classNames: {
				radioGroupStyles: 'grid grid-cols-3 gap-[4px]',
				toggleStyles: 'paragraph1Regular text-[14px] truncate text-nowrap',
			},
		},
	},
];

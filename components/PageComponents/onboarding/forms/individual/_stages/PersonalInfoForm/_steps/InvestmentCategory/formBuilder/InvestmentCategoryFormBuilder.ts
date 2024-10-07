import type { FormFactoryProps } from '@/components/UIcomponents/FormFactory';

const investmentCatergoryFields: FormFactoryProps[] = [
	{
		fieldType: 'text',
		name: 'csdNumber',
		label: 'CSD Number(If applicable)',
		placeholder: 'Enter CSD number',
	},
	{
		fieldType: 'radio',
		name: 'catInvestment',
		label: 'Category of Investment',
		options: {
			keySelector: (key: string) => string,
			keys: ['Fixed Income', 'Equities/Shares'],
		},
		rules: {
			required: 'Select investment category',
        },
        componentProps: {
            className: 'grid grid-cols-2 gap-[4px]'
        }
	},
	{
		fieldType: 'radio',
		name: 'taxExempt',
		label: 'Are you tax exempt?',
        options: {
            keySelector: ( key: string ) => key,
            keys: [ 'Yes', 'No' ]
        },
        componentProps: {
            className: 'grid grid-cols-2 gap-[4px]'
        }
	},
];


export { investmentCatergoryFields }

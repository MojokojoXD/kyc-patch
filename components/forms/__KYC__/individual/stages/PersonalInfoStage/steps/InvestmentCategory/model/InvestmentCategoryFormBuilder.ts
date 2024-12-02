import type { FormFactoryProps } from "@/types/Components/formFactory";

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
            className: 'grid grid-cols-2 gap-[4px]'
        }
	},
	{
		fieldType: 'radio',
		name: 'taxExempt',
		label: 'Are you tax exempt?',
        options: {
            keys: [ 'Yes', 'No' ]
        },
        componentProps: {
            className: 'grid grid-cols-2 gap-[4px]'
        },
        rules: {
            required: 'Select tax exempt status'
        }
	},
];


export { investmentCatergoryFields }

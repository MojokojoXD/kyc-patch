import type { FormFactoryProps } from "@/types/Components/formFactory";


export const categoryOfInvestmentFields: FormFactoryProps[] = [
    {
        fieldType: 'checkbox',
        name: `businessInfo.categoryOfInvestment`,
        label: 'Category of Investment',
        rules: {
            required: 'Please select option',
        },
        options: {
            keys: [
                'Fixed Income',
                'Equities/Shares'
            ],
            keySelector(key){ return key as string }
        },
        componentProps: {
            className: 'grid-cols-2'
        }
    },
    {
        fieldType: 'radio',
        name: `businessInfo.taxExempt`,
        label: 'Are you tax exempt?',
        rules: {
            required: 'Please select option',
        },
        options: {
            keys: [ 'Yes', 'No' ],
            keySelector(key){ return key as string }
        },
        componentProps: {
            className: 'grid-cols-2'
        }
    },
]
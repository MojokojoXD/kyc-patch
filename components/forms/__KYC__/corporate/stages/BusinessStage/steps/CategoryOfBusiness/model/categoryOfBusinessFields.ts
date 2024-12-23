import type { FormFactoryProps } from "@/types/Components/formFactory";


export const categoryOfBusinessFields: FormFactoryProps[] = [
    {
        fieldType: 'radio',
        name: `businessInfo.categoryOfBusiness`,
        label: 'Category',
        rules: {
            required: 'Please select category of business',
        },
        options: {
            keys: [
                'Sole Proprietorship',
                'Partnership',
                'Limited Liablity Company',
                'Associations',
                'Charities/NGOs',
                'Other'
            ],
        },
        componentProps: {
            otherInputProps: {
                label: 'Other? Specify',
                placeholder: 'Specify'
            }
        }
    }
]
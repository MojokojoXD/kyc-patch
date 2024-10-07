import type { FormFactoryProps } from "@/components/UIcomponents/FormFactory";


const baseContactFields = ( indexer: number ):FormFactoryProps[] => [

    {
        fieldType: 'text',
        name: `applicant.${ indexer }.contacts.residentialAddress`,
        label: 'Residential Address(Not P.O Box)',
        placeholder: 'Enter residential address',
        rules: {
            required: 'Please enter residential address'
        }
    }
    {
        fieldType: 'text',
        name: `applicant.${ indexer }.contacts.city`,
        label: 'City/Town',
        placeholder: 'Enter city/town',
        rules: {
            required: 'Please enter city/town'
        }
    },
    {
        fieldType: 'text',
        name: `applicant.${ indexer }.contacts.postalAddress`,
        label: 'Postal Address',
        placeholder: 'Enter postal address',
        rules: {
            required: 'Please enter postal address'
        }
    },
    {
        fieldType: 'phone',
        name: `applicant.${ indexer }.contacts.postalAddress`,
        label: 'Postal Address',
        placeholder: 'Enter postal address',
        rules: {
            required: 'Please enter postal address'
        }
    },
    {
        fieldType: 'text',
        name: `applicant.${ indexer }.contacts.postalCode`,
        label: 'Post/Zip Code',
        placeholder: 'Enter post/zip code',
        rules: {
            required: 'Please enter post/zip code',
        }
    },
]
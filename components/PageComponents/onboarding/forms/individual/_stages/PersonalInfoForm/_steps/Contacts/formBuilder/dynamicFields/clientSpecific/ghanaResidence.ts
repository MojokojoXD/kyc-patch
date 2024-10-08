import type { FormFactoryProps } from "@/components/UIcomponents/FormFactory";


const GHANA_RESIDENCE_FIELDS = ( indexer: number ): FormFactoryProps[] => [

    {
        fieldType: 'text',
        name: `applicant.${ indexer }.contacts.digitalAddress`,
        label: 'Digital Address(GhanaPost GPS)',
        placeholder: 'Enter address',
        rules: {
            required: 'Please enter address'
        }
    },
    {
        fieldType: 'text',
        name: `applicant.${ indexer }.contacts.nearestLandmark`,
        label: 'Nearest Landmark',
        placeholder: 'Enter landmark',
        rules: {
            required: 'Please enter landmark'
        }
    }
];


export { GHANA_RESIDENCE_FIELDS }
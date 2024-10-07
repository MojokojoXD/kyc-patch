import type { FormFactoryProps } from "@/components/UIcomponents/FormFactory";

const NIGERIA_FIELDS = (indexer: number): FormFactoryProps[] => [
    {
        fieldType: 'text',
        name: `applicant.${ indexer }.stateOfOrigin`,
        label: 'State of Origin',
        placeholder: 'Enter state',
        rules: {
            required: 'Please enter state of origin'
        }
    },
    {
        fieldType: 'text',
        name: `applicant.${ indexer }.localGovernment`,
        label: 'Local Government',
        placeholder: 'Enter local government',
        rules: {
            required: 'Please enter local government'
        }
    },
    {
        fieldType: 'text',
        name: `applicant.${ indexer }.religion`,
        label: 'Religion',
        placeholder: 'Enter religion',
        rules: {
            required: 'Please enter religion'
        }
    },
];


export { NIGERIA_FIELDS }
import type { FormFactoryProps } from "@/components/UIcomponents/FormFactory";

const DATAB_FIELDS = (indexer: number): FormFactoryProps[] => [
    {
        name: `applicant.${ indexer }.residence.status`,
        fieldType: 'radio',
        label: 'Residential Status',
        rules: {
            required: 'Select residential status'
        },
        options: {
            keySelector: ( key: string ) => key,
            keys: [
                "Resident Ghanaian",
                "Resident Foreigner",
                "Non-Resident Ghanaian",
                "Non-Resident Foreigner"
            ]
        }
    },
    {
        fieldType: 'text',
        name: `applicant.${ indexer }.licenseNumber`,
        label: 'Professional License Number(Optional)',
        placeholder: 'Enter professional license number',
    }
];


export { DATAB_FIELDS }
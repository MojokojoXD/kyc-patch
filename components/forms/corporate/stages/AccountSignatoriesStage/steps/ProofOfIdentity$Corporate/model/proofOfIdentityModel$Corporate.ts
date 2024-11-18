import type { FormFactoryProps } from "@/types/Components/formFactory";


export const proofOfIdentityModel$Corporate = ( { index }: { index: number; } ): FormFactoryProps[] => [
    {
        fieldType: 'radio',
        name: `accountSignatories.signatories.${ index }.proofOfIdentity.idType`,
        label: 'ID Type',
        rules: {
            required: 'Select ID type'
        },
        options: {
            keys: [
                'Passport',
                'National ID',
                'Driver\'s License'
            ],
            keySelector(key) { return key as string }
        }
    },
    {
        fieldType: 'text',
        name: `accountSignatories.signatories.${ index }.proofOfIdentity.idNumber`,
        label: 'ID Number',
        placeholder: 'Enter ID number',
        rules: {
            required: 'Please enter ID number'
        }
    },
    {
        fieldType: 'date',
        name: `accountSignatories.signatories.${ index }.proofOfIdentity.issueDate`,
        label: 'Issue Date',
        placeholder: 'Select date',
        rules: {
            required: 'Please select date'
        },
        componentProps: {
            disableFutureDays: true
        }
    },
    {
        fieldType: 'text',
        name: `accountSignatories.signatories.${ index }.proofOfIdentity.placeOfIssue`,
        label: 'Place of Issue',
        placeholder: 'Enter place of issue',
        rules: {
            required: 'Please enter place of issue'
        }
    },
    {
        fieldType: 'date',
        name: `accountSignatories.signatories.${ index }.proofOfIdentity.expiryDate`,
        label: 'Expiry Date',
        placeholder: 'Select date',
        rules: {
            required: 'Please select date'
        },
        componentProps: {
            disablePastDays: true
        }
    },
]
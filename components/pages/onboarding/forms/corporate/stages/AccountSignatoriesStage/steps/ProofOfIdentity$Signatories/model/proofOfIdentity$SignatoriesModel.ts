import type { FormFactoryProps } from "@/types/Components/formFactory";
import { add } from "date-fns";


const today = new Date();

export const proofOfIdentityModel$Signatories = ( { index }: { index: number; } ): FormFactoryProps[] => [
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
            disabled: { after: today },
            endMonth: today,
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
        label: 'Issue Date',
        placeholder: 'Select date',
        rules: {
            required: 'Please select date'
        },
        componentProps: {
            disabled: { before: today },
            startMonth: today,
            endMonth: add( today, { years: 50 } )
        }
    },
]
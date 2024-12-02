import type { FormFactoryProps } from '@/types/Components/formFactory';

export const proofOfIdentityModel$Contacts: FormFactoryProps[] = [
	{
		fieldType: 'radio',
		name: 'contacts.proofOfIdentity.idType',
        label: 'ID Type',
        rules: {
            required: 'Select option'
        },
		options: {
			keys: ['Passport', 'National ID', "Driver's License"],
		},
    },
    {
        fieldType: 'text',
        name: 'contacts.proofOfIdentity.idNumber',
        label: 'ID Number',
        placeholder: 'Enter ID number',
        rules: {
            required: 'Please enter ID number'
        }
    },
    {
        fieldType: 'date',
        name: 'contacts.proofOfIdentity.issueDate',
        label: 'Issue Date',
        placeholder: 'Select Date',
        rules: {
            required: 'Select Date'
        },
        componentProps: {
            disableFutureDays: true,
        }
    },
    {
        fieldType: 'text',
        name: 'contacts.proofOfIdentity.placeOfIssue',
        label: 'Place of Issue',
        placeholder: 'Enter place of issue',
        rules: {
            required: 'Please enter place of issue'
        }
    },
    {
        fieldType: 'date',
        name: 'contacts.proofOfIdentity.expiryDate',
        label: 'Expiry Date',
        placeholder: 'Select expiry date',
        rules: {
            required: 'Select expiry date'
        },
        componentProps: {
            disablePastDays: true,
        }
    },
];

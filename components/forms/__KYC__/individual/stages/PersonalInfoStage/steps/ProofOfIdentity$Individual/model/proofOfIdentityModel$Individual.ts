import type { FormFactoryProps } from '@/types/Components/formFactory';

export const proofOfIdentityModel$Individual = ({
	index,
}: {
	index: number;
}): FormFactoryProps[] => [
	{
		fieldType: 'radio',
		name: `applicant.${index}.proofOfIdentity.idType`,
		label: 'ID Type',
		options: {
			keys: ['Passport', 'National ID', "Driver's license"],
		},
		rules: {
			required: 'Select ID type',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.proofOfIdentity.idNumber`,
		label: 'ID Number',
		placeholder: 'Enter ID number',
		rules: {
			required: 'Please enter ID number',
		},
	},
	{
		fieldType: 'date',
		name: `applicant.${index}.proofOfIdentity.issueDate`,
		label: 'Issue Date',
		placeholder: 'Select date',
		rules: {
			required: 'Select issue date',
		},
		componentProps: {
            disableFutureDays: true,
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.proofOfIdentity.placeOfIssue`,
		label: 'Place of Issue',
		placeholder: 'Enter place of issue',
		rules: {
			required: 'Please enter place of issue',
		},
	},
	{
		fieldType: 'date',
		name: `applicant.${index}.proofOfIdentity.expiryDate`,
		label: 'Expiry Date',
		placeholder: 'Select date',
		rules: {
			required: 'Select expiry date',
		},
		componentProps: {
            disablePastDays: true,
        },
        tags: [ 'deps' ]
	},
];


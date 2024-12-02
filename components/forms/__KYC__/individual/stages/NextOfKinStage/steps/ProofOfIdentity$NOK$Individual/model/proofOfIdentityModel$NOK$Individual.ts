import type { FormFactoryProps } from '@/types/Components/formFactory';


export const proofOfIdentityModel$NOK$Individual = ( {
	index,
}: {
	index: number;
}): FormFactoryProps[] => [
	{
		fieldType: 'radio',
		name: `nextOfKin.${index}.proofOfIdentity.idType`,
		label: 'ID Type',
		rules: {
			required: 'Select ID type',
		},
		options: {
			keys: [
				'Passport',
				'National ID',
				'Birth Certificate (If under 18 years old)',
			],
		},
	},
	{
		fieldType: 'text',
		name: `nextOfKin.${index}.proofOfIdentity.idNumber`,
		label: 'ID Number',
		placeholder: 'Enter ID number',
		rules: {
			required: 'Please enter ID number',
		},
	},
	{
		fieldType: 'date',
		name: `nextOfKin.${index}.proofOfIdentity.issueDate`,
		label: 'Issue Date',
		placeholder: 'Select date',
		rules: {
			required: 'Please select date',
		},
		componentProps: {
            disableFutureDays: true
		},
	},
	{
		fieldType: 'text',
		name: `nextOfKin.${index}.proofOfIdentity.placeOfIssue`,
		label: 'Place of Issue',
		placeholder: 'Enter place of issue',
		rules: {
			required: 'Please enter place of issue',
		},
	},
	{
		fieldType: 'date',
		name: `nextOfKin.${index}.proofOfIdentity.expiryDate`,
		label: 'Expiry Date',
		placeholder: 'Select date',
		componentProps: {
			disablePastDays: true,
        },
        tags: ['deps']
	},
];


import type { FormFactoryProps } from '@/types/Components/formFactory';
import { sub, add } from 'date-fns';

const today = new Date();

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
			keySelector: (key) => key as string,
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
			startMonth: sub(today, { years: 50 }),
			endMonth: today,
			disabled: { after: today },
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
			startMonth: today,
			endMonth: add(today, { years: 50 }),
			disabled: { before: today },
        },
        tags: [ 'deps' ]
	},
];


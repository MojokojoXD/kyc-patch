import type { FormFactoryProps } from '@/types/Components/formFactory';
import { sub,add } from 'date-fns';

const today = new Date();

const NOK_identifyProofFieldsModel = ({
	index,
}: {
	index: number;
}): FormFactoryProps[] => [
	{
		fieldType: 'radio',
		name: `nextOfKin.${index}.proofOfIdentify.idType`,
        label: 'ID Type',
        rules: {
            required: 'Select ID type'
        },
		options: {
			keySelector: (key) => key as string,
			keys: [
				'Passport',
				'National ID',
				'Birth Certificate (If under 18 years old)',
			],
		},
        },
        {
            fieldType: 'text',
            name: `nextOfKin.${ index }.proofOfIdentity.idNumber`,
            label: 'ID Number',
            placeholder: 'Enter ID number',
            rules: {
                required: 'Please enter ID number'
            }
        },
        {
            fieldType: 'date',
            name: `nextOfKin.${index}.proofOfIdentity.issueDate`,
            label: 'Issue Date',
            placeholder: 'Select date',
            rules: {
                required: 'Please select date'
            },
            componentProps: {
                startMonth: sub(today, { years: 50 }),
                endMonth: today,
                disabled: { after: today },
            },
        },
        {
            fieldType: 'text',
            name: `nextOfKin.${index}.proofOfIdentity.placeOfIssue`,
            label: 'Place of Issue',
            placeholder: 'Enter place of issue',
            rules: {
                required: 'Please enter place of issue'
            }
        },
        {
            fieldType: 'date',
            name: `nextOfKin.${index}.proofOfIdentity.expiryDate`,
            label: 'Expiry Date (Optional)',
            placeholder: 'Select date',
            componentProps: {
                startMonth: today,
                endMonth: add(today, { years: 50 }),
                disabled: { before: today },
            },
        },
];


export { NOK_identifyProofFieldsModel }
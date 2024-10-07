import type { FormFactoryProps } from '@/components/UIcomponents/FormFactory';
import { sub,add } from 'date-fns';

const today = new Date();

const RESIDENCE_FIELDS = (indexer: number): FormFactoryProps[] => [
	{
		fieldType: 'text',
		name: `applicant.${indexer}.residence.permitNumber`,
		label: 'Residence Permit Number',
		placeholder: 'Enter permit number',
		rules: {
			required: 'Please enter permit number',
		},
	},
	{
		fieldType: 'date',
		name: `applicant.${indexer}.residence.permitIssueDate`,
		label: 'Permit Issue Date',
		placeholder: 'DD/MM/YYYY',
		rules: {
			required: 'Select date',
		},
		componentProps: {
			startMonth: sub(today, { years: 100 }),
			endMonth: today,
			disabled: { after: today },
			defaultMonth: today
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${indexer}.residence.permitIssuePlace`,
		label: 'Place of Issue',
		placeholder: 'Enter place of Issue',
		rules: {
			required: 'Please enter place of issue',
		},
    },
    {
		fieldType: 'date',
		name: `applicant.${indexer}.residence.permitExpiry`,
		label: 'Permit Expiry Date',
		placeholder: 'DD/MM/YYYY',
		rules: {
			required: 'Select date',
		},
		componentProps: {
			startMonth: today,
			endMonth: add(today, { years: 100 }),
			disabled: { before: today },
			defaultMonth: today
		},
	}
];


export { RESIDENCE_FIELDS }
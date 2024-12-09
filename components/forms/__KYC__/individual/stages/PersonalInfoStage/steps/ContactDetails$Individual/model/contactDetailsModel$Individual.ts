import type { FormFactoryProps } from '@/types/Components/formFactory';
import validator from 'validator';

export const contactDetailsModel$Individual = ({
	index,
}: {
	index: number;
}): FormFactoryProps[] => [
	{
		fieldType: 'text',
		name: `applicant.${index}.contacts.residentialAddress`,
		label: 'Residential Address (Not P.O Box)',
		placeholder: 'Enter residential address',
		rules: {
			required: 'Please enter residential address',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.contacts.city`,
		label: 'City/Town',
		placeholder: 'Enter city/town',
		rules: {
			required: 'Please enter city/town',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.contacts.postalAddress`,
		label: 'Postal Address',
		placeholder: 'Enter postal address',
		rules: {
			required: 'Please enter postal address',
		},
		tags: ['KE'],
	},
	{
		fieldType: 'phone',
		name: `applicant.${index}.contacts.phoneNumber`,
		label: 'Phone Number',
		placeholder: 'Enter phone number',
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.contacts.email`,
		label: 'Email Address',
		placeholder: 'Enter email',
		rules: {
			required: 'Please enter email',
			validate: (v) =>
				validator.isEmail(v) || 'Email must be of the format: name@example.com',
		},
		tags: ['optional-contact'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.contacts.emergencyContact.contactName`,
		label: 'Emergency Contact',
		placeholder: 'Enter contact name',
		rules: {
			required: 'Please enter contact name',
			validate: (v) => v.length > 5 || 'Name is too short',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.contacts.emergencyContact.relation`,
		label: '',
		placeholder: 'Enter relation',
		rules: {
			required: 'Please enter relation',
			validate: (v) => v.length >= 2 || 'Entry is too short',
		},
	},
	{
		fieldType: 'phone',
		name: `applicant.${index}.contacts.emergencyContact.phoneNumber`,
		label: '',
		placeholder: 'Enter contact phone number',
		componentProps: {
			phoneMode: 'single',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.contacts.postalCode`,
		label: 'Zip/Postal Code',
		placeholder: 'Enter zip/postal code',
		rules: {
			required: 'Please enter zip/postal code',
		},
	},
	{
		fieldType: 'phone',
		name: `applicant.${index}.contacts.faxNumber`,
		label: 'Fax Number (Optional)',
    placeholder: 'Enter Fax Number',
    rules: null,
		componentProps: {
			phoneMode: 'single',
		},
		tags: ['KE'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.contacts.digitalAddress`,
		label: 'Digital Address (GhanaPost GPS) (Optional)',
		placeholder: 'Enter address',
		tags: ['residence-contact'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.contacts.nearestLandmark`,
		label: 'Nearest Landmark (Optional)',
		placeholder: 'Enter landmark',
		tags: ['residence-contact'],
	},
];

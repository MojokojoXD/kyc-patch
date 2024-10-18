import type { FormFactoryProps } from '@/types/Components/formFactory';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import type { Country } from '@/types/forms/universal';
import validator from 'validator';

const contactFieldsModel = ({
	index,
	countryList = [],
}: {
	index: number;
	countryList?: Country[];
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
		tags: ['DATAB', 'KESTR', 'optional-contact'],
	},
	{
		fieldType: 'phone',
		name: `applicant.${index}.contacts.phoneNumber`,
		label: 'Phone Number',
		placeholder: 'Enter phone number',
		rules: {
			required: 'Please enter phone number',
			validate: (v) =>
				isPossiblePhoneNumber(v) || 'Please enter valid phone number',
		},
		componentProps: {
			phoneMode: 'multi',
			maxPhoneCount: 2,
		},
		options: {
			keySelector: (key) => (key as Country).cty_name,
			keys: countryList,
			priorityKeys: (keys) =>
				(keys as Country[]).filter(
					(k) =>
						k.cty_code === 'GH' ||
						k.cty_code === 'NG' ||
						k.cty_code === 'KE'
				),
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.contacts.email`,
		label: 'Email Address',
		placeholder: 'Enter email',
		rules: {
			required: 'Please enter email',
			validate: (v) =>
				validator.isEmail(v) ||
				'Email must be of the format: name@example.com',
		},
		tags: ['optional-contact'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.contacts.emergencyContact.name`,
		label: 'Emergency Contact',
		placeholder: 'Enter contact name',
		rules: {
			required: 'Please enter contact name',
			validate: (v) => v.length > 5 || 'Name is too short',
		},
		tags: ['DATAB'],
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
		tags: ['DATAB'],
	},
	{
		fieldType: 'phone',
		name: `applicant.${index}.contacts.emergencyContact.phoneNumber`,
		label: '',
		placeholder: 'Enter contact phone number',
		rules: {
			required: 'Please enter contact phone number',
			validate: (v) =>
				isPossiblePhoneNumber(v) || 'Please enter valid phone number',
		},
		options: {
			keySelector: (key) => (key as Country).cty_name,
			keys: countryList,
			priorityKeys: (keys) =>
				(keys as Country[]).filter(
					(k) =>
						k.cty_code === 'GH' ||
						k.cty_code === 'NG' ||
						k.cty_code === 'KE'
				),
		},
		componentProps: {
			phoneMode: 'single',
		},
		tags: ['DATAB'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.contacts.postalCode`,
		label: 'Zip/Postal Code',
		placeholder: 'Enter zip/postal code',
		rules: {
			required: 'Please enter zip/postal code',
		},
		tags: ['KESTR'],
	},
	{
		fieldType: 'phone',
		name: `applicant.${index}.contacts.faxNumber`,
		label: 'Fax Number',
		placeholder: 'Enter Fax Number',
		rules: {
			required: 'Please enter fax number',
			validate: (v) =>
				isPossiblePhoneNumber(v) || 'Please enter valid phone number',
		},
		options: {
			keySelector: (key) => (key as Country).cty_name,
			keys: countryList,
			priorityKeys: (keys) =>
				(keys as Country[]).filter(
					(k) =>
						k.cty_code === 'GH' ||
						k.cty_code === 'NG' ||
						k.cty_code === 'KE'
				),
		},
		componentProps: {
			phoneMode: 'single',
		},
		tags: ['KESTR'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.contacts.digitalAddress`,
		label: 'Digital Address(GhanaPost GPS)',
		placeholder: 'Enter address',
		tags: ['AFRIN', 'DATAB', 'KESTR', 'residence-contact'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.contacts.nearestLandmark`,
		label: 'Nearest Landmark',
		placeholder: 'Enter landmark',
		tags: ['AFRIN', 'DATAB', 'KESTR', 'residence-contact'],
	},
];

export { contactFieldsModel };

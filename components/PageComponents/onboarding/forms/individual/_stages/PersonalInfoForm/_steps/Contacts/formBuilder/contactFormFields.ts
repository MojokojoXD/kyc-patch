import type { FormFactoryProps } from '@/components/UIcomponents/FormFactory';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import { dynamicContactFields } from './dynamicFields/fieldMap';
import validator from 'validator';

const baseContactFields = (indexer: number): FormFactoryProps[] => [
	{
		fieldType: 'text',
		name: `applicant.${indexer}.contacts.residentialAddress`,
		label: 'Residential Address (Not P.O Box)',
		placeholder: 'Enter residential address',
		rules: {
			required: 'Please enter residential address',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${indexer}.contacts.city`,
		label: 'City/Town',
		placeholder: 'Enter city/town',
		rules: {
			required: 'Please enter city/town',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${indexer}.contacts.postalAddress`,
		label: 'Postal Address',
		placeholder: 'Enter postal address',
		rules: {
			required: 'Please enter postal address',
		},
	},
	{
		fieldType: 'phone',
		name: `applicant.${indexer}.contacts.phoneNumber`,
		label: 'Phone Number',
		placeholder: 'Enter phone number',
		rules: {
			required: 'Please enter phone number',
			validate: (v) =>
				isPossiblePhoneNumber(v) || 'Please enter valid phone number',
		},
		componentProps: {
			phoneMode: 'multi',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${indexer}.contacts.email`,
		label: 'Email Address',
		placeholder: 'Enter email',
		rules: {
			required: 'Please enter email',
			validate: (v) =>
				validator.isEmail(v) || 'Email must be of the format: name@example.com',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${indexer}.contacts.emergencyContact.name`,
		label: 'Emergency Contact',
		placeholder: 'Enter contact name',
		rules: {
			required: 'Please enter contact name',
			validate: (v) =>
				v.length > 5 || 'Name is too short',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${indexer}.contacts.emergencyContact.relation`,
		label: '',
		placeholder: 'Enter relation',
		rules: {
			required: 'Please enter relation',
			validate: (v) =>
				v.length >= 2 || 'Entry is too short',
		},
	},
	{
		fieldType: 'phone',
		name: `applicant.${indexer}.contacts.emergencyContact.phoneNumber`,
		label: '',
		placeholder: 'Enter contact phone number',
		rules: {
			required: 'Please enter contact phone number',
			validate: (v) => isPossiblePhoneNumber(v) || 'Please enter valid phone number'
		},
	},
];

const generateContactFields = (indexer: number, ...identifiers: string[]) =>
	identifiers.reduce<FormFactoryProps[]>((result, currentValue) => {
		if (!dynamicContactFields.has(currentValue)) return result;

		return result.concat(
			dynamicContactFields.get(currentValue)?.call(this, indexer) || []
		);
	}, baseContactFields(indexer));

export { generateContactFields };

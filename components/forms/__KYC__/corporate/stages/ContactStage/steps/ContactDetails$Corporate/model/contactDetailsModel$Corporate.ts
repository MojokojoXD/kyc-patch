import type { FormFactoryProps } from '@/types/Components/formFactory';
import type { Country,CountryList } from '@/types/forms/common';
import validator from 'validator';

export const contactDetailsModel$Corporate = ({
	countryList = [],
}: {
    index?: number,
	countryList?: CountryList;
}): FormFactoryProps[] => [
	{
		fieldType: 'text',
		name: 'contacts.residentialAddress',
		label: 'Residential/Physical Address (not a P.O Box)',
		placeholder: 'Enter residential address',
		rules: {
			required: 'Please enter residential address',
		},
	},
	{
		fieldType: 'text',
		name: 'contacts.city',
		label: 'City/Town',
		placeholder: 'Enter city/town',
		rules: {
			required: 'Please enter city/town',
		},
	},
	{
		fieldType: 'text',
		name: 'contacts.postalAddress',
		label: 'Postal Address',
		placeholder: 'Enter postal address',
		rules: {
			required: 'Please enter postal Address',
		},
	},
	{
		fieldType: 'phone',
		name: 'contacts.phoneNumber',
		label: 'Phone/Mobile Number(s)',
		placeholder: 'Enter phone number',
		options: {
			keys: countryList[1],
			keySelector(key) {
				return (key as Country).cty_name;
			},
			priorityKeys: countryList[0],
		},
	},
	{
		fieldType: 'text',
		name: 'contacts.email',
		label: 'Email Address',
		placeholder: 'Enter email address',
		rules: {
			required: 'Please enter email Address',
			validate: (v) =>
				validator.isEmail(v as string) ||
				'Email must be of the format: name@example.com',
		},
	},
	{
		fieldType: 'text',
		name: 'contacts.emergencyContact.contactName',
		label: 'Emergency Contact',
		placeholder: 'Contact name',
		rules: {
			required: 'Please enter contact name',
		},
	},
	{
		fieldType: 'text',
		name: 'contacts.emergencyContact.relation',
		label: '',
		placeholder: 'Relation to client',
		rules: {
			required: 'Please enter relation to client',
		},
	},
	{
		fieldType: 'phone',
		name: 'contacts.emergencyContact.phoneNumber',
		label: '',
		placeholder: 'Contact phone number',
		options: {
			keys: countryList[1],
			keySelector(key) {
				return (key as Country).cty_name;
			},
			priorityKeys: countryList[0],
		},
		componentProps: {
			phoneMode: 'single',
		},
	},
	{
		fieldType: 'text',
		name: 'contacts.digitalAddress',
		label: 'Digital Address (Optional)',
		placeholder: 'Enter digital Address',
	},
	{
		fieldType: 'text',
		name: 'contacts.nearestLandmark',
		label: 'Nearest Landmark (Optional)',
		placeholder: 'Enter landmark',
	},
];

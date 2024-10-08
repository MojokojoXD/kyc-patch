import type { FormFactoryProps } from '@/components/UIcomponents/FormFactory';
import countries from '@/utils/vars/_formDefaults/countries.json';
import type { Country } from '@/types/forms/universal';
import validator from 'validator';

const employedFields = (index: number): FormFactoryProps[] => [
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.occupation`,
		label: 'Occupation',
		placeholder: 'Enter occupation',
		rules: {
			required: 'Please enter occupation',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.name`,
		label: 'Employer/Business/School Name',
		placeholder: 'Enter name',
		rules: {
			required: 'Please enter name',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.address`,
		label: 'Employer/Business/School Physical Address',
		placeholder: 'Enter address',
		rules: {
			required: 'Please enter address',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.city`,
		label: 'City/Town',
		placeholder: 'Enter city/town',
		rules: {
			required: 'Please enter city/town',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.postalAddress`,
		label: 'Postal Address',
		placeholder: 'Enter postal address',
		rules: {
			required: 'Please enter postal address',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.postalCode`,
		label: 'Postal Code',
		placeholder: 'Enter Postal code',
		rules: {
			required: 'Please enter Postal code',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.positionHeld`,
		label: 'Position Held',
		placeholder: 'Enter Position held',
		rules: {
			required: 'Please enter Position held',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.natureOfBusiness`,
		label: 'Nature of Business',
		placeholder: 'Enter nature of business',
		rules: {
			required: 'Please enter nature of business',
		},
	},
	{
		fieldType: 'dropdown',
		name: `applicant.${index}.employment.statusDetails.country`,
		label: 'Country of Employment',
		placeholder: 'Enter country of employment',
		rules: {
			required: 'Select country',
		},
		options: {
			keySelector: (key: Country) => key.cty_name,
			keys: countries.data,
			priorityKeys: (keys: Country[]) =>
				keys.filter(
					(k) =>
						k.cty_code === 'GH' || k.cty_code === 'NG' || k.cty_code === 'KE'
				),
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.digitalAddress`,
		label: 'Digital Address (Ghana Post GPS)',
		placeholder: 'Enter address',
		rules: {
			required: 'Please enter address',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.nearestLandmark`,
		label: 'Nearest Landmark',
		placeholder: 'Enter nearest landmark',
		rules: {
			required: 'Please enter nearest landmark',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.yearsOfTotalEmployment`,
		label: 'Years of Total Employment',
		placeholder: 'Enter years of total employment',
		rules: {
			required: 'Please enter years of total employment',
			validate: (v) => validator.isNumeric(v) || 'Must be a number',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.yearsOfCurrentEmployment`,
		label: 'Years of Current Employment',
		placeholder: 'Enter years of current employment',
		rules: {
			required: 'Please enter years of current employment',
			validate: (v) => validator.isNumeric(v) || 'Must be a number',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.yearsOfPreviousEmployment`,
		label: 'Years of Previous Employment',
		placeholder: 'Enter years of previous employment',
		rules: {
			required: 'Please enter years of previous employment',
			validate: (v) => validator.isNumeric(v) || 'Must be a number',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.licenseNumber`,
		label: 'Professional License Number',
		placeholder: 'Enter license number',
		rules: {
			required: 'Please enter license number',
		},
	},
];

export { employedFields };

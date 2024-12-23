import type { FormFactoryProps } from '@/types/Components/formFactory';
import validator from 'validator';

export const employmentModel = ({
	index,
	currency = '',
}: {
	index: number;
	currency?: string;
}): FormFactoryProps[] => [
	{
		fieldType: 'radio',
		name: `applicant.${index}.employment.status`,
		label: 'Employment Status',
		rules: {
			required: 'Select employment status',
		},
		options: {
			keys: ['Employed', 'Self-Employed', 'Unemployed', 'Retired', 'Student'],
		},
		tags: ['remove-all-except', 'control-employment'],
	},
	{
		fieldType: 'text',
		defaultValue: '',
		name: `applicant.${index}.employment.statusDetails.occupation`,
		label: 'Occupation',
		placeholder: 'Enter occupation',
		rules: {
			required: 'Please enter occupation',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.profession`,
		label: 'Profession',
		placeholder: 'Enter profession',
		rules: {
			required: 'Please enter profession',
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
		fieldType: 'phone',
		name: `applicant.${index}.employment.statusDetails.phoneNumber`,
		label: 'Employer/Business/School Phone Number',
		placeholder: 'Enter phone number',
		tags: ['remove-all-except'],
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
		name: `applicant.${index}.employment.statusDetails.countryOfEmployment`,
		label: 'Country of Employment',
		placeholder: 'Select country of employment',
		rules: {
			required: 'Select country',
		},
    componentProps: {
      isCountryList: true,
    }
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
		tags: ['DATAB'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.licenseNumber`,
		label: 'Professional License Number (Optional)',
		placeholder: 'Enter license number',
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.email`,
		label: 'Employer/Business/School Email Address',
		placeholder: 'Enter email address',
		rules: {
			required: 'Please enter email address',
			validate: (v) =>
				validator.isEmail(<string>v) || 'Email must be of the format: name@example.com',
		},
		tags: ['remove-all-except'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.tin`,
		label: 'TIN (Optional)',
		placeholder: 'Enter TIN',
	},
	// {
	// 	fieldType: 'radio',
	// 	name: `applicant.${index}.employment.statusDetails.annualNetIncome`,
	// 	label: `Annual Net Income ${currency && '(' + currency + ')'}`,
	// 	rules: {
	// 		required: 'Please select annual income range',
	// 	},
	// 	options: {
	// 		keySelector: (key) => key as string,
	// 		keys: ['1,000,000-3,000,000', '3,000,000-6,000,000', 'above 6,000,000'],
	// 	},
	// },
	{
		fieldType: 'radio',
		name: `applicant.${index}.employment.statusDetails.monthlyIncomeRange`,
		label: `Total Monthly Income Range ${currency && ' (' + currency + ')'}`,
		rules: {
			required: 'Please select income range',
		},
		options: {
			keys: ['Below 1,000', '1,000-5,000', '5,000-10,000', 'Above 10,000'],
		},
	},
];

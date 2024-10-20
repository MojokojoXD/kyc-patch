import type { FormFactoryProps } from '@/types/Components/formFactory';
import type { Country } from '@/types/forms/universal';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import validator from 'validator';

const employmentFieldsModel = ({
	index,
	countryList = [],
	currency = "",
}: {
	index: number;
	countryList?: Country[];
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
			keySelector: (key: string) => key,
			keys: [
				'Employed',
				'Self-Employed',
				'Unemployed',
				'Retired',
				'Student',
			],
		},
		tags: [
			'AFRIN',
			'DATAB',
			'KESTR',
			'remove-all-except',
			'control-employment',
		],
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
		tags: ['DATAB'],
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
		tags: ['DATAB'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.nearestLandmark`,
		label: 'Nearest Landmark',
		placeholder: 'Enter nearest landmark',
		rules: {
			required: 'Please enter nearest landmark',
		},
		tags: ['DATAB'],
	},
	{
		fieldType: 'phone',
		name: `applicant.${index}.employment.statusDetails.phoneNumber`,
		label: 'Employer/Business/School Phone Number',
		placeholder: 'Enter phone number',
		rules: {
			required: 'Please enter phone number',
			validate: (v) =>
				isPossiblePhoneNumber(v) || 'Please enter valid phone number',
		},
		options: {
			keys: countryList,
			keySelector: (key) => (key as Country).cty_name,
			priorityKeys: (keys) =>
				(keys as Country[]).filter(
					(c) =>
						c.cty_code === 'GH' ||
						c.cty_code === 'NG' ||
						c.cty_code === 'KE'
				),
		},
		tags: ['DATAB', 'KESTR', 'remove-all-except'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.city`,
		label: 'City/Town',
		placeholder: 'Enter city/town',
		rules: {
			required: 'Please enter city/town',
		},
		tags: ['DATAB'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.postalAddress`,
		label: 'Postal Address',
		placeholder: 'Enter postal address',
		rules: {
			required: 'Please enter postal address',
		},
		tags: ['KESTR'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.postalCode`,
		label: 'Postal Code',
		placeholder: 'Enter Postal code',
		rules: {
			required: 'Please enter Postal code',
		},
		tags: ['KESTR'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.positionHeld`,
		label: 'Position Held',
		placeholder: 'Enter Position held',
		rules: {
			required: 'Please enter Position held',
		},
		tags: ['KESTR'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.natureOfBusiness`,
		label: 'Nature of Business',
		placeholder: 'Enter nature of business',
		rules: {
			required: 'Please enter nature of business',
		},
		tags: ['DATAB', 'KESTR'],
	},
	// {
	// 	fieldType: 'dropdown',
	// 	name: `applicant.${index}.employment.statusDetails.country`,
	// 	label: 'Country of Employment',
	// 	placeholder: 'Enter country of employment',
	// 	rules: {
	// 		required: 'Select country',
	// 	},
	// 	options: {
	// 		keySelector: (key: Country) => key.cty_name,
	// 		keys: countryList,
	// 		priorityKeys: (keys: Country[]) =>
	// 			keys.filter(
	// 				(k) =>
	// 					k.cty_code === 'GH' ||
	// 					k.cty_code === 'NG' ||
	// 					k.cty_code === 'KE'
	// 			),
	// 	},
	// },

	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.yearsOfTotalEmployment`,
		label: 'Years of Total Employment',
		placeholder: 'Enter years of total employment',
		rules: {
			required: 'Please enter years of total employment',
			validate: (v) => validator.isNumeric(v) || 'Must be a number',
		},
		tags: ['DATAB'],
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
		tags: ['KESTR', 'DATAB'],
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
		label: 'Professional License Number (If applicable)',
		placeholder: 'Enter license number',
		tags: ['DATAB'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.email`,
		label: 'Employer/Business/School Email Address',
		placeholder: 'Enter email address',
		rules: {
			required: 'Please enter email address',
			validate: (v) =>
				validator.isEmail(v) ||
				'Email must be of the format: name@example.com',
		},
		tags: ['DATAB', 'remove-all-except'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.employment.statusDetails.tin`,
		label: 'TIN',
		placeholder: 'Enter TIN',
		rules: {
			required: 'Please enter TIN',
		},
		tags: ['DATAB'],
	},
	{
		fieldType: 'radio',
		name: `applicant.${index}.employment.statusDetails.annualNetIncome`,
		label: `Annual Net Income ${currency && '(' + currency +')'}`,
		rules: {
			required: 'Please select annual income range',
		},
		options: {
			keySelector: (key) => key as string,
			keys: [
				'1,000,000-3,000,000',
				'3,000,000-6,000,000',
				'above 6,000,000',
			],
		},
		tags: ['KESTR'],
	},
	{
		fieldType: 'radio',
		name: `applicant.${index}.employment.statusDetails.monthlyIncomeRange`,
		label: `Total Monthly Income Range ${currency && '(' + currency + ')'}`,
		rules: {
			required: 'Please select income range',
		},
		options: {
			keySelector: (key:string) => key as string,
			keys: [
				'Below 1,000',
				'Above 1,000-5,000',
				'Above 5,000-10,000',
				'Above 10,000',
			],
		},
		tags: ['DATAB'],
	},
];

export { employmentFieldsModel };

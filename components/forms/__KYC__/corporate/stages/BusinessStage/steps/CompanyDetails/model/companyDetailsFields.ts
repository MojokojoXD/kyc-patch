import type { FormFactoryProps } from '@/types/Components/formFactory';
import validator from 'validator';

const TURN_OVER_AMOUNTS = [
	'Below 10,000',
	'Between 10,000 - 100,000',
	'Above 100,000',
	'Above 10 million',
];

export const companyDetailsFields = (_params?: { index?: number }): FormFactoryProps[] => [
	{
		fieldType: 'text',
		name: 'businessInfo.details.name',
		label: 'Company/Business Name',
		placeholder: 'Enter company/business name',
		rules: {
			required: 'please enter company/business name',
		},
	},
	{
		fieldType: 'text',
		name: 'businessInfo.details.type',
		label: 'Type/Nature of Business',
		placeholder: 'Enter type/nature of business',
		rules: {
			required: 'please enter type/nature of business',
		},
	},
	{
		fieldType: 'text',
		name: 'businessInfo.details.sectorIndustry',
		label: 'Sector/Industry',
		placeholder: 'Enter sector/industry',
		rules: {
			required: 'please enter sector/industry',
		},
	},
	{
		fieldType: 'text',
		name: 'businessInfo.details.physicalAddress',
		label: 'Principal Place of Business/Physical Address (not a P.O. Box)',
		placeholder: 'Enter physical address',
		rules: {
			required: 'please enter physical address',
		},
	},
	{
		fieldType: 'text',
		name: 'businessInfo.details.postalAddress',
		label: 'Postal Address',
		placeholder: 'Enter postal address',
		rules: {
			required: 'please enter postal address',
		},
	},
	{
		fieldType: 'text',
		name: 'businessInfo.details.city',
		label: 'City/Town',
		placeholder: 'Enter city/town',
		rules: {
			required: 'please enter city/town',
		},
	},
	{
		fieldType: 'phone',
		name: 'businessInfo.details.phoneNumber',
		label: 'Phone/Mobile Number(s)',
		placeholder: 'Enter phone/mobile number',
	},
	{
		fieldType: 'text',
		name: 'businessInfo.details.email',
		label: 'Email Address',
		placeholder: 'Enter email address',
		rules: {
			required: 'Please enter email address',
			validate: (v) =>
				validator.isEmail(v) || 'Email must be of format: name@example.com',
		},
	},
	{
		fieldType: 'dropdown',
		name: 'businessInfo.details.countryOfIncorporation',
		label: 'Country of Incorporation',
		placeholder: 'Enter country of incorporation',
		rules: {
			required: 'Select country',
		},
		componentProps: {
			isCountryList: true,
		},
	},
	{
		fieldType: 'text',
		name: 'businessInfo.details.website',
		label: 'Website (Optional)',
		placeholder: 'http://',
	},
	{
		fieldType: 'text',
		name: 'businessInfo.details.digitalAddress',
		label: 'Digital Address (GhanaPost GPS)',
		placeholder: 'Enter digital address',
	},
	{
		fieldType: 'radio',
		name: 'businessInfo.details.turnOver.monthlyAmount',
		label: 'Monthly Turnover (GHC)',
		options: {
			keys: TURN_OVER_AMOUNTS,
		},
	},
	{
		fieldType: 'radio',
		name: 'businessInfo.details.turnOver.annualAmount',
		label: 'Annual Turnover (GHC)',
		options: {
			keys: TURN_OVER_AMOUNTS,
		},
	},
];

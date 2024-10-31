import type { FormFactoryProps } from '@/types/Components/formFactory';
import type { Country } from '@/types/forms/common';
import type { Director } from '@/types/forms/corporateSchema';
import { sub } from 'date-fns';
import validator from 'validator';
import { isPossiblePhoneNumber } from 'react-phone-number-input';

const today = new Date();
const MIN_AGE = sub(today, { years: 18 });

export const directorsModel = ({
	index,
	countryList = [],
}: {
	index: number;
	countryList?: Country[];
}): FormFactoryProps[] => [
	{
		fieldType: 'text',
		name: `accountSignatories.directors.${index}.firstName`,
		inline: true,
		label: 'Full Name',
		placeholder: 'First name',
		rules: {
			required: 'Please enter first name',
			validate: (v) => (v as string).length > 2 || 'Entry too short',
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.directors.${index}.middleName`,
		inline: true,
		label: '',
		placeholder: 'Middle name',
		tags: ['read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.directors.${index}.lastName`,
		inline: true,
		label: '',
		placeholder: 'Last name',
		rules: {
			required: 'Please enter last name',
			validate: (v) => (v as string).length > 2 || 'Entry too short',
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'radio',
		name: `accountSignatories.directors.${index}.idType`,
		label: 'ID Type',
		rules: {
			required: 'Select ID type',
		},
		options: {
			keys: ['Passport', 'National ID', "Driver's License"],
			keySelector(key) {
				return key as string;
			},
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'phone',
		name: `accountSignatories.directors.${index}.phoneNumber`,
		label: 'Phone/Mobile Number(s)',
		placeholder: 'Enter phone/mobile number',
		rules: {
			required: 'Please enter phone number',
			validate: (v) =>
				isPossiblePhoneNumber(v as string) || 'Please enter valid phone number',
		},
		options: {
			keys: countryList,
			keySelector(key) {
				return (key as Country).cty_name;
			},
			priorityKeys: (keys) =>
				(keys as Country[]).filter(
					(c) => c.cty_code === 'GH' || c.cty_code === 'KE' || c.cty_code === 'NG'
				),
		},
	},
	{
		fieldType: 'text',
		name: `accountSignatories.directors.${index}.residentialAddress`,
		label: 'Home Address',
		placeholder: 'Enter home address',
		rules: {
			required: 'Please enter home address',
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'date',
		name: `accountSignatories.directors.${index}.dateOfBirth`,
		label: 'Date of Birth',
		placeholder: 'Select date',
		rules: {
			required: 'Please select date',
		},
		componentProps: {
			disabled: { after: MIN_AGE },
			endMonth: MIN_AGE,
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'radio',
		name: `accountSignatories.directors.${index}.status`,
		label: 'Status',
		rules: {
			required: 'Please select status',
		},
		options: {
			keys: ['Executive', 'Non-Executive'],
			keySelector(key) {
				return key as string;
			},
		},
		componentProps: {
			className: 'grid-cols-2',
		},
	},
	{
		fieldType: 'radio',
		name: `accountSignatories.directors.${index}.pepInfo.isPep`,
		label: 'Are you a Politically Exposed Person (PEP)?',
		rules: {
			required: 'Select option',
		},
		options: {
			keys: ['Yes', 'No'],
			keySelector(key) {
				return key as string;
			},
		},
		componentProps: {
			className: 'grid-cols-2',
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.directors.${index}.pepInfo.pepDetails.desc`,
		label: 'If Yes, Please Specify How',
		placeholder: 'Specify how',
		rules: {
			required: 'Please specify how',
		},
		tags: ['remove', 'read-only'],
	},
	{
		fieldType: 'dropdown',
		name: `accountSignatories.directors.${index}.pepInfo.pepDetails.country`,
		label: 'In which country',
		placeholder: 'Select country',
		rules: {
			required: 'Select option',
		},
		options: {
			keys: countryList,
			keySelector(key) {
				return (key as Country).cty_name;
			},
			priorityKeys: (keys) =>
				(keys as Country[]).filter(
					(c) =>
						(c.cty_code === 'GH') || (c.cty_code === 'KE') || (c.cty_code === 'NG')
				),
		},
		tags: ['remove', 'read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.directors.${index}.ownership`,
		label: 'Ownership (%)',
		placeholder: 'Enter ownership',
		rules: {
			required: 'Please enter ownership',
			validate: {
				isNumeric: (v) =>
					validator.isNumeric(v as string) || 'Entry must be a number',
				isWithinRange: (v) =>
					(parseInt(v as string) >= 0 && parseInt(v as string) <= 100) ||
					'Percentage must be between 0 and 100',
			},
		},
	},
];

export const directorsDefaultValues: Director = {
	firstName: '',
	middleName: '',
    lastName: '',
    idType: '',
    status: 'non-Executive',
	idNumber: '',
	phoneNumber: [
		{
			value: '',
		},
	],
	pepInfo: {
		isPep: 'No',
		pepDetails: {
			desc: '',
			country: '',
		},
	},
	dateOfBirth: '',
	residentialAddress: '',
	ownership: '',
	isPrefill: false,
};

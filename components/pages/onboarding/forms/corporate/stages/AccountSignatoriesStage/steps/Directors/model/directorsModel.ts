import type { FormFactoryProps } from '@/types/Components/formFactory';
import type { Country,CountryList } from '@/types/forms/common';
import type { Director } from '@/types/forms/corporateSchema';
import validator from 'validator';


export const directorsModel = ({
	index,
	countryList = [],
}: {
	index: number;
	countryList?: CountryList;
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
		options: {
			keys: countryList[1],
			keySelector(key) {
				return (key as Country).cty_name;
			},
			priorityKeys: countryList[0],
        },
        tags: [ 'read-only' ]
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
			keys: countryList[1],
			keySelector(key) {
				return (key as Country).cty_name;
			},
			priorityKeys: countryList[0],
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
    status: undefined,
	idNumber: '',
	phoneNumber: [
		{
            value: '',
            countryCode: 'GH'
		},
	],
	pepInfo: {
		isPep: undefined,
		pepDetails: {
			desc: '',
			country: '',
		},
	},
	ownership: '',
	isPrefill: false,
};

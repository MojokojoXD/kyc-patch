import type { FormFactoryProps } from '@/types/Components/formFactory';
import type { BeneficialOwner } from '@/types/forms/corporateSchema';
import validator from 'validator';

const MIN_AGE = 18;

export const beneficialOwnersModel = ({
	index,
}: {
	index: number;
}): FormFactoryProps[] => [
	{
		fieldType: 'text',
		name: `accountSignatories.beneficialOwners.${index}.firstName`,
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
		name: `accountSignatories.beneficialOwners.${index}.middleName`,
		inline: true,
		label: '',
		placeholder: 'Middle name',
		tags: ['read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.beneficialOwners.${index}.lastName`,
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
		name: `accountSignatories.beneficialOwners.${index}.idType`,
		label: 'ID Type',
		rules: {
			required: 'Select ID type',
		},
		options: {
			keys: ['Passport', 'National ID', "Driver's License"],
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'phone',
		name: `accountSignatories.beneficialOwners.${index}.phoneNumber`,
		label: 'Phone/Mobile Number(s)',
		placeholder: 'Enter phone/mobile number',
		tags: ['read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.beneficialOwners.${index}.residentialAddress`,
		label: 'Home Address',
		placeholder: 'Enter home address',
		rules: {
			required: 'Please enter home address',
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'date',
		name: `accountSignatories.beneficialOwners.${index}.dateOfBirth`,
		label: 'Date of Birth',
		placeholder: 'Select date',
		rules: {
			required: 'Please select date',
		},
		componentProps: {
			minYear: MIN_AGE,
			disableFutureDays: true,
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'radio',
		name: `accountSignatories.beneficialOwners.${index}.pepInfo.isPep`,
		label: 'Are you a Politically Exposed Person (PEP)?',
		rules: {
			required: 'Select option',
		},
		options: {
			keys: ['Yes', 'No'],
		},
		componentProps: {
			classNames: { radioGroupStyles: 'grid-cols-2' },
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.beneficialOwners.${index}.pepInfo.pepDetails.desc`,
		label: 'If Yes, Please Specify How',
		placeholder: 'Specify how',
		rules: {
			required: 'Please specify how',
		},
		tags: ['remove', 'read-only'],
	},
	{
		fieldType: 'dropdown',
		name: `accountSignatories.beneficialOwners.${index}.pepInfo.pepDetails.country`,
		label: 'In which country',
		placeholder: 'Select country',
		rules: {
			required: 'Select option',
		},
    componentProps: {
      isCountryList: true,
    },
		tags: ['remove', 'read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.beneficialOwners.${index}.ownership`,
		label: 'Ownership (%)',
		placeholder: 'Enter ownership',
		rules: {
			required: 'Please enter ownership',
			validate: {
				isNumeric: (v) => validator.isNumeric(v as string) || 'Entry must be a number',
				isWithinRange: (v) =>
					(parseInt(v as string) >= 0 && parseInt(v as string) <= 100) ||
					'Percentage must be between 0 and 100',
			},
		},
	},
];

export const beneficialOwnersDefaultValues: BeneficialOwner = {
	firstName: '',
	middleName: '',
	lastName: '',
	idType: '',
	idNumber: '',
	phoneNumber: [
		{
			value: '',
			countryCode: 'GH',
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

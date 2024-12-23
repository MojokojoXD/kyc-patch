import type { FormFactoryProps } from '@/types/Components/formFactory';
import validator from 'validator';

export const personalModel$NOK$Individual = ({
	index,
}: {
	index: number;
}): FormFactoryProps[] => [
	{
		fieldType: 'radio',
		name: `nextOfKin.${index}.title.presets`,
		label: 'Title',
		options: {
			keys: ['Mr', 'Mrs', 'Ms', 'Prof', 'Dr', 'Other'],
		},
		rules: {
			required: 'Select Title',
		},
		componentProps: {
			classNames: { radioGroupStyles: 'grid grid-cols-5' },
			otherInputProps: {
				label: 'Other? Specify',
				placeholder: 'Specify',
			},
		},
	},
	{
		fieldType: 'text',
		inline: true,
		name: `nextOfKin.${index}.firstName`,
		label: 'Full Name',
		rules: {
			required: 'Please enter first name',
			validate: (v: string) => v.length > 1 || 'entry is too short',
		},
		placeholder: 'First name',
		componentProps: {
			classNames: {
				errorPosition: 'absolute',
			},
		},
	},
	{
		fieldType: 'text',
		inline: true,
		name: `nextOfKin.${index}.middleName`,
		label: '',
		placeholder: 'Middle name(Optional)',
	},
	{
		fieldType: 'text',
		inline: true,
		name: `nextOfKin.${index}.lastName`,
		label: '',
		rules: {
			required: 'Please enter last name',
			validate: (v: string) => v.length > 1 || 'entry is too short',
		},
		placeholder: 'Last name',
		componentProps: {
			classNames: {
				errorPosition: 'absolute',
			},
		},
	},
	{
		fieldType: 'date',
		name: `nextOfKin.${index}.dateOfBirth`,
		label: 'Date of Birth',
		rules: {
			required: 'Select date of birth',
		},
		placeholder: 'Select dates',
		componentProps: {
			disableFutureDays: true,
		},
	},
	{
		fieldType: 'text',
		name: `nextOfKin.${index}.relationshipToApplicant`,
		label: 'Relationship to Applicant',
		placeholder: 'Enter relationship to applicant',
		rules: {
			required: 'Please enter relationship to applicant',
		},
	},
	{
		fieldType: 'radio',
		name: `nextOfKin.${index}.gender`,
		label: 'Gender',
		rules: {
			required: 'Select gender',
		},
		options: {
			keys: ['Male', 'Female'],
		},
		componentProps: {
			classNames: { radioGroupStyles: 'grid grid-cols-2 gap-[4px]' },
		},
	},
	{
		fieldType: 'radio',
		name: `nextOfKin.${index}.maritalStatus`,
		label: 'Marital Status',
		rules: {
			required: 'Select marital status',
		},
		options: {
			keys: ['Single', 'Married', 'Divorced', 'Separated'],
		},
		componentProps: {
			classNames: { radioGroupStyles: 'grid grid-cols-4 gap-[4px]' },
		},
	},
	{
		fieldType: 'dropdown',
		name: `nextOfKin.${index}.countryOfBirth`,
		label: 'Country of Birth',
		rules: {
			required: 'Select country of birth',
		},
    componentProps: {
      isCountryList: true,
    },
		placeholder: 'Select country',
	},
	{
		fieldType: 'text',
		name: `nextOfKin.${index}.placeOfBirth`,
		label: 'Place of Birth (Optional)',
		placeholder: 'Enter place of birth',
	},
	{
		fieldType: 'dropdown',
		name: `nextOfKin.${index}.countryOfResidence`,
		label: 'Country of Residence',
		rules: {
			required: 'Select country of residence',
		},
    componentProps: {
      isCountryList: true,
    },
		placeholder: 'Select country',
	},

	{
		fieldType: 'dropdown',
		name: `nextOfKin.${index}.countryOfCitizenship`,
		label: 'Nationality/Country of Citizenship',
		rules: {
			required: 'Select nationality',
		},
    componentProps: {
      isCountryList: true,
    },
		placeholder: 'Select country',
	},
	{
		fieldType: 'text',
		name: `nextOfKin.${index}.percentageAllocation`,
		label: 'Percentage Allocation (Optional)',
		placeholder: 'Enter number',
		rules: {
			validate: {
				isNumber: (v) =>
					!v || validator.isNumeric(v as string) || 'Entry must be a number',
				isWithinRange: (v) =>
					!v ||
					(parseInt(v as string) >= 0 && parseInt(v as string) <= 100) ||
					'Percentage must be between 0 and 100',
			},
		},
	},
];

import type { FormFactoryProps } from '@/types/Components/formFactory';
import type { Country } from '@/types/forms/common';

const today = new Date();

export const contactPersonModel = ({
	countryList = [],
}: {
    index?: number,
	countryList?: Country[];
}): FormFactoryProps[] => [
	{
		fieldType: 'radio',
		name: 'contacts.contactPerson.title.presets',
		label: 'Title',
		rules: {
			required: 'Select title',
		},
		options: {
			keys: ['Mr', 'Mrs', 'Ms', 'Prof', 'Dr', 'Other'],
			keySelector(key) {
				return key as string;
			},
		},
		componentProps: {
			className: 'grid-cols-5',
			otherProps: {
				label: 'Other? Specify',
				placeholder: 'Specify',
			},
		},
	},
	{
		fieldType: 'text',
		name: 'contacts.contactPerson.firstName',
		inline: true,
		label: 'Full Name',
		placeholder: 'First name',
		rules: {
			required: 'Please enter first name',
			validate: (v) => (v as string).length > 2 || 'Entry too short',
		},
	},
	{
		fieldType: 'text',
		name: 'contacts.contactPerson.middleName',
		inline: true,
		label: '',
		placeholder: 'Middle name',
		rules: {
			required: 'Please enter Middle name',
			validate: (v) => (v as string).length > 2 || 'Entry too short',
		},
	},
	{
		fieldType: 'text',
		name: 'contacts.contactPerson.lastName',
		inline: true,
		label: '',
		placeholder: 'Last name',
		rules: {
			required: 'Please enter last name',
			validate: (v) => (v as string).length > 2 || 'Entry too short',
		},
	},
	{
		fieldType: 'date',
		name: 'contacts.contactPerson.dateOfBirth',
		label: 'Date of Birth',
		placeholder: 'Select date',
		rules: {
			required: 'Please select date',
		},
		componentProps: {
			disabled: { after: today },
			endMonth: today,
		},
	},
	{
		fieldType: 'radio',
		name: 'contacts.contactPerson.gender',
		label: 'Gender',
		rules: {
			required: 'Select gender',
		},
		options: {
			keys: ['Male', 'Female'],
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
		name: 'contacts.contactPerson.maritalStatus',
		label: 'Marital Status',
		rules: {
			required: 'Select option',
		},
		options: {
			keys: ['Single', 'Married', 'Separated', 'Divorced'],
			keySelector(key) {
				return key as string;
			},
		},
		componentProps: {
			className: 'grid-cols-4',
		},
	},
	{
		fieldType: 'text',
		name: 'contacts.contactPerson.placeOfBirth',
		label: 'Place of Birth',
		placeholder: 'Place of birth',
		rules: {
			required: 'Please enter place of birth',
		},
	},
	{
		fieldType: 'dropdown',
		name: 'contacts.contactPerson.countryOfBirth',
		label: 'Country of Birth',
		placeholder: 'Select country',
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
	},
	{
		fieldType: 'dropdown',
		name: 'contacts.contactPerson.citizenship',
		label: 'Citizenship',
		placeholder: 'Select country',
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
	},
	{
		fieldType: 'dropdown',
		name: 'contacts.contactPerson.countryOfResidence',
		label: 'Country of Residence',
		placeholder: 'Select country',
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
	},
	{
		fieldType: 'radio',
		name: 'contacts.contactPerson.residenceStatus',
		label: 'Residence Status',
		options: {
			keys: [
				'Resident Ghanaian',
				'Resident Foreigner',
				'Non-Resident Ghanaian',
				'Non-Resident Foreigner',
			],
			keySelector(key) {
				return key as string;
			},
		},
		componentProps: {
			toggleStyles: 'pointer-events-none',
		},
	},
	{
		fieldType: 'text',
		name: 'contacts.contactPerson.profession',
		label: 'Profession',
		placeholder: 'Enter profession',
		rules: {
			required: 'Please enter profession',
		},
	},
	{
		fieldType: 'text',
		name: 'contacts.contactPerson.occupation',
		label: 'Occupation',
		placeholder: 'Enter occupation',
		rules: {
			required: 'Please enter occupation',
		},
	},
	{
		fieldType: 'text',
		name: 'contacts.contactPerson.jobTitle',
		label: 'Job Title',
		placeholder: 'Enter job title',
		rules: {
			required: 'Please enter job title',
		},
	},
	{
		fieldType: 'text',
		name: 'contacts.contactPerson.mothersMaidenName',
		label: "Mother's Maiden Name",
		placeholder: 'Enter mothers maiden name',
		rules: {
			required: 'Please enter mothers maiden name',
		},
	},
	{
		fieldType: 'text',
		name: 'contacts.contactPerson.maidenName',
		label: 'Maiden Name (Optional)',
		placeholder: 'Enter maiden name',
	},
	{
		fieldType: 'text',
		name: 'contacts.contactPerson.professionalLicenseNo',
		label: 'Professional License Number (If Applicable)',
		placeholder: 'Enter number',
	},
	{
		fieldType: 'text',
		name: 'contacts.contactPerson.tin',
		label: 'Tax Identification Number',
		placeholder: 'Enter TIN',
		rules: {
			required: 'Please enter TIN',
		},
	},
	{
		fieldType: 'radio',
		name: 'contacts.contactPerson.isSignatory',
		label: 'Will this contact person also be an account signatory?',
		options: {
			keys: ['Yes', 'No'],
			keySelector(key) {
				return key as string;
			},
		},
		componentProps: {
			className: 'grid-cols-2',
		},
	},
];

import type { FormFactoryProps } from '@/types/Components/formFactory';
import type { Country, CountryList } from '@/types/forms/common';


const MIN_AGE = 18;

export const contactPersonModel = ({
	countryList = [],
}: {
	index?: number;
	countryList?: CountryList;
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
            minYear: MIN_AGE,
            disableFutureDays: true,
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
			keys: countryList[1],
			keySelector(key) {
				return (key as Country).cty_name;
			},
			priorityKeys: countryList[0],
		},
	},
	{
		fieldType: 'dropdown',
		name: 'contacts.contactPerson.citizenship',
		label: 'Citizenship',
		placeholder: 'Select country',
		options: {
			keys: countryList[1],
			keySelector(key) {
				return (key as Country).cty_name;
			},
			priorityKeys: countryList[0],
		},
	},
	{
		fieldType: 'dropdown',
		name: 'contacts.contactPerson.countryOfResidence',
		label: 'Country of Residence',
		placeholder: 'Select country',
		options: {
			keys: countryList[1],
			keySelector(key) {
				return (key as Country).cty_name;
			},
			priorityKeys: countryList[0],
		},
	},
	{
		fieldType: 'radio',
        name: 'contacts.contactPerson.residenceStatus',
        readonly: true,
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

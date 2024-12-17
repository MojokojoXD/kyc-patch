import type { FormFactoryProps } from '@/types/Components/formFactory';

const MIN_AGE = 18;

export const contactPersonModel = ({}: {
	index?: number;
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
		},
		componentProps: {
			classNames: { radioGroupStyles: 'grid-cols-5' },
			otherInputProps: {
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
		},
		componentProps: {
			classNames: { radioGroupStyles: 'grid-cols-2' },
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
		},
		componentProps: {
			classNames: { radioGroupStyles: 'grid-cols-4' },
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
		rules: {
			required: 'Select country of birth',
		},
		componentProps: {
			isCountryList: true,
		},
	},
	{
		fieldType: 'dropdown',
		name: 'contacts.contactPerson.citizenship',
		label: 'Citizenship',
		placeholder: 'Select country',
		rules: {
			required: 'Select citizenship',
		},
		componentProps: {
			isCountryList: true,
		},
	},
	{
		fieldType: 'dropdown',
		name: 'contacts.contactPerson.countryOfResidence',
		label: 'Country of Residence',
		placeholder: 'Select country',
		rules: {
			required: 'Select country of residence',
		},
		componentProps: {
			isCountryList: true,
		},
	},
	{
		fieldType: 'radio',
		name: 'contacts.contactPerson.residence.status',
		readonly: true,
		label: 'Residence Status',
		options: {
			keys: [
				'Resident Ghanaian',
				'Resident Foreigner',
				'Non-Resident Ghanaian',
				'Non-Resident Foreigner',
			],
		},
    },
  {
		fieldType: 'text',
		name: `contacts.contactPerson.residence.permitNumber`,
		label: 'Residence Permit Number',
		placeholder: 'Enter permit number',
		rules: {
			required: 'Please enter permit number',
		},
		tags: ['GH'],
	},
	{
		fieldType: 'date',
		name: `contacts.contactPerson.residence.permitIssueDate`,
		label: 'Permit Issue Date',
		placeholder: 'DD/MM/YYYY',
		rules: {
			required: 'Select date',
		},
		componentProps: {
			disableFutureDays: true,
		},
		tags: ['GH'],
	},
	{
		fieldType: 'text',
		name: `contacts.contactPerson.residence.permitIssuePlace`,
		label: 'Place of Issue',
		placeholder: 'Enter place of Issue',
		rules: {
			required: 'Please enter place of issue',
		},
		tags: ['GH'],
	},
	{
		fieldType: 'date',
		name: `contacts.contactPerson.residence.permitExpiry`,
		label: 'Permit Expiry Date',
		placeholder: 'DD/MM/YYYY',
		rules: {
			required: 'Select date',
		},
		componentProps: {
			disablePastDays: true,
		},
		tags: ['GH'],
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
		label: 'Professional License Number (Optional)',
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
		rules: {
			required: 'Select signatory status',
		},
		options: {
			keys: ['Yes', 'No'],
		},
		componentProps: {
			classNames: { radioGroupStyles: 'grid-cols-2' },
		},
	},
];

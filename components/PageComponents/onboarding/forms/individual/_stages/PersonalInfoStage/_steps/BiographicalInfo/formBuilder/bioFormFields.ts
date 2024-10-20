import type { FormFactoryProps } from '@/types/Components/formFactory';
import { sub, add } from 'date-fns';
import type { Country } from '@/types/forms/universal';
import OPTIONS from '@/utils/vars/_formDefaults/personal_multiple_choice.json';

const today = new Date();
const minAgeDate = sub(today, { years: 18 });

const bioFieldsModel = ({
	index,
	countryList = [],
}: {
	index: number;
	countryList?: Country[];
}): FormFactoryProps[] => [
	{
		fieldType: 'radio',
		name: `applicant.${index}.title.presets`,
		label: 'Title',
		rules: {
			required: 'Please enter select title',
		},
		options: {
			keySelector: (key: string) => key,
			keys: OPTIONS.bio.title,
		},
		componentProps: {
			className: 'grid grid-cols-5',
		},
	},
	{
		fieldType: 'text',
		inline: true,
		name: `applicant.${index}.firstName`,
		label: 'Full Name',
		rules: {
			required: 'Please enter first name',
			validate: (v: string) => v.length > 1 || 'entry is too short',
		},
		placeholder: 'First name',
	},
	{
		fieldType: 'text',
		inline: true,
		name: `applicant.${index}.middleName`,
		label: '',
		placeholder: 'Middle name(Optional)',
	},
	{
		fieldType: 'text',
		inline: true,
		name: `applicant.${index}.lastName`,
		label: '',
		rules: {
			required: 'Please enter last name',
			validate: (v: string) => v.length > 1 || 'entry is too short',
		},
		placeholder: 'Last name',
	},
	{
		fieldType: 'date',
		name: `applicant.${index}.dateOfBirth`,
		label: 'Date of Birth',
		rules: {
			required: 'Select date of birth',
		},
		placeholder: 'Select dates',
		componentProps: {
			disabled: { after: minAgeDate },
			defaultMonth: minAgeDate,
			startMonth: sub(minAgeDate, { years: 100 }),
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.mothersMaidenName`,
		label: "Mother's maiden name",
		rules: {
			required: 'Please enter place of birth',
			validate: (v: string) => v.length > 1 || 'entry is too short',
		},
		placeholder: 'Enter name',
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.maidenName`,
		label: 'Maiden name (Optional)',
		placeholder: 'Enter name',
	},
	{
		fieldType: 'radio',
		name: `applicant.${index}.gender` as const,
		label: 'Gender',
		rules: {
			required: 'Select gender',
		},
		options: {
			keySelector: (key) => key as string,
			keys: OPTIONS.bio.gender,
		},
		componentProps: {
			className: 'grid grid-cols-2 gap-[4px]',
		},
	},
	{
		fieldType: 'radio',
		name: `applicant.${index}.maritalStatus` as const,
		label: 'Marital Status',
		rules: {
			required: 'Select marital status',
		},
		options: {
			keySelector: (key) => key as string,
			keys: OPTIONS.bio.maritalStatus,
		},
		componentProps: {
			className: 'grid grid-cols-4 gap-[4px]',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.placeOfBirth`,
		label: 'Place of Birth',
		rules: {
			required: 'Please enter place of birth',
			validate: (v: string) => v.length > 1 || 'entry is too short',
		},
		placeholder: 'Enter place of birth',
	},
	{
		fieldType: 'dropdown',
		name: `applicant.${index}.countryOfResidence` as const,
		label: 'Country of Residence',
		rules: {
			required: 'Select country of residence',
		},
		options: {
			keySelector: (key) => (key as Country).cty_name,
			keys: countryList,
			priorityKeys: (keys) =>
				(keys as Country[]).filter(
					(k) =>
						k.cty_code === 'GH' ||
						k.cty_code === 'NG' ||
						k.cty_code === 'KE'
				),
		},
		placeholder: 'Select country',
	},

	{
		fieldType: 'dropdown',
		name: `applicant.${index}.countryOfCitizenship`,
		label: 'Nationality/Country of Citizenship',
		rules: {
			required: 'Select nationality',
		},
		options: {
			keySelector: (key) => (key as Country).cty_name,
			keys: countryList,
			priorityKeys: (keys) =>
				(keys as Country[]).filter(
					(k) =>
						k.cty_code === 'GH' ||
						k.cty_code === 'NG' ||
						k.cty_code === 'KE'
				),
		},
		placeholder: 'Select country',
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.stateOfOrigin`,
		label: 'State of Origin',
		placeholder: 'Enter state',
		rules: {
			required: 'Please enter state of origin',
		},
		tags: ['NG', 'local'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.localGovernment`,
		label: 'Local Government',
		placeholder: 'Enter local government',
		rules: {
			required: 'Please enter local government',
		},
		tags: ['NG', 'local'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.religion`,
		label: 'Religion',
		placeholder: 'Enter religion',
		rules: {
			required: 'Please enter religion',
		},
		tags: ['NG', 'local'],
	},
	// {
	// 	fieldType: 'dropdown',
	// 	name: `applicant.${index}.countryOfBirth` as const,
	// 	label: 'Country of Birth',
	// 	rules: {
	// 		required: 'Select country of birth',
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
	// 	placeholder: 'Select country',
	// },
	{
		name: `applicant.${index}.residence.status`,
		fieldType: 'radio',
		label: 'Residential Status',
		options: {
			keySelector: (key) => key as string,
			keys: [
				'Resident Ghanaian',
				'Resident Foreigner',
				'Non-Resident Ghanaian',
				'Non-Resident Foreigner',
			],
		},
		tags: ['GH', 'foreign'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.residence.permitNumber`,
		label: 'Residence Permit Number',
		placeholder: 'Enter permit number',
		rules: {
			required: 'Please enter permit number',
		},
		tags: ['GH', 'NG', 'foreign'],
	},
	{
		fieldType: 'date',
		name: `applicant.${index}.residence.permitIssueDate`,
		label: 'Permit Issue Date',
		placeholder: 'DD/MM/YYYY',
		rules: {
			required: 'Select date',
		},
		componentProps: {
			startMonth: sub(today, { years: 100 }),
			endMonth: today,
			disabled: { after: today },
			defaultMonth: today,
		},
		tags: ['GH', 'foreign'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.residence.permitIssuePlace`,
		label: 'Place of Issue',
		placeholder: 'Enter place of Issue',
		rules: {
			required: 'Please enter place of issue',
		},
		tags: ['GH', 'foreign'],
	},
	{
		fieldType: 'date',
		name: `applicant.${index}.residence.permitExpiry`,
		label: 'Permit Expiry Date',
		placeholder: 'DD/MM/YYYY',
		rules: {
			required: 'Select date',
		},
		componentProps: {
			startMonth: today,
			endMonth: add(today, { years: 100 }),
			disabled: { before: today },
			defaultMonth: today,
		},
		tags: ['GH', 'foreign'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.licenseNumber`,
		label: 'Professional License Number(Optional)',
		placeholder: 'Enter professional license number',
	},
];

export { bioFieldsModel };

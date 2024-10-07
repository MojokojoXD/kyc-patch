import type { FormFactoryProps } from '@/components/UIcomponents/FormFactory';
import { sub } from 'date-fns';
import type { Country } from '@/types/forms/universal';
import countries from '@/utils/vars/_formDefaults/countries.json';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import Image from 'next/image';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import OPTIONS from '@/utils/vars/_formDefaults/personal_multiple_choice.json';
import { dyanamic_bio_fields } from './DynamicFields/fieldsMap';

const today = new Date();
const minAgeDate = sub(today, { years: 18 });

const base_bio_fields = (indexer: number): FormFactoryProps[] => [
	{
		fieldType: 'radio',
		name: `applicant.${indexer}.title.presets` as const,
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
		name: `applicant.${indexer}.firstName` as const,
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
		name: `applicant.${indexer}.middleName` as const,
		label: '',
		placeholder: 'Middle name(Optional)',
	},
	{
		fieldType: 'text',
		inline: true,
		name: `applicant.${indexer}.lastName` as const,
		label: '',
		rules: {
			required: 'Please enter last name',
			validate: (v: string) => v.length > 1 || 'entry is too short',
		},
		placeholder: 'Last name',
	},
	{
		fieldType: 'date',
		name: `applicant.${indexer}.dateOfBirth` as const,
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
		fieldType: 'radio',
		name: `applicant.${indexer}.gender` as const,
		label: 'Gender',
		rules: {
			required: 'Select gender',
		},
		options: {
			keySelector: (key: string) => key,
			keys: OPTIONS.bio.gender,
		},
		componentProps: {
			className: 'grid grid-cols-2 gap-[4px]',
		},
	},
	{
		fieldType: 'radio',
		name: `applicant.${indexer}.maritalStatus` as const,
		label: 'Marital Status',
		rules: {
			required: 'Select marital status',
		},
		options: {
			keySelector: (key: string) => key,
			keys: OPTIONS.bio.maritalStatus,
		},
		componentProps: {
			className: 'grid grid-cols-4 gap-[4px]',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${indexer}.placeOfBirth`,
		label: 'Place of Birth',
		rules: {
			required: 'Please enter place of birth',
			validate: (v: string) => v.length > 1 || 'entry is too short',
		},
		placeholder: 'Enter place of birth',
	},
	{
		fieldType: 'dropdown',
		name: `applicant.${indexer}.countryOfResidence` as const,
		label: 'Country of Residence',
		rules: {
			required: 'Select country of residence',
		},
		options: {
			keySelector: (key: Country) => key.cty_name,
			keys: countries.data,
		},
		placeholder: 'Select country',
	},
	{
		fieldType: 'dropdown',
		name: `applicant.${indexer}.countryOfCitizenship` as const,
		label: 'Nationality/Country of Citizenship',
		rules: {
			required: 'Select nationality',
		},
		options: {
			keySelector: (key: Country) => key.cty_name,
			keys: countries.data,
		},
		placeholder: 'Select country',
	},
	{
		fieldType: 'dropdown',
		name: `applicant.${indexer}.countryOfBirth` as const,
		label: 'Country of Birth',
		rules: {
			required: 'Select country of birth',
		},
		options: {
			keySelector: (key: Country) => key.cty_name,
			keys: countries.data,
		},
		placeholder: 'Select country',
	},
	{
		fieldType: 'text',
		name: `applicant.${indexer}.mothersMaidenName`,
		label: "Mother's maiden name",
		rules: {
			required: 'Please enter place of birth',
			validate: (v: string) => v.length > 1 || 'entry is too short',
		},
		placeholder: 'Enter name',
	},
	{
		fieldType: 'text',
		name: `applicant.${indexer}.maidenName`,
		label: "Mother's maiden name",
		placeholder: 'Enter name',
	},
];

const getBioFields = (indexer: number, ...identifiers: (string)[]) =>
	identifiers.reduce<FormFactoryProps[]>((result, currentValue) => {
		if (!dyanamic_bio_fields.has(currentValue)) return result;

		return result.concat(dyanamic_bio_fields.get(currentValue)?.call(this, indexer) || []);
	}, base_bio_fields(indexer));

export { getBioFields };

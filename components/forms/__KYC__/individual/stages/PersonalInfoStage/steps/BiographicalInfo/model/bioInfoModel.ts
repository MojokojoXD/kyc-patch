import type { FormFactoryProps } from '@/types/Components/formFactory';
import type { CountryList } from '@/types/forms/common';
import type { ClientInfo } from '@/types/forms/individualSchema';
import OPTIONS from '@/utils/vars/_formDefaults/personal_multiple_choice.json';
import { FormHelpers } from '@/utils/clientActions/formHelpers';

const MIN_AGE = 18

export const bioInfoModel = ({
	index,
	countryList = [],
}: {
	index: number;
	countryList?: CountryList;
}): FormFactoryProps[] => [
	{
		fieldType: 'radio',
		name: `applicant.${index}.title.presets`,
		label: 'Title',
		rules: {
			required: 'Please enter select title',
		},
		options: {
			keys: ['Mr', 'Mrs', 'Ms', 'Prof', 'Dr', 'Other'],
		},
		componentProps: {
			className: 'grid grid-cols-5',
			otherProps: {
				label: 'Other? Specify',
				placeholder: 'Enter title',
			},
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
            disableFutureDays: true,
            minYear: MIN_AGE
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.mothersMaidenName`,
		label: "Mother's Maiden Name",
		rules: {
			required: 'Please enter place of birth',
			validate: (v: string) => v.length > 1 || 'entry is too short',
		},
		placeholder: 'Enter name',
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.maidenName`,
		label: 'Maiden Name (Optional)',
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
		name: `applicant.${index}.countryOfResidence`,
		label: 'Country of Residence',
		rules: {
			required: 'Select country of residence',
		},
		options: {
			keys: countryList.at(1),
			priorityKeys: countryList.at(0),
		},
		placeholder: 'Select country',
	},

	{
		fieldType: 'dropdown',
		name: `applicant.${index}.citizenship`,
		label: 'Nationality/Country of Citizenship',
		rules: {
			required: 'Select nationality',
		},
		options: {
			keys: countryList.at(1),
			priorityKeys: countryList.at(0),
		},
		placeholder: 'Select country',
	},
	{
		name: `applicant.${index}.residence.status`,
		fieldType: 'radio',
		readonly: true,
		label: 'Residential Status',
		rules: {
			deps: [
				`applicant.${index}.countryOfCitizenship`,
				`applicant.${index}.countryOfResidence`,
			],
		},
		options: {
			keys: [
				'Resident Ghanaian',
				'Resident Foreigner',
				'Non-Resident Ghanaian',
				'Non-Resident Foreigner',
			],
		},
		componentProps: {
			toggleStyles: 'pointer-events-none',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.residence.permitNumber`,
		label: 'Residence Permit Number',
		placeholder: 'Enter permit number',
		rules: {
			required: 'Please enter permit number',
		},
		tags: ['GH'],
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
            disableFutureDays: true
		},
		tags: ['GH'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.residence.permitIssuePlace`,
		label: 'Place of Issue',
		placeholder: 'Enter place of Issue',
		rules: {
			required: 'Please enter place of issue',
		},
		tags: ['GH'],
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
            disablePastDays: true,
		},
		tags: ['GH'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.licenseNumber`,
		label: 'Professional License Number (Optional)',
		placeholder: 'Enter professional license number',
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.stateOfOrigin`,
		label: 'State of Origin',
		placeholder: 'Enter state',
		tags: ['NG'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.localGovernment`,
		label: 'Local Government',
		placeholder: 'Enter local government',
		tags: ['NG'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.religion`,
		label: 'Religion',
		placeholder: 'Enter religion',
		tags: ['NG'],
	},
];

export const bioInfoDefaultValue: ClientInfo = {
	id: FormHelpers.generateUniqueIdentifier(),
	title: {
		presets: undefined,
		other: '',
	},
	firstName: '',
	middleName: '',
	lastName: '',
	dateOfBirth: '',
	gender: undefined,
	maritalStatus: undefined,
	placeOfBirth: '',
	countryOfResidence: '',
	citizenship: '',
	profession: '',
	occupation: '',
	maidenName: '',
	mothersMaidenName: '',
	professionalLicenseNo: '',
	tin: '',
	residence: {
		status: undefined,
		details: {
			permitNumber: '',
			permitExpiry: '',
			permitIssueDate: '',
			permitIssuePlace: '',
		},
	},
	contacts: {
		residentialAddress: '',
		city: '',
		phoneNumber: [
			{
				value: '',
				countryCode: 'GH',
			},
		],
		email: '',
        postalAddress: '',
        emergencyContact: {
            contactName: '',
            relation: '',
            phoneNumber: [
                {
                    value: '',
                    countryCode: 'GH'
                }
            ]
        }
	},
	employment: {
		status: '',
	},
	bank: {
		locale: {
			country: '',
			name: '',
			branch: '',
		},
		account: {
			name: '',
			number: '',
		},
	},
	proofOfIdentity: {
		idNumber: '',
		idType: '',
		issueDate: '',
		placeOfIssue: '',
		expiryDate: '',
	},
	riskProfile: {
		sourceOfFunds: [],
	},
	disclosures: {
		signatureResource: '',
		ratification: {
			nameOfDeclarant: '',
			languageOfUnderstanding: '',
		},
		pepInfo: {
			isPep: 'No',
		},
		fatca: {
			status: [],
		},
		kestrel: {
			nomineeAgreement: {
				signatureResource: '',
			},
        },
        databank: {
            emailIndemnity: {
                signatureResource: ''
            }
        }
    },
    fileUploads: {}
};

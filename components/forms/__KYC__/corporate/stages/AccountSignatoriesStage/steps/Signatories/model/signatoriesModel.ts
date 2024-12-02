import type { FormFactoryProps } from '@/types/Components/formFactory';
import type { CountryList } from '@/types/forms/common';
import validator from 'validator';
import type { Signatory } from '@/types/forms/corporateSchema';
import { FormHelpers } from '@/utils/clientActions/formHelpers';

const MIN_AGE = 18;

export const signatoriesModel = ({
	index,
	clientID = '',
	countryList = [],
}: {
	index: number;
	clientID?: string;
	countryList?: CountryList;
}): FormFactoryProps[] => [
	{
		fieldType: 'checkbox',
		name: `accountSignatories.signatories.${index}.role`,
		label: 'Do any of the roles apply to the signatory? (Optional)',
		options: {
			keys: ['Director/Executive/Trustee/Admin', 'Beneficial Owner'],
		},
	},
	{
		fieldType: 'radio',
		name: `accountSignatories.signatories.${index}.title.presets`,
		label: 'Title',
		rules: {
			required: 'Select title',
		},
		options: {
			keys: ['Mr', 'Mrs', 'Ms', 'Prof', 'Dr', 'Other'],
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
		name: `accountSignatories.signatories.${index}.firstName`,
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
		name: `accountSignatories.signatories.${index}.middleName`,
		inline: true,
		label: '',
		placeholder: 'Middle name',
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.lastName`,
		inline: true,
		label: '',
		placeholder: 'Last name',
		rules: {
			required: 'Please enter last name',
			validate: (v) => (v as string).length > 2 || 'Entry too short',
		},
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.address.email`,
		label: 'Email Address',
		placeholder: 'Enter email address',
		rules: {
			required: 'Please enter email address',
			validate: (v) =>
				validator.isEmail(v as string) ||
				'Email must be of the format: name@example.com',
		},
	},
	{
		fieldType: 'date',
		name: `accountSignatories.signatories.${index}.dateOfBirth`,
		label: 'Date of Birth',
		placeholder: 'Select date',
		rules: {
			required: 'Please select date',
		},
		componentProps: {
			disableFutureDays: true,
			minYear: MIN_AGE,
		},
	},
	{
		fieldType: 'radio',
		name: `accountSignatories.signatories.${index}.gender`,
		label: 'Gender',
		rules: {
			required: 'Select gender',
		},
		options: {
			keys: ['Male', 'Female'],
		},
		componentProps: {
			className: 'grid-cols-2',
		},
	},
	{
		fieldType: 'radio',
		name: `accountSignatories.signatories.${index}.maritalStatus`,
		label: 'Marital Status',
		rules: {
			required: 'Select option',
		},
		options: {
			keys: ['Single', 'Married', 'Separated', 'Divorced'],
		},
		componentProps: {
			className: 'grid-cols-4',
		},
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.placeOfBirth`,
		label: 'Place of Birth',
		placeholder: 'Place of birth',
		rules: {
			required: 'Please enter place of birth',
		},
	},
	{
		fieldType: 'dropdown',
		name: `accountSignatories.signatories.${index}.countryOfBirth`,
		label: 'Country of Birth',
		placeholder: 'Select country',
		rules: {
			required: 'Please select country',
		},
		options: {
			keys: countryList[1],

			priorityKeys: countryList[0],
		},
	},
	{
		fieldType: 'dropdown',
		name: `accountSignatories.signatories.${index}.citizenship`,
		label: 'Citizenship',
		placeholder: 'Select country',
		rules: {
			required: 'Please select country',
		},
		options: {
			keys: countryList[1],

			priorityKeys: countryList[0],
		},
	},
	{
		fieldType: 'dropdown',
		name: `accountSignatories.signatories.${index}.countryOfResidence`,
		label: 'Country of Residence',
		placeholder: 'Select country',
		rules: {
			required: 'Please select country',
		},
		options: {
			keys: countryList[1],

			priorityKeys: countryList[0],
		},
	},
	{
		fieldType: 'radio',
		name: `accountSignatories.signatories.${index}.residenceStatus`,
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
		fieldType: 'phone',
		name: `accountSignatories.signatories.${index}.address.phoneNumber`,
		label: 'Phone/Mobile Number(s)',
		placeholder: 'Enter phone/mobile number',
		options: {
			keys: countryList[1],

			priorityKeys: countryList[0],
		},
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.address.residentialAddress`,
		label: 'Residential Address (Not a P.O. Box)',
		placeholder: 'Enter residential address',
		rules: {
			required: 'Please enter residential address',
		},
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.address.city`,
		label: 'City/Town',
		placeholder: 'Enter city/town',
		rules: {
			required: 'Please enter city/town',
		},
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.profession`,
		label: 'Profession',
		placeholder: 'Enter profession',
		rules: {
			required: 'Please enter profession',
		},
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.occupation`,
		label: 'Occupation',
		placeholder: 'Enter occupation',
		rules: {
			required: 'Please enter occupation',
		},
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.jobTitle`,
		label: 'Job Title',
		placeholder: 'Enter job title',
		rules: {
			required: 'Please enter job title',
		},
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.tin`,
		label: 'Tax Identification Number',
		placeholder: 'Enter TIN',
		rules: {
			required: 'Please enter TIN',
		},
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.address.postalAddress`,
		label: 'Postal Address',
		placeholder: 'Enter postal address',
		rules: {
			required: 'Please enter postal Address',
		},
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.address.digitalAddress`,
		label: 'Digital Address',
		placeholder: 'Enter digital Address',
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.address.nearestLandmark`,
		label: 'Nearest Landmark',
		placeholder: 'Enter landmark',
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.professionalLicenseNo`,
		label: 'Professional License Number (If Applicable)',
		placeholder: 'Enter number',
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.emergencyContact.contactName`,
		label: 'Emergency Contact',
		placeholder: 'Contact name',
		rules: {
			required: 'Please enter contact name',
		},
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.emergencyContact.relation`,
		label: '',
		placeholder: 'Relation to client',
		rules: {
			required: 'Please enter relation to client',
		},
	},
	{
		fieldType: 'phone',
		name: `accountSignatories.signatories.${index}.emergencyContact.phoneNumber`,
		label: '',
		placeholder: 'Contact phone number',
		options: {
			keys: countryList[1],
			priorityKeys: countryList[0],
		},
		componentProps: {
			phoneMode: 'single',
		},
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.mothersMaidenName`,
		label: "Mother's Maiden Name",
		placeholder: 'Enter mothers maiden name',
		rules: {
			required: 'Please enter mothers maiden name',
		},
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.maidenName`,
		label: 'Maiden Name (Optional)',
		placeholder: 'Enter maiden name',
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.religion`,
		label: 'Religion',
		placeholder: 'Enter religion',
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.stateOfOrigin`,
		label: 'State of Origin',
		placeholder: 'Enter state of origin',
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.localGovernment`,
		label: 'Local Government',
		placeholder: 'Enter local government',
	},
	{
		fieldType: 'radio',
		name: `accountSignatories.signatories.${index}.signatureMandate`,
		label: 'Signature Mandate',
		rules: {
			required: 'Select option',
		},
		options: {
			keys: ['A', 'B'],
		},
		componentProps: {
			className: 'grid-cols-2',
		},
	},
	{
		fieldType: 'signature',
		name: `accountSignatories.signatories.${index}.signatureResource`,
		label: 'Upload Your Signature',
		componentProps: {
			clientID,
		},
		rules: {
			required: 'Please upload a signature',
		},
	},
];

export const signatoriesDefaultValues: Signatory = {
	id: FormHelpers.generateUniqueIdentifier(),
	role: [],
	address: {
		phoneNumber: [
			{
				value: '',
				countryCode: 'GH',
			},
		],
		residentialAddress: '',
		email: '',
		city: '',
		postalAddress: '',
		digitalAddress: '',
		nearestLandmark: '',
		emergencyContact: {
			contactName: '',
			relation: '',
			phoneNumber: [
				{
					value: '',
					countryCode: 'GH',
				},
			],
		},
	},
	pepInfo: {
		isPep: 'No',
	},
	proofOfIdentity: {
		idNumber: '',
		idType: '',
		issueDate: '',
		expiryDate: '',
		placeOfIssue: '',
	},
	disclosures: {
		fatca: {
			status: [],
			ownership: '',
		},
		databank: {
			emailIndemnity: {
				signatureResource: '',
			},
		},
		kestrel: {
			nomineeAgreement: {
				signatureResource: '',
			},
		},
	},
	documentChecklist: {},
	signatureMandate: undefined,
	signatureResource: '',
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
	countryOfBirth: '',
	citizenship: '',
	countryOfResidence: '',
	residenceStatus: undefined,
	profession: '',
	occupation: '',
	jobTitle: '',
	mothersMaidenName: '',
	maidenName: '',
	professionalLicenseNo: '',
	tin: '',
	religion: '',
	stateOfOrigin: '',
	localGovernment: '',
};

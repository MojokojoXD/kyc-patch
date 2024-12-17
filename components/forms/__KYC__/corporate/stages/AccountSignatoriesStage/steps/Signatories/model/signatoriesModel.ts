import type { FormFactoryProps } from '@/types/Components/formFactory';
import validator from 'validator';
import type { Signatory } from '@/types/forms/corporateSchema';
import { FormHelpers } from '@/utils/clientActions/formHelpers';

const MIN_AGE = 18;

export const signatoriesModel = ({ index }: { index: number }): FormFactoryProps[] => [
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
			classNames: { radioGroupStyles: 'grid-cols-5' },
			otherInputProps: {
				label: 'Other? Specify',
				placeholder: 'Specify',
			},
		},
		tags: ['read-only'],
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
    componentProps: {
      classNames: {
        errorPosition: 'absolute',
      }
    },
		tags: ['read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.middleName`,
		inline: true,
		label: '',
    placeholder: 'Middle name',
    componentProps: {
      classNames: {
        errorPosition: 'absolute',
      }
    },
		tags: ['read-only'],
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
    componentProps: {
      classNames: {
        errorPosition: 'absolute',
      }
    },
		tags: ['read-only'],
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
		tags: ['read-only'],
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
		tags: ['read-only'],
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
			classNames: { radioGroupStyles: 'grid-cols-2' },
		},
		tags: ['read-only'],
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
			classNames: { radioGroupStyles: 'grid-cols-4' },
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.placeOfBirth`,
		label: 'Place of Birth',
		placeholder: 'Place of birth',
		rules: {
			required: 'Please enter place of birth',
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'dropdown',
		name: `accountSignatories.signatories.${index}.countryOfBirth`,
		label: 'Country of Birth',
		placeholder: 'Select country',
		rules: {
			required: 'Please select country',
		},
		componentProps: {
			isCountryList: true,
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'dropdown',
		name: `accountSignatories.signatories.${index}.citizenship`,
		label: 'Citizenship',
		placeholder: 'Select country',
		rules: {
			required: 'Please select country',
		},
		componentProps: {
			isCountryList: true,
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'dropdown',
		name: `accountSignatories.signatories.${index}.countryOfResidence`,
		label: 'Country of Residence',
		placeholder: 'Select country',
		rules: {
			required: 'Please select country',
		},
		componentProps: {
			isCountryList: true,
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'radio',
		name: `accountSignatories.signatories.${index}.residence.status`,
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
		tags: ['read-only'],
  },
  {
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.residence.permitNumber`,
		label: 'Residence Permit Number',
		placeholder: 'Enter permit number',
		rules: {
			required: 'Please enter permit number',
		},
		tags: ['GH','read-only'],
	},
	{
		fieldType: 'date',
		name: `accountSignatories.signatories.${index}.residence.permitIssueDate`,
		label: 'Permit Issue Date',
		placeholder: 'DD/MM/YYYY',
		rules: {
			required: 'Select date',
		},
		componentProps: {
			disableFutureDays: true,
		},
		tags: ['GH','read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.residence.permitIssuePlace`,
		label: 'Place of Issue',
		placeholder: 'Enter place of Issue',
		rules: {
			required: 'Please enter place of issue',
		},
		tags: ['GH','read-only'],
	},
	{
		fieldType: 'date',
		name: `accountSignatories.signatories.${index}.residence.permitExpiry`,
		label: 'Permit Expiry Date',
		placeholder: 'DD/MM/YYYY',
		rules: {
			required: 'Select date',
		},
		componentProps: {
			disablePastDays: true,
		},
		tags: ['GH','read-only'],
	},
	{
		fieldType: 'phone',
		name: `accountSignatories.signatories.${index}.address.phoneNumber`,
		label: 'Phone/Mobile Number(s)',
		placeholder: 'Enter phone/mobile number',
		tags: ['read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.address.residentialAddress`,
		label: 'Residential Address (Not a P.O. Box)',
		placeholder: 'Enter residential address',
		rules: {
			required: 'Please enter residential address',
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.address.city`,
		label: 'City/Town',
		placeholder: 'Enter city/town',
		rules: {
			required: 'Please enter city/town',
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.profession`,
		label: 'Profession',
		placeholder: 'Enter profession',
		rules: {
			required: 'Please enter profession',
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.occupation`,
		label: 'Occupation',
		placeholder: 'Enter occupation',
		rules: {
			required: 'Please enter occupation',
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.jobTitle`,
		label: 'Job Title',
		placeholder: 'Enter job title',
		rules: {
			required: 'Please enter job title',
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.tin`,
		label: 'Tax Identification Number',
		placeholder: 'Enter TIN',
		rules: {
			required: 'Please enter TIN',
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.address.postalAddress`,
		label: 'Postal Address',
		placeholder: 'Enter postal address',
		rules: {
			required: 'Please enter postal Address',
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.address.digitalAddress`,
		label: 'Digital Address (Optional)',
		placeholder: 'Enter digital Address',
		tags: ['read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.address.nearestLandmark`,
		label: 'Nearest Landmark (Optional)',
		placeholder: 'Enter landmark',
		tags: ['read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.professionalLicenseNo`,
		label: 'Professional License Number (If Applicable)',
		placeholder: 'Enter number',
		tags: ['read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.address.emergencyContact.contactName`,
		label: 'Emergency Contact',
		placeholder: 'Contact name',
		rules: {
			required: 'Please enter contact name',
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.address.emergencyContact.relation`,
		label: '',
		placeholder: 'Relation to client',
		rules: {
			required: 'Please enter relation to client',
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'phone',
		name: `accountSignatories.signatories.${index}.address.emergencyContact.phoneNumber`,
		label: '',
		placeholder: 'Contact phone number',
		componentProps: {
			phoneMode: 'single',
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.mothersMaidenName`,
		label: "Mother's Maiden Name",
		placeholder: 'Enter mothers maiden name',
		rules: {
			required: 'Please enter mothers maiden name',
		},
		tags: ['read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.maidenName`,
		label: 'Maiden Name (Optional)',
		placeholder: 'Enter maiden name',
		tags: ['read-only'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.religion`,
		label: 'Religion',
		placeholder: 'Enter religion',
		tags: ['NG'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.stateOfOrigin`,
		label: 'State of Origin',
		placeholder: 'Enter state of origin',
		tags: ['NG'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.localGovernment`,
		label: 'Local Government',
		placeholder: 'Enter local government',
		tags: ['NG'],
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
			classNames: {radioGroupStyles:'grid-cols-2'},
		},
	},
	{
		fieldType: 'signature',
		name: `accountSignatories.signatories.${index}.signatureResource`,
		label: 'Upload Your Signature',
		rules: {
			required: 'Please upload a signature',
		},
	},
];

export const MAX_SIGNATORIES = 4;
export const signatoriesDefaultValues: Signatory = {
  _id: FormHelpers.generateUniqueIdentifier(),
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
  residence: {
    status: undefined,
    details: {
      permitNumber: '',
      permitExpiry: '',
      permitIssueDate: '',
      permitIssuePlace: '',
    }
  },
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

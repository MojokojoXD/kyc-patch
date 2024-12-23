import type { FormFactoryProps } from '@/types/Components/formFactory';
import validator from 'validator';

export const fatcaModel$Individual = ({
	index,
}: {
	index: number;
}): FormFactoryProps[] => [
	{
		fieldType: 'checkbox',
		name: `applicant.${index}.disclosures.fatca.status`,
		label: 'FATCA Status',
		options: {
			keys: [
				'Were you born in the United States of America (USA)?',
				'Are you a U.S Citizen?',
				'Are you a U.S Permanent Resident (Green Card holder)?',
				'Are you a U.S Resident?',
				'Do you have a US residential or correspondence address?',
				' Do you have a US Telephone number?',
				'Have you issued standing instructions to transfer funds to an account with a US address?',
				'Have you given Power of Attorney or Signature Authority to a person with a US address?',
				'Do you have a correspondance, c/o or hold mail address in U.S?',
			],
		},
		componentProps: {
			classNames: {
				toggleStyles: 'text-base',
				boxGroupStyles: 'gap-4',
			},
		},
		tags: ['remove-all-except'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.disclosures.fatca.details.ownership`,
		label: 'Ownership (%)',
		placeholder: 'Enter ownership',
		rules: {
			required: 'Please enter ownership',
			validate: {
				isNumber: (v) => validator.isNumeric(v) || 'Entry must be a number',
				isWithinRange: (v) =>
					(parseInt(v) >= 0 && parseInt(v) <= 100) ||
					'Ownership must be between 0 and 100%',
			},
		},
	},
	{
		fieldType: 'text',
		inline: true,
		name: `applicant.${index}.disclosures.fatca.details.firstName`,
		label: 'Full Name',
		rules: {
			required: 'Please enter first name',
			validate: (v: string) => v.length > 1 || 'entry is too short',
		},
    placeholder: 'First name',
    componentProps: {
      classNames: {
        errorPosition: 'absolute'
      }
    }
	},
	{
		fieldType: 'text',
		inline: true,
		name: `applicant.${index}.disclosures.fatca.details.middleName`,
		label: '',
		placeholder: 'Middle name(Optional)',
	},
	{
		fieldType: 'text',
		inline: true,
		name: `applicant.${index}.disclosures.fatca.details.lastName`,
		label: '',
		rules: {
			required: 'Please enter last name',
			validate: (v: string) => v.length > 1 || 'entry is too short',
		},
    placeholder: 'Last name',
    componentProps: {
      classNames: {
        errorPosition: 'absolute'
      }
    }
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.disclosures.fatca.details.foreignResidentialAddress`,
		label: 'Foreign Residential Address',
		rules: {
			required: 'Please enter foreign residential address',
		},
		placeholder: 'Enter foreign residential address',
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.disclosures.fatca.details.foreignMailingAddress`,
		label: 'Foreign Mailing Address',
		rules: {
			required: 'Please enter foreign mailing address',
		},
		placeholder: 'Enter foreign mailing address',
	},
	{
		fieldType: 'phone',
		name: `applicant.${index}.disclosures.fatca.details.phoneNumber`,
		label: 'Foreign Phone Number',
		placeholder: 'Enter foreign phone number',

		componentProps: {
			phoneMode: 'single',
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.disclosures.fatca.details.tin`,
		label:
			'Foreign Tax Identification Number (TIN)/Social Security Number (SSN)/National Identity Number(NIN)',
		placeholder: 'Enter TIN/SSN/NIN',
		rules: {
			required: 'Please enter TIN/SSN/NIN',
		},
	},
];

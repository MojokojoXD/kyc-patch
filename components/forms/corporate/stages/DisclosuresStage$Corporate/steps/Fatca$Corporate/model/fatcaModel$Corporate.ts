import type { FormFactoryProps } from '@/types/Components/formFactory';
import validator from 'validator';

export const fatcaModel$Corporate = ({
	index,
}: {
	index: number;
}): FormFactoryProps[] => [
	{
		fieldType: 'checkbox',
		name: `accountSignatories.signatories.${index}.disclosures.fatca.status`,
		label: 'FATCA Status',
		options: {
			keySelector(key) {
				return key as string;
			},
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
			toggleStyles: 'text-base',
			className: 'gap-[16px]',
		},
		tags: ['remove-all-except'],
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.disclosures.fatca.ownership`,
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
];

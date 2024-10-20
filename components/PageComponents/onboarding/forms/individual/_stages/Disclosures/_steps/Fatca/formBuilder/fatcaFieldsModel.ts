import type { FormFactoryProps } from '@/types/Components/formFactory';
import type { Country } from '@/types/forms/universal';
import validator from 'validator';

const fatcaFieldsModel = ({
	index,
	countryList = [],
}: {
	index: number;
	countryList?: Country[];
}): FormFactoryProps[] => [
	{
		fieldType: 'checkbox',
		name: `applicant.${index}.disclosures.fatca.status`,
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
        tags: [ 'remove-all-except' ]
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.disclosures.fatca.details.ownership`,
        label: 'Ownership (%)',
        placeholder: 'Enter ownership',
        rules: {
            required: 'Please enter ownership',
            validate: {
                isNumber: v => validator.isNumeric( v ) || 'Entry must be a number',
                isWithinRange: v => parseInt(v) >= 0 && parseInt(v) <= 100 || 'Ownership must be between 0 and 100%',
            }
        }
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
		rules: {
			required: 'Please enter foreign phone number',
        },
        componentProps: {
            phoneMode: 'single',
        },
		options: {
			keySelector: (key) => (key as Country).cty_name,
			keys: countryList,
			priorityKeys: (keys) =>
				(keys as Country[]).filter(
					(c) =>
						c.cty_code === 'GH' ||
						c.cty_code === 'NG' ||
						c.cty_code === 'KE'
				),
		},
        },
        {
            fieldType: 'text',
            name: `applicant.${ index }.disclosures.fatca.details.tin`,
            label: 'Foreign Tax Identification Number (TIN)/Social Security Number (SSN)/National Identity Number(NIN)',
            placeholder: 'Enter TIN/SSN/NIN',
            rules: {
                required: 'Please enter TIN/SSN/NIN'
            }
    }
];

export { fatcaFieldsModel };

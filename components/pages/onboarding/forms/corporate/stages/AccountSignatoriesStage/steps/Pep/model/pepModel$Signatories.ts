import type { FormFactoryProps } from '@/types/Components/formFactory';
import type { Country } from '@/types/forms/common';

export const pepModel$Signatories = ({
	index,
	countryList = [],
}: {
	index: number;
	countryList?: Country[];
}): FormFactoryProps[] => [
	{
		fieldType: 'radio',
		name: `accountSignatories.signatories.${index}.pepInfo.isPep`,
		label:
			'Having read and understood the above definition please confirm if you, or any of your directors, authorised persons, shareholders or beneficial owners are a PEP?',
		rules: {
			required: 'Select option',
		},
		options: {
			keys: ['Yes', 'No'],
			keySelector(key) {
				return key as string;
			},
        },
        componentProps: {
            className: 'grid-cols-2'
        },
        tags: ['remove-all-except']
	},
	{
		fieldType: 'text',
		name: `accountSignatories.signatories.${index}.pepInfo.pepDetails.desc`,
		label: 'If Yes, Please Specify How',
	    placeholder: 'Specify how',
		rules: {
			required: 'Please specify how',
		},
	},
	{
		fieldType: 'dropdown',
		name: `accountSignatories.signatories.${index}.pepInfo.pepDetails.country`,
		label: 'In which country',
		placeholder: 'Select country',
		rules: {
			required: 'Select option',
		},
		options: {
			keys: countryList,
			keySelector(key) {
				return (key as Country).cty_name;
			},
			priorityKeys: (keys) =>
				(keys as Country[]).filter(
					(c) =>
						(c.cty_code === 'GH') || (c.cty_code === 'KE') || (c.cty_code === 'NG')
				),
		},
	},
];

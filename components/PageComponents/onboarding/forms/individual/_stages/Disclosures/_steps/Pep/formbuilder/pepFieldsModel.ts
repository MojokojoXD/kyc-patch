import type { FormFactoryProps } from '@/types/Components/formFactory';
import type { Country } from '@/types/forms/universal';

const pepFieldsModel = ({
	index,
	countryList = [],
}: {
	index: number;
	countryList?: Country[];
}): FormFactoryProps[] => [
	{
		fieldType: 'radio',
        name: `applicant.${ index }.disclosures.pepInfo.isPep`,
		label:
			'Having read and understood the above definition please confirm if you, or any of your directors, authorised persons, shareholders or beneficial owners are a PEP?',
		rules: {
			required: 'Select option',
		},
		options: {
			keySelector: (key) => key as string,
			keys: ['Yes', 'No'],
        },
        componentProps: {
            className: 'grid grid-cols-2 gap-[4px]'
        }
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.disclosures.pepInfo.pepDetails.desc`,
		label: 'If Yes, Please Specify How',
		placeholder: 'specify how',
		rules: {
			required: 'Please specify how',
        },
        tags: [ 'remove-all-except' ]
	},
	{
		fieldType: 'dropdown',
		name: `applicant.${index}.disclosures.pepInfo.pepDetails.country`,
		label: 'In which country',
		placeholder: 'Select country',
		rules: {
			required: 'Please select country',
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
        tags: [ 'remove-all-except' ]
	},
];

export { pepFieldsModel };

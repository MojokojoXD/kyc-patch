import type { FormFactoryProps } from '@/types/Components/formFactory';

export const affiliationsModel = ({
	index,
}: {
	index: number;
}): FormFactoryProps[] => [
	{
		fieldType: 'text',
		name: `accountSignatories.affiliations.${index}.value`,
		label: ``,
        placeholder: `Entity #${ index + 1 }`,
        reviewerOverride: {
            name: 'accountSignatories.affiliations',
            type: 'phone'
        }
	},
];

export const affiliationsDefaultValues = {
	value: '',
};

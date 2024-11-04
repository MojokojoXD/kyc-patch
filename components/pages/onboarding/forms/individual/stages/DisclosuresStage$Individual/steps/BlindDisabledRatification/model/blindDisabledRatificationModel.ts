import type { FormFactoryProps } from '@/types/Components/formFactory';


export const blindDisabledRatificationModel = ({
	index,
}: {
	index: number;
}): FormFactoryProps[] => [
	{
		fieldType: 'text',
		name: `applicant.${index}.disclosures.ratification.nameOfDeclarant`,
		label: 'Name of Declarant',
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.disclosures.ratification.languageOfUnderstanding`,
		label: 'Language of Understanding',
	},
];


import type { FormFactoryProps } from '@/components/UIcomponents/FormFactory';
import dynamicEmploymentMap from './dynamicFields/fieldMap';

const baseEmploymentFormFields = (indexer: number): FormFactoryProps[] => [
	{
		fieldType: 'radio',
		name: `applicant.${indexer}.employment.status`,
		label: 'Employment Status',
		rules: {
			required: 'Select employment status',
		},
		options: {
			keySelector: (key: string) => key,
			keys: ['Employed', 'Self-Employed', 'Unemployed', 'Retired', 'Student'],
		},
	},
];

const generateEmploymentFields = (indexer: number, ...identifiers: string[]) =>
	identifiers.reduce<FormFactoryProps[]>((result, currentValue) => {
		if (!dynamicEmploymentMap.has(currentValue)) return result;

		return result.concat(
			dynamicEmploymentMap.get(currentValue)?.call(this, indexer) || []
		);
	}, baseEmploymentFormFields(indexer));


export { generateEmploymentFields }
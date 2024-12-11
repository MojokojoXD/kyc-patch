import type { FormFactoryProps } from '@/types/Components/formFactory';

export const kestrelNomineeModel$Individual = ({
	index,
}: {
	index: number;
}): FormFactoryProps[] => [
	{
		fieldType: 'signature',
		label: 'Signature',
		name: `applicant.${index}.disclosures.kestrel.nomineeAgreement.signatureResource`,
		rules: {
			required: 'Please upload signature',
		},
		componentProps: {
			indexer: index,
		},
	},
];

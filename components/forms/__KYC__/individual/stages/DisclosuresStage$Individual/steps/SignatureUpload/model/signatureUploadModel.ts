import type { FormFactoryProps } from '@/types/Components/formFactory';

export const signatureUploadModel = ({
	index,
}: {
	index: number;
}): FormFactoryProps[] => [
	{
		fieldType: 'signature',
		name: `applicant.${index}.disclosures.signatureResource`,
		label: 'Signature',
		rules: {
			required: 'Please upload your signature',
		},
		componentProps: {
			indexer: index,
		},
	},
];

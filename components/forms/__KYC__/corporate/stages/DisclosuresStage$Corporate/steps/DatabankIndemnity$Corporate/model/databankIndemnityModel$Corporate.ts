import type { FormFactoryProps } from '@/types/Components/formFactory';

export const databankIndemnityModel$Corporate = ({
	index,
}: {
	index: number;
    } ): FormFactoryProps[] => [
	{
		fieldType: 'signature',
        name: `accountSignatories.signatories.${ index }.disclosures.databank.emailIndemnity.signatureResource`,
        label: 'Signature',
		rules: {
			required: 'Please upload your signature',
        },
	},
];

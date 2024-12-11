import type { FormFactoryProps } from '@/types/Components/formFactory';

export const kestrelNomineeModel$Corporate = ({
	index,
}: {
	index: number;
}): FormFactoryProps[] => [
	{
		fieldType: 'signature',
        name: `accountSignatories.signatories.${ index }.disclosures.kestrel.nomineeAgreement.signatureResource`,
        label: 'Signature',
		rules: {
			required: 'Please upload your signature',
        },
       
	},
];

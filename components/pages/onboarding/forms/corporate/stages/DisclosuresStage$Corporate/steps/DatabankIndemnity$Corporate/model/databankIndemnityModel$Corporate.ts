import type { FormFactoryProps } from '@/types/Components/formFactory';

export const databankIndemnityModel$Corporate = ({
	index,
	clientID = '',
}: {
	index: number;
	clientID?: string;
    } ): FormFactoryProps[] => [
        {
            fieldType: 'text',
            name: `accountSignatories.signatories.${ index }.disclosures.databank.emailIndemnity.address`,
            label: 'Your House Address',
            placeholder: 'Enter your house address',
            rules: {
                required: 'Please enter house address'
            }
    },
	{
		fieldType: 'signature',
        name: `accountSignatories.signatories.${ index }.disclosures.databank.emailIndemnity.
        signatureResource`,
        label: 'Signature',
		rules: {
			required: 'Please upload your signature',
        },
        componentProps: {
            clientID,
        }
	},
];

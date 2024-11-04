import type { FormFactoryProps } from "@/types/Components/formFactory";


export const signatureUploadModel = ( { index, clientID = '' }: { index: number, clientID?: string; } ): FormFactoryProps[] => [
    {
        fieldType: 'signature',
        name: `applicant.${ index }.disclosures.signatureResource`,
        label: 'Signature',
        componentProps: {
            clientID: clientID,
        },
        rules: {
            required: 'Please upload your signature'
        }
    }
];


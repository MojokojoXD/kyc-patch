import type { FormFactoryProps } from "@/types/Components/formFactory";


const signatureUploadFieldModel = ( { index, clientID = '' }: { index: number, clientID?: string; } ): FormFactoryProps[] => [
    {
        fieldType: 'signature',
        name: `applicant.${ index }.disclosures.signatureURL`,
        label: 'Signature',
        componentProps: {
            clientID: clientID,
        },
        rules: {
            required: 'Please upload your signature'
        }
    }
];


export { signatureUploadFieldModel };
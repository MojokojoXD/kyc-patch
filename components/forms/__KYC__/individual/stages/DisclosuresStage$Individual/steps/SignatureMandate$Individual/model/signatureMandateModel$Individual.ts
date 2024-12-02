import type { FormFactoryProps } from "@/types/Components/formFactory";

export const signatureMandateModel$Individual: FormFactoryProps[] = [
    {
        fieldType: 'radio',
        name: `signatureMandate`,
        label: 'Signature Mandate',
        rules: {
            required: 'Please select option'
        },
        options: {
            keys: [
                'Both signatories to sign',
                'One signatory to sign'
            ]
        }
    }
];

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
            keySelector( key ) { return key as string; },
            keys: [
                'Both signatories to sign',
                'One signatory to sign'
            ]
        }
    }
];

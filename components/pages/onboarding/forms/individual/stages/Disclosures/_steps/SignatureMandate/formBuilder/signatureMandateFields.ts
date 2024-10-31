import type { FormFactoryProps } from "@/types/Components/formFactory";

const signatureMandateFields: FormFactoryProps[] = [
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

export { signatureMandateFields }
import type { FormFactoryProps } from "@/types/Components/formFactory";


export const signatureMandateModel$Corporate: FormFactoryProps[] = [
    {
        fieldType: 'radio',
        name: 'disclosures.signatureMandate',
        label: 'Mandate',
        rules: {
            required: 'Please select option',
        },
        options: {
            keys: [
                'One to sign [A only]',
                'Two to sign [A + A]',
                'Two to sign [A + B]',
                'All to sign [All As + All Bs]'
            ],
            keySelector(key) { return key as string }
        }
    }
]
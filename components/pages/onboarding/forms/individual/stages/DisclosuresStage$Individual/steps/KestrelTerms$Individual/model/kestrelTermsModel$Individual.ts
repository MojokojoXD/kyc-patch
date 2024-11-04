import type { FormFactoryProps } from "@/types/Components/formFactory";


export const kestrelTermsModel$Individual: FormFactoryProps[] = [
    {
        fieldType: 'agreement',
        name: `agreements.kestrel.termsAndConditions.agreed`,
        label: 'I/We agree to the above Terms and Conditions',
        rules: {
            required: 'Click on the button above to agree to the terms above to continue',
            validate: v => Boolean(v) || "Click on the button above to agree to the terms above to continue",
        },
        componentProps: {
            agreementVersion: '1.0'
        }
    }
];


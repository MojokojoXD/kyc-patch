import type { FormFactoryProps } from "@/types/Components/formFactory";


export const kestrelTermsModel$Corporate: FormFactoryProps[] = [
    {
        fieldType: 'agreement',
        name: 'disclosures.kestrel.termsAndConditions.agreed',
        label: 'I/We agree to the above Terms and Conditions',
        rules: {
            required: 'You must agree to the above terms to continue'
        },
        componentProps: {
            agreementVersion: '1.0'
        }
    }
]
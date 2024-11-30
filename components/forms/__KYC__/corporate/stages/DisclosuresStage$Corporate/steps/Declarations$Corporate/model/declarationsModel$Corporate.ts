import type { FormFactoryProps } from "@/types/Components/formFactory";


export const declarationsModel$Corporate: FormFactoryProps[] = [
    {
        fieldType: 'agreement',
        name: 'disclosures.declarations.agreed',
        label: 'I/We agree to the above declarations',
        rules: {
            required: 'You must accept the declarations above to continue',
        },
        componentProps: {
            agreementVersion: '1.0'
        }
    }
]
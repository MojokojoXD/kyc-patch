import type { FormFactoryProps } from "@/types/Components/formFactory";


const declarationsFields: FormFactoryProps[] = [
    {
        fieldType: 'agreement',
        name: `agreements.declarations.agreed`,
        label: 'I/We agree to the above declarations',
        componentProps: {
            agreementVersion: '1.0'
        }
    }
];


export { declarationsFields }
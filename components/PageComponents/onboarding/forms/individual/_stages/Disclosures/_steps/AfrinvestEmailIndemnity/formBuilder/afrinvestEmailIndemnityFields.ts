import type { FormFactoryProps } from "@/types/Components/formFactory";


const afrinvestEmailIndemnityFields: FormFactoryProps[] = [
    {
        fieldType: 'agreement',
        name: `agreements.afrinvest.emailIndemnity.agreed`,
        label: 'I/We agree to the above indemnity provisions',
        componentProps: {
            agreementVersion: '1.0'
        }
    }
];

export { afrinvestEmailIndemnityFields }
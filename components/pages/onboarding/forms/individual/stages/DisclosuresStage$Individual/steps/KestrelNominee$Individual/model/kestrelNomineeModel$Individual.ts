import type { FormFactoryProps } from "@/types/Components/formFactory";


export const kestrelNomineeModel$Individual = ( { index,clientID = '' }: { index: number, clientID?: string; } ): FormFactoryProps[] => [
    {
        fieldType: 'signature',
        label: 'Signature',
        name: `applicant.${ index }.disclosures.kestrel.nomineeAgreement.signatureResource`,
        rules: {
            required: 'Please upload signature'
        },
        componentProps: {
            clientID: clientID
        }
    }
];

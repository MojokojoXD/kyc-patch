import type { FormFactoryProps } from "@/types/Components/formFactory";


const kestrelNomineeFieldsModel = ( { index,clientID = '' }: { index: number, clientID?: string; } ): FormFactoryProps[] => [
    {
        fieldType: 'signature',
        label: 'Signature',
        name: `applicant.${ index }.disclosures.kestrel.nomineeAgreement.signatureURL`,
        rules: {
            required: 'Please upload signature'
        },
        componentProps: {
            clientID: clientID
        }
    }
];

export { kestrelNomineeFieldsModel }
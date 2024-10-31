import type { FormFactoryProps } from "@/types/Components/formFactory";
import type { ClientID } from "@/types/forms/broker";


const fileUploadsFieldsModel = ( { index, clientID = '' }: { index: number; clientID?: ClientID; } ): FormFactoryProps[] => [
    {
        fieldType: 'file-upload',
        name: `applicant.${ index }.fileUploads.applicantID.documentFileName`,
        label: 'Notorized Applicant(s) ID',
        rules: {
            required: 'Please upload notorized ID',
        },
        componentProps: {
            clientID: clientID,
            fileFieldName: 'applicantID'
        }
    },
    {
        fieldType: 'file-upload',
        name: `applicant.${ index }.fileUploads.passportPhotograph.documentFileName`,
        label: 'Passport Photograph of Account Holder(s)',
        rules: {
            required: 'Please upload passport photograph',
        },
        componentProps: {
            clientID: clientID,
            fileFieldName: 'passportPhotograph'
        }
    },
    {
        fieldType: 'file-upload',
        name: `applicant.${ index }.fileUploads.taxCertificate.documentFileName`,
        label: 'Tax Registration Certificate (Optional)',
        componentProps: {
            clientID: clientID,
            fileFieldName: 'taxCertificate'
        }
    },
    {
        fieldType: 'file-upload',
        name: `applicant.${ index }.fileUploads.BVN.documentFileName`,
        label: 'BVN (Optional)',
        componentProps: {
            clientID: clientID,
            fileFieldName: 'BVN'
        }
    },
    {
        fieldType: 'file-upload',
        name: `applicant.${ index }.fileUploads.proofOfAddress.documentFileName`,
        label: 'Notarized Proof of Address (latest utility bill, signed lease agreement, signed affidavit)',
        rules: {
            required: 'Please upload proof of address'
        },
        componentProps: {
            clientID: clientID,
            fileFieldName: 'proofOfAddress'
        }
    },
    {
        fieldType: 'file-upload',
        name: `applicant.${ index }.fileUploads.addressMap.documentFileName`,
        label: 'Address Map Screenshot (required if proof of address is signed affidavit)',
        rules: {
            required: 'Please upload address map screenshot'
        },
        componentProps: {
            clientID: clientID,
            fileFieldName: 'addressMap'
        }
    },
    {
        fieldType: 'file-upload',
        name: `applicant.${ index }.fileUploads.foreignAddress.documentFileName`,
        label: 'Proof of Foreign Address (Non-Resident Clients) (Optional)',
        componentProps: {
            clientID: clientID,
            fileFieldName: 'foreignAddress'
        }
    },
    {
        fieldType: 'file-upload',
        name: `applicant.${ index }.fileUploads.residencePermit.documentFileName`,
        label: 'Residence/Work Permit (if applicable)',
        componentProps: {
            clientID: clientID,
            fileFieldName: 'residencePermit'
        }
    },
    {
        fieldType: 'file-upload',
        name: `applicant.${ index }.fileUploads.proofOfBank.documentFileName`,
        label: 'Notarized Proof of Bank (3 months bank statement or cancelled cheque leaf) (Optional)',
        componentProps: {
            clientID: clientID,
            fileFieldName: 'proofOfBank'
        }
    },
    {
        fieldType: 'file-upload',
        name: `applicant.${ index }.fileUploads.KRAPin.documentFileName`,
        label: 'Kenya KRA PIN Certificate (Optional)',
        componentProps: {
            clientID: clientID,
            fileFieldName: 'KRAPin'
        }
    },
];


export { fileUploadsFieldsModel }
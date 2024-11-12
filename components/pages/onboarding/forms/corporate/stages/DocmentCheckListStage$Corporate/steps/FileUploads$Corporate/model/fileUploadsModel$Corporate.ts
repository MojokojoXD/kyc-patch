import type { FormFactoryProps } from '@/types/Components/formFactory';
import type { ClientID } from '@/types/forms/broker';

export const signatoryFileUploadsModel$Corporate = ({
	index,
	clientID = '',
}: {
	index: number;
	clientID?: ClientID;
}): FormFactoryProps[] => [
	{
		fieldType: 'file-upload',
		name: `accountSignatories.signatories.${index}.documentChecklist.signatoryID.fileName`,
		label: 'Notorized Applicant(s) ID',
		rules: {
			required: 'Please upload notorized ID',
		},
		componentProps: {
			clientID: clientID,
			fileFieldName: 'notorizedID',
		},
	},
	{
		fieldType: 'file-upload',
		name: `accountSignatories.signatories.${index}.documentChecklist.residentPermit.fileName`,
		label: 'Resident/Work Permit (Optional)',
		componentProps: {
			clientID: clientID,
			fileFieldName: 'residentPermit',
		},
	},
	{
		fieldType: 'file-upload',
		name: `accountSignatories.signatories.${index}.documentChecklist.signatoryPhotographs.fileName`,
		label: 'Signatories Photos (Optional)',
		componentProps: {
			clientID: clientID,
			fileFieldName: 'signatoryPhotographs',
		},
	},
];

export const generalFileUpload$Corporate = ({
	clientID = '',
}: {
        index?: number;
	clientID?: string;
}): FormFactoryProps[] => [
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.beneficiariesID.fileName`,
		label: 'Certified Beneficiaries ID (Optional)',
		componentProps: {
			clientID: clientID,
			fileFieldName: 'beneficiariesID',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.incorporationCertificate.fileName`,
		label: 'Notarized Certificate of Incorporation/Registration',
		rules: {
			required: 'Please upload document',
		},
		componentProps: {
			clientID: clientID,
			fileFieldName: 'incorporationCertificate',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.boardResolution.fileName`,
		label: 'Certified Board Resolution (on letter head) (Optional)',
		componentProps: {
			clientID: clientID,
			fileFieldName: 'boardResolution',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.W9_W8BEN_E.fileName`,
		label: 'W9 & W8BEN-E (Optional)',
		componentProps: {
			clientID: clientID,
			fileFieldName: 'W9_W8BEN_E',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.directorsID.fileName`,
		label: 'Notarized Original Directors IDs (Optional)',
		componentProps: {
			clientID: clientID,
			fileFieldName: 'directorsID',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.directors_authorizedPerson.fileName`,
		label: 'Directors/Authorized Persons Photo (Optional)',
		componentProps: {
			clientID: clientID,
			fileFieldName: 'directors_authorizedPerson',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.taxCertificate.fileName`,
		label: 'Notarized Tax Registration Certificate (Optional)',
		componentProps: {
			clientID: clientID,
			fileFieldName: 'taxCertificate',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.proofOfAddress.fileName`,
		label:
			'Proof of Address (latest utility bill, signed lease agreement, signed affidavit) (Optional)',
		componentProps: {
			clientID: clientID,
			fileFieldName: 'proofOfAddress',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.proofForeignAddress.fileName`,
		label: 'Proof of Foreign Address (Non-Resident Clients) (Optional)',
		componentProps: {
			clientID: clientID,
			fileFieldName: 'proofForeignAddress',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.registrySearch.fileName`,
		label: 'Copy of Official Registry Search (<1 months old) (Optional)',
		componentProps: {
			clientID: clientID,
			fileFieldName: 'registrySearch',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.UBO.fileName`,
		label: 'UBO Details (Name, Photo, ID, Address, % Ownership) (Optional)',
		componentProps: {
			clientID: clientID,
			fileFieldName: 'UBO',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.bankProof.fileName`,
		label:
			'Proof of Bank (3 months bank statement or cancelled cheque leaf) (Optional)',
		componentProps: {
			clientID: clientID,
			fileFieldName: 'bankProof',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.companySeal.fileName`,
		label: 'Company Seal (Optional)',
		componentProps: {
			clientID: clientID,
			fileFieldName: 'companySeal',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.KRAPin.fileName`,
		label: 'Kenya KRA PIN Certificate (Optional)',
		componentProps: {
			clientID: clientID,
			fileFieldName: 'KRAPin',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.BVN.fileName`,
		label: 'BVN (Optional)',
		componentProps: {
			clientID: clientID,
			fileFieldName: 'BVN',
		},
	},
];


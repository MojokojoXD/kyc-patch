import type { FormFactoryProps } from '@/types/Components/formFactory';

export const signatoryFileUploadsModel$Corporate = ({
	index,
}: {
	index: number;
}): FormFactoryProps[] => [
	{
		fieldType: 'file-upload',
		name: `accountSignatories.signatories.${index}.documentChecklist.signatoryID.fileName`,
		label: 'Notorized Applicant(s) ID',
		rules: {
			required: 'Please upload notorized ID',
		},
		componentProps: {
			fileFieldName: 'notorizedID',
		},
	},
	{
		fieldType: 'file-upload',
		name: `accountSignatories.signatories.${index}.documentChecklist.residencePermit.fileName`,
		label: 'Resident/Work Permit (Optional)',
		componentProps: {
			fileFieldName: 'residentPermit',
		},
	},
	{
		fieldType: 'file-upload',
		name: `accountSignatories.signatories.${index}.documentChecklist.signatoryPhotographs.fileName`,
		label: 'Signatories Photos (Optional)',
		componentProps: {
			fileFieldName: 'signatoryPhotographs',
		},
	},
];

export const generalFileUpload$Corporate = ({}: {
	index?: number;
}): FormFactoryProps[] => [
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.beneficiariesID.fileName`,
		label: 'Certified Beneficiaries ID (Optional)',
		componentProps: {
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
			fileFieldName: 'incorporationCertificate',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.boardResolution.fileName`,
		label: 'Certified Board Resolution (on letter head) (Optional)',
		componentProps: {
			fileFieldName: 'boardResolution',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.W9_W8BEN_E.fileName`,
		label: 'W9 & W8BEN-E (Optional)',
		componentProps: {
			fileFieldName: 'W9_W8BEN_E',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.directorsID.fileName`,
		label: 'Notarized Original Directors IDs (Optional)',
		componentProps: {
			fileFieldName: 'directorsID',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.directors_authorizedPerson.fileName`,
		label: 'Directors/Authorized Persons Photo (Optional)',
		componentProps: {
			fileFieldName: 'directors_authorizedPerson',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.taxCertificate.fileName`,
		label: 'Notarized Tax Registration Certificate (Optional)',
		componentProps: {
			fileFieldName: 'taxCertificate',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.proofOfAddress.fileName`,
		label:
			'Proof of Address (latest utility bill, signed lease agreement, signed affidavit) (Optional)',
		componentProps: {
			fileFieldName: 'proofOfAddress',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.proofForeignAddress.fileName`,
		label: 'Proof of Foreign Address (Non-Resident Clients) (Optional)',
		componentProps: {
			fileFieldName: 'proofForeignAddress',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.registrySearch.fileName`,
		label: 'Copy of Official Registry Search (<1 months old) (Optional)',
		componentProps: {
			fileFieldName: 'registrySearch',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.UBO.fileName`,
		label: 'UBO Details (Name, Photo, ID, Address, % Ownership) (Optional)',
		componentProps: {
			fileFieldName: 'UBO',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.bankProof.fileName`,
		label:
			'Proof of Bank (3 months bank statement or cancelled cheque leaf) (Optional)',
		componentProps: {
			fileFieldName: 'bankProof',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.companySeal.fileName`,
		label: 'Company Seal (Optional)',
		componentProps: {
			fileFieldName: 'companySeal',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.KRAPin.fileName`,
		label: 'Kenya KRA PIN Certificate (Optional)',
		componentProps: {
			fileFieldName: 'KRAPin',
		},
	},
	{
		fieldType: 'file-upload',
		name: `generalDocumentChecklist.BVN.fileName`,
		label: 'BVN (Optional)',
		componentProps: {
			fileFieldName: 'BVN',
		},
	},
];

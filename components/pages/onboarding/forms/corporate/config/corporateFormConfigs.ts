import { JSX } from 'react';

export const corporateStages = [
	{
		name: 'introduction',
		steps: ['instructions'],
	},
	{
		name: 'business',
		steps: [
			'category of business',
			'category of investments',
			'company details',
			'proof of incorporation',
			'review_business',
		],
	},
	{
		name: 'contacts',
		steps: [
			'contact person',
			'address',
			'proof of identity_contacts',
			'review_contacts',
		],
	},
	{
		name: 'account signatories',
		steps: [
			'signatories',
			'proof of identity_account signatories',
			'pep',
			'directors',
			'beneficial owners',
			'affiliations',
			'review_account signatories',
		],
	},
	{
		name: 'settlement account',
		steps: [
			'account details',
			'account activity',
			'risk profile',
			'statements',
			'review_settlement account',
		],
	},
	{
		name: 'disclosures',
		steps: [
			'kestrel - terms',
			'kestrel - nominee',
			'databank - indemnity',
			'afrinvest - indemnity',
			'signature mandate',
			'declarations',
			'fatca',
			'review_disclosures',
		],
	},
	{
		name: 'document checklist',
		steps: ['file uploads', 'review_document checklist', 'submit'],
	},
] as const;

//literal types for the stages
export type CorporateStage = (typeof corporateStages)[number]['name'];

//literal types for the steps
export type CorporateStep = (typeof corporateStages)[number]['steps'][number];

//describes the shape of the corporate component state dictionary
export type CorporateStageDict = Record<CorporateStage, JSX.Element>;

export type CorporateStepDict = Partial<Record<CorporateStep, JSX.Element>>;

import type {
	FormReducerFn,
	FormReducerState,
} from '../../utils/formReducer';

//Form meta data for navigation components
export const individualFormMetadata = [
	{
		name: 'introduction',
		steps: ['instructions'],
	},
	{
		name: 'personal',
		steps: [
			'retail client',
			'category of investment',
			'personal information_personal',
			'contact details_personal',
			'employment information',
			'settlement bank account',
			'proof of identity_personal',
			'investment & risk profile',
			'review_personal',
		],
	},
	{
		name: 'next of kin',
		steps: [
			'personal information_next of kin',
			'contact details_next of kin',
			'proof of identity_next of kin',
			'review_next of kin',
		],
	},
	{
		name: 'disclosures',
		steps: [
			'signature upload',
			'customer ratification',
			'pep',
			'fatca',
			'kestrel capital - terms',
			'kestrel capital - nominee',
			'afrinvest - email indemnity',
			'declarations',
			'signature mandate',
			'afrinvest - privacy policy',
			'review_disclosures',
		],
	},
	{
		name: 'document upload',
		steps: ['checklist', 'review_document upload', 'submit'],
	},
] as const;

type IndividualFormStages = typeof individualFormMetadata;

export type Stage = IndividualFormStages[number]['name'];
export type Step = IndividualFormStages[number]['steps'][number];

type IndividualReducerState = FormReducerState<Stage, Step>;

export type IndividualReducerFn =
	FormReducerFn<IndividualReducerState>;

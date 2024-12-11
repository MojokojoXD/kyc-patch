import type { FormFactoryProps } from '@/types/Components/formFactory';

export const riskProfileModel$Corporate: FormFactoryProps[] = [
	{
		fieldType: 'radio',
		name: `settlementAccount.riskProfile.tolerance`,
		label: 'Risk Tolerance',
		rules: {
			required: 'Select risk tolerance',
		},
		options: {
			keys: ['High', 'Medium', 'Low'],
		},
		componentProps: {
			classNames: { radioGroupStyles: 'grid grid-cols-3' },
		},
	},
	{
		fieldType: 'radio',
		name: `settlementAccount.riskProfile.investmentHorizon`,
		label: 'What is the your intended investment horizon',
		rules: {
			required: 'Select option',
		},
		options: {
			keys: [
				'Short Term (1 year)',
				'Medium Term (2-5 years)',
				'Long Term (5 years+)',
			],
		},
		componentProps: {
			classNames: { toggleStyles: 'normal-case' },
		},
	},
	{
		fieldType: 'radio',
		name: `settlementAccount.riskProfile.investmentKnowledge`,
		label: 'What is the level of your investment knowledge?',
		rules: {
			required: 'Select option',
		},
		options: {
			keys: ['Limited', 'Moderate', 'Extensive'],
		},
		componentProps: {
			classNames: { radioGroupStyles: 'grid grid-cols-3 gap-[4px]' },
		},
	},
	{
		fieldType: 'radio',
		name: `settlementAccount.riskProfile.reaction`,
		label:
			"What would be your reaction if an investment you have invested in lost 10% of it's value in the first year?",
		rules: {
			required: 'Select option',
		},
		options: {
			keys: [
				'Extremely concerned; sell my investment',
				'Concerned; consider selling my investment',
				'Concerned; no consider selling my investment',
				"Not overly concerned; I'm in it for the long term",
			],
		},
	},
	{
		fieldType: 'agreement',
		name: 'settlementAccount.riskProfile.riskAgreement.agreed',
		label:
			'I/We understand investing in equities/shares is inherently risker than investing in fixed income products or holding cash',
		rules: {
			required: 'You must accept these terms to continue',
		},
		componentProps: {
			agreementVersion: '1.0',
		},
	},
];

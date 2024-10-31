import type { FormFactoryProps } from "@/types/Components/formFactory";


export const riskProfileModel$Corporate: FormFactoryProps[] = [
    {
		fieldType: 'radio',
		name: `settlementAccount.riskProfile.tolerance`,
		label: 'Risk Tolerance',
		rules: {
			required: 'Select risk tolerance',
		},
		options: {
			keySelector: (key) => key as string,
			keys: ['High', 'Medium', 'Low'],
		},
		componentProps: {
			className: 'grid grid-cols-3',
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
			keySelector: (key) => key as string,
			keys: ['Less than a year', '1 to 2 years', 'More than 2 years'],
		},
		componentProps: {
			toggleStyles: 'normal-case',
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
			keySelector: (key) => key as string,
			keys: ['Limited', 'Moderate', 'Extensive'],
		},
		componentProps: {
			className: 'grid grid-cols-3 gap-[4px]',
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
			keySelector: (key) => key as string,
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
        label: 'I/We understand investing in equities/shares is inherently risker than investing in fixed income products or holding cash',
        rules: {
            required: 'You must accept these terms to continue'
        },
        componentProps: {
            agreementVersion: '1.0'
        }
    }
]
import type { FormFactoryProps } from '@/types/Components/formFactory';
import validator from 'validator';

export const riskProfileModel$Individual = ({
	index,
	currency = '',
}: {
	index: number;
	currency?: string;
}): FormFactoryProps[] => [
	{
		fieldType: 'radio',
		name: `applicant.${index}.riskProfile.tolerance`,
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
		tags: ['DATAB', 'AFRIN'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.riskProfile.investmentObjective`,
		label: 'Investment Objective',
		placeholder: 'Enter investment objective',
		rules: {
			required: 'Please enter investment objective',
		},
		tags: ['DATAB', 'AFRIN'],
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.riskProfile.beneficialOwner`,
		label: 'Name of Beneficial Owner',
		placeholder: 'Enter beneficial owner',
		rules: {
			required: 'Please enter beneficial owner',
		},
		tags: ['AFRIN'],
	},
	{
		fieldType: 'radio',
		name: `applicant.${index}.riskProfile.significantWithdrawalTimetable`,
		label: 'When do you plan to withdraw a significant portion of your money',
		rules: {
			required: 'Select time period',
		},
		options: {
			keySelector: (key) => key as string,
			keys: [
				'Less than 1 year',
				'1 to 2 years',
				'3 to 5 years',
				'More than 5 years',
			],
		},
		tags: ['DATAB'],
	},
	{
		fieldType: 'radio',
		name: `applicant.${index}.riskProfile.emergencyFunds`,
		label: 'Do you have an emergency fund (i.e 6 months of after-tax income)?',
		rules: {
			required: 'Select option',
		},
		options: {
			keySelector: (key) => key as string,
			keys: ['Yes', 'No', 'Yes,but less than six months'],
		},
		tags: ['DATAB'],
	},
	{
		fieldType: 'radio',
		name: `applicant.${index}.riskProfile.investmentKnowledge`,
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
		tags: ['DATAB', 'KESTR'],
	},
	{
		fieldType: 'radio',
		name: `applicant.${index}.riskProfile.investmentHorizon`,
		label: 'What is the your intended investment horizon',
		rules: {
			required: 'Select option',
		},
		options: {
			keySelector: (key) => key as string,
			keys: [
				'Short Term (1 year)',
				'Medium Term (2-5 years)',
				'Long Term (5 years+)',
			],
		},
		componentProps: {
			toggleStyles: 'normal-case',
		},
		tags: ['KESTR'],
	},
	{
		fieldType: 'radio',
		name: `applicant.${index}.riskProfile.reaction`,
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
		tags: ['DATAB', 'KESTR'],
	},
	{
		fieldType: 'checkbox',
		name: `applicant.${index}.riskProfile.sourceOfFunds`,
		label: 'Source Of Funds',
		rules: {
			required: 'Select option',
		},
		options: {
			keySelector: (key) => key as string,
			keys: [
				'Salaries/Wages',
				'Proceeds from Business',
				'Inheritance/Gifts',
				'Sales of Assets',
				'Personal Savings',
				'Borrowings',
				'Retirement',
			],
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.riskProfile.initialInvestmentAmount`,
		label: `Initial Investment Amount (${currency})`,
		placeholder: 'Enter initial investment amount',
		rules: {
			required: 'Please enter amount',
			validate: (v) => validator.isCurrency(v) || 'Amount must be a number',
		},
		componentProps: {
			isCurrency: true,
		},
	},
	{
		fieldType: 'radio',
		name: `applicant.${index}.riskProfile.topUpActivity.frequency`,
		label: 'Anticipated Top Up Activity',
		rules: {
			required: 'Select option',
		},
		options: {
			keySelector: (key) => key as string,
			keys: ['Monthly', 'Quarterly', 'Bi-Annually', 'Annually', 'Other'],
		},
		componentProps: {
			className: 'grid grid-cols-2',
			otherProps: {
				label: 'Other? Specify',
				placeholder: 'Enter other top up frequency',
			},
		},
	},
	{
		fieldType: 'text',
		name: `applicant.${index}.riskProfile.regularTopUpAmount`,
		label: `Expected Regular Top-up Amount ${currency && '(' + currency + ')'}`,
		placeholder: 'Enter regular top-up amount',
		rules: {
			required: 'Please enter amount',
			validate: (v) => validator.isCurrency(v) || 'Amount must be a number',
		},
		componentProps: {
			isCurrency: true,
		},
	},
	{
		fieldType: 'radio',
		name: `applicant.${index}.riskProfile.withdrawalActivity.frequency`,
		label: 'Anticipated Withdrawal Activity',
		rules: {
			required: 'Select option',
		},
		options: {
			keySelector: (key) => key as string,
			keys: ['Monthly', 'Quarterly', 'Bi-Annually', 'Annually', 'Other'],
		},
		componentProps: {
			className: 'grid grid-cols-2',
			otherProps: {
				label: 'Other? Specify',
				placeholder: 'Enter other withdrawal frequency',
			},
		},
	},

	{
		fieldType: 'text',
		name: `applicant.${index}.riskProfile.regularWithdrawalAmount`,
		label: `Expected Regular Withdrawal Amount ${
			currency && '(' + currency + ')'
		}`,
		placeholder: 'Enter regular withdrawal amount',
		rules: {
			required: 'Please enter amount',
			validate: (v) => validator.isCurrency(v) || 'Amount must be a number',
		},
		componentProps: {
			isCurrency: true,
		},
	},
	{
		fieldType: 'radio',
		name: `applicant.${index}.riskProfile.statements.deliveryMode`,
		label: 'Mode of Statement Delivery',
		rules: {
			required: 'Select mode of delivery',
		},
		options: {
			keys: ['Email', 'Online', 'Collection at Branch'],
			keySelector: (key) => key as string,
		},
		componentProps: {
			className: 'grid grid-cols-3 gap-[4px]',
			toggleStyles: 'paragraph1Regular text-[14px] truncate text-nowrap',
		},
	},
	{
		fieldType: 'radio',
		name: `applicant.${index}.riskProfile.statement.frequency`,
		label: 'Statement Frequency',
		rules: {
			required: 'Select statement frequency',
		},
		options: {
			keys: ['Semi-Annual', 'Annual', 'Monthly'],
			keySelector: (key) => key as string,
		},
		componentProps: {
			className: 'grid grid-cols-3 gap-[4px]',
			toggleStyles: 'paragraph1Regular text-[14px] truncate text-nowrap',
		},
	},
	{
		fieldType: 'agreement',
		name: `applicant.${index}.riskProfile.agreementOfTerms.agreed`,
		label:
            'I/We understand investing in equities/shares is inherently risker than investing in fixed income products or holding cash',
        rules: {
            required: 'You must accept the above terms to continue'
        }
	},
];

import type { FormFactoryProps } from '@/types/Components/formFactory';
import validator from 'validator';

export const accountActivityModel = ({
	currency = 'GHC',
}: {
    index?: number;
	currency?: string;
}): FormFactoryProps[] => [
	{
		fieldType: 'checkbox',
		name: `settlementAccount.investmentActivity.sourceOfFunds`,
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
            fieldType: 'radio',
            name: 'settlementAccount.investmentActivity.frequency',
            label: 'Expected Investment Frequency',
            rules: {
                required: 'Please select frequency',
            },
            options: {
                keys: [ 'Monthly', 'Quarterly', 'Annually' ],
                keySelector(key){ return key as string }
            },
            componentProps: {
                className: 'grid-cols-3'
            }
    },
	{
		fieldType: 'text',
		name: `settlementAccount.investmentActivity.initialAmount`,
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
		name: `settlementAccount.investmentActivity.topUps.timeline.presets`,
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
		name: `settlementAccount.investmentActivity.topUps.amount`,
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
		name: `settlementAccount.investmentActivity.withdrawals.timeline.presets`,
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
		name: `settlementAccount.investmentActivity.withdrawals.amount`,
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
];


export const BrokerCurrency = {
	KESTR: 'KES',
	DATAB: 'GHC',
	AFRIN: 'NGN',
	MERIS: 'SSX',
	1: 'SSX',
} as const;

export type BrokerCurrencyEnum = typeof BrokerCurrency;

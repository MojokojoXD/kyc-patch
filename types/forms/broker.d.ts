export type Currency = 'NGN' | 'KES' | 'GHS' | 'SSX';

export interface BrokerFacts {
	[index: string]: {
		readonly currency: Currency;
	};
}

export interface BrokerDetails {
	broker_id: string;
	org_code: string;
	org_cty: string;
	org_email: string;
	org_con1_email: string;
}



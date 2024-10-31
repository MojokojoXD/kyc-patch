export type Currency = 'NGN' | 'KES' | 'GHS' | 'SSX';

export type ClientID = string;

export interface BrokerFacts {
	[index: string]: {
		readonly currency: Currency;
	};
}

export interface BrokerDetails {
	broker_id: string;
	org_code: BrokerCode;
	org_cty: string;
	org_email: string;
	org_con1_email: string;
}


export type BrokerCode = 'DATAB' | 'KESTR' | 'AFRIN' | 'MERIS' | 1



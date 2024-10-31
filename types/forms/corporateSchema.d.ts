import type * as common from './common';

interface CorporateFormSchema {
	_formMetadata?: unknown;
	businessInfo: BusinessInformation;
	contacts: ContactInformation;
	accountSignatories: AccountSignatories;
	settlementAccount: SettlementAccount;
	disclosures: Disclosures;
	generalDocumentChecklist: DocumentChecklist;
}

interface BusinessInformation {
	categoryOfBusiness: string;
	categoryOfInvestment: InvestmentCategory[];
	taxExempt: common.YesOrNo;
	details: {
		name: string;
		type: string;
		physicalAddress: string;
		postalAddress: string;
		phoneNumber: common.PhoneInfo;
		emailAddress: string;
		countryOfIncorporation: string;
		city: string;
		sectorIndustry?: string;
		postCode?: string;
		website?: string;
		digitalAddress?: string;
		turnOver?: {
			monthlyAmount: string;
			annualAmount: string;
		};
	};
	incorporation: {
		certficateNo: string;
		tin?: string;
		KRAPin?: string;
		date?: string;
		licenseNo?: string;
		parentCountryIncorporation?: string;
	};
}

//Contacts Details
export interface ContactInformation {
	contactPerson: ContactPerson;
	city: string;
	postalAddress: string;
	phoneNumber: common.PhoneInfo;
	email: string;
	emergencyContact: common.EmergencyContact;
	digitalAddress: string;
	nearestLandmark: string;
	proofOfIdentity: common.ProofOfIdentity;
}

interface ContactPerson extends common.AccountPerson {
	isSignatory: common.YesOrNo;
}

//Signatores
interface AccountSignatories {
	signatories: Signatory[];
	directors: Director[];
	beneficialOwners: BeneficialOwner[];
	affiliations: { value: string }[];
}

interface BaseSignatory {
	id: string;
	role: common.SignatoryRole[];
	phoneNumber: common.PhoneInfo;
	address: Omit<common.ExpandedContact, 'postalCode' | 'faxNumber'>;
	signatureMandate: 'a' | 'b';
	signatureResource: string;
}

export type Signatory = BaseSignatory &
	common.AccountPerson &
	common.AfrinvestSpecific & {
		pepInfo: common.PepInfo;
		proofOfIdentity: common.ProofOfIdentity;
		disclosures: {
			fatca: {
				status: string[];
				ownership: string;
			};
			dataBank: {
				emailIndemnity: {
					address: string;
					signatureResource: string;
				};
			};
			kestrel: {
				nomineeAgreement: {
					signatureResource: string;
				};
			};
		};
		documentChecklist: DocumentChecklist;
	};

type BaseDirectoryOrBeneficialOwnerFields = Pick<
	common.AccountPerson,
	'firstName' | 'middleName' | 'lastName'
> &
	Pick<common.ExpandedContact, 'residentialAddress' | 'phoneNumber'> &
	Pick<common.ProofOfIdentity, 'idType' | 'idNumber'> & {
		id?: string;
		status: 'executive' | 'non-Executive';
		ownership: string;
		pepInfo: common.PepInfo;
		dateOfBirth?: string;
		isPrefill?: boolean;
	};

export type Director = BaseDirectoryOrBeneficialOwnerFields &
	Record<string, unknown>;

export type BeneficialOwner = BaseDirectoryOrBeneficialOwnerFields &
	Record<string, unknown>;

interface SettlementAccount {
	bank: {
		locale: common.Bank;
		account: common.BankAccount;
	};
	investmentActivity: {
		sourceOfFunds: string[];
		objective: string;
		frequency: Omit<common.Frequency, 'Bi-Annually'>;
		topUps: common.InvestmentFrequency;
		withdrawals: common.InvestmentFrequency;
		initialAmount: string;
		topUpAmounts: string;
		withdrawalAmounts: string;
	};
	riskProfile: {
		tolerance: common.Levels;
		investmentHorizon: string;
		investmentKnowledge: common.Levels;
		reaction: string;
		riskAgreement: common.Agreement;
	};
	statements: {
		modeOfDelivery: common.StatementDeliveryMode;
		frequency: Omit<common.Frequency, 'Quarterly'>;
	};
}

interface Disclosures {
	kestrel: {
		termsAndConditions: common.Agreement;
	};
	afrinvest: {
		emailIndemnity: common.Agreement;
	};
	declarations: common.Agreement;
	signatureMandate: string;
}

interface DocumentChecklist {
	[index: string]: common.FileStorage;
}

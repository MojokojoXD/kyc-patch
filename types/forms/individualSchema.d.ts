import * as common from './common';

export interface IndividualFormSchema {
	clientType: 'Individual' | 'Joint Account';
	clientStatus: string;
	csdNumber?: string;
	catInvestment: common.InvestmentCategory[];
	taxexempt: string;
	signatureMandate?: string;
	applicant: ClientInfo[];
	nextOfKin: NOK[];
	agreements: {
		kestrel: {
			termsAndConditions: common.Agreement;
		};
		afrinvest: {
			emailIndemnity: common.Agreement;
			privacyPolicy: common.Agreement;
		};
		declarations: common.Agreement;
	};
}

export type ClientInfo = Omit<
	common.AccountPerson,
	'countryOfBirth' | 'jobTitle' | 'residenceStatus'
> &
	common.AfrinvestSpecific & {
		id: string;
		contacts: common.ExpandedContact;
		employment: {
			status: string;
			statusDetails?: Employed | StudentEmployment | null;
		};
		bank: {
			locale: common.Bank;
			account: common.BankAccount;
		};
		proofOfIdentity: common.ProofOfIdentity;
		residence: {
			status?: common.ResidenceStatus;
			details?: {
				permitNumber: string;
				permitIssueDate: string;
				permitExpiry: string;
				permitIssuePlace: string;
			};
		};
		riskProfile: {
			tolerance?: common.Levels;
			investmentObjective?: string;
			beneficialOwner?: string;
			investmentHorizon?: string;
			initialInvestmentAmount?: string;
			topUps?: common.InvestmentFrequency;
			withdrawals?: common.InvestmentFrequency;
			significantWithdrawalTimetable?: string;
			emergencyFunds?: string;
			investmentKnowledge?: common.Levels;
			sourceOfFunds: string[];
			statements?: {
				deliveryMode?: common.StatementDeliveryMode;
				frequency: Omit<common.Frequency, 'Quarterly'>;
			};
			reaction?: string;
			agreementOfTerms?: string;
		};
		disclosures: Disclosures;
		fileUploads: FileUploads;
	};

export interface Employed {
	occupation: string;
	name: string;
	address: string;
	city: string;
	postalAddress: string;
	postalCode: string;
	positionHeld: string;
	phoneNumber: common.PhoneInfo;
	email: string;
	natureOfBusiness: string;
	country: string;
	digitalAddress: string;
	nearestLandmark: string;
	yearsOfTotalEmployment: string;
	yearsOfCurrentEmployment: string;
	yearsOfPreviousEmployment: string;
	incomeRange: string;
	licenseNumber: string;
}

type StudentEmployment = Pick<Employed, 'email' | 'phoneNumber'> & {
	// add additional fields here if needed
};

export interface NOK
	extends Omit<
		common.AccountPerson,
		| 'profession'
		| 'occupation'
		| 'jobTitle'
		| 'mothersMaidenName'
		| 'maidenName'
		| 'professionalLicense'
		| 'tin'
	> {
	relationshipToApplicant: string;
	percentageAllocation?: string;
	contacts?: common.BaseContact;
	proofOfIdentity?: common.ProofOfIdentity;
}

interface Disclosures {
	signatureResource: string;
	ratification: {
		nameOfDeclarant: string;
		languageOfUnderstanding: string;
	};
	pepInfo: common.PepInfo;
	fatca: {
		status: string[];
		details?: {
			ownership: string;
			firstName: string;
			middleName: string;
			lastName: string;
			foreignResidentialAddress: string;
			foreignMailingAddress: string;
			phoneNumber: common.PhoneInfo;
			tin: string;
		};
	};
	kestrel: {
		nomineeAgreement: {
			signatureResource: string;
		};
    };
    databank: {
        emailIndemnity: {
            signatureResource: string;
        }
    }
}

interface FileUploads {
	[index: string]: FileUploadInfo;
}

type FileUploadInfo = {
	documentFileName: string;
};

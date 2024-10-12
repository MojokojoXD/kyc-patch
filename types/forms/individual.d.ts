import type {
	ExpandedContact,
	BaseContact,
	PhoneInfo,
	Bank,
	BankAccount,
} from './universal';

export type ClientType = 'Individual' | 'Joint Account'

export interface IndividualFormSchema {
    _formMetadata: {
        applicantCount: number;
		applicant: {
			signatureFileName: string;
            kestrelSignatureFileName: string;
		}[];
	};
	clientType: ClientType;
	clientStatus: string;
	csdNumber: string;
	catInvestment: string;
	taxexempt: string;
	applicant: ApplicantInfo[];
}

export interface ApplicantInfo extends BiographicalCore {
	id: number;
	mothersMaidenName: string;
	maidenName: string;
	tin: string;
	contacts: ExpandedContact;
	employment: {
		status: string;
		statusDetails?: Employed | StudentEmployment | null;
	};
	bank: BankInfo;
	proofOfIdentity: ProofOfIdentity;
	riskProfile: {
		tolerance?: string;
		investmentObjective?: string;
		beneficialOwner?: string;
		investmentHorizon?: string;
		initialInvestmentAmount?: string;
		topUpActivity?: {
			frequency: string;
			other: string;
		};
		regularTopUpAmount?: string;
		withdrawalActivity?: {
			frequency: string;
			other: string;
		};
		regularTopUpAmount?: string;
		significantWithdrawalTimetable?: string;
		emergencyFunds?: string;
		investmentKnowledge?: string;
		sourceOfFunds: string[]; //Important! Do not change. Must be an array of strings;
		statements?: {
			deliveryMode: string;
			frequency: string;
		};
		reaction?: string;
		agreementOfTerms?: string;
	};
	nextOfKin: NextOfKinInfo;
	disclosures: Disclosures;
}

export interface Employed {
	occupation: string;
	name: string;
	address: string;
	city: string;
	postalAddress: string;
	postalCode: string;
	positionHeld: string;
	phoneNumber: PhoneInfo;
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

type BankInfo = Bank & {
    account: BankAccount;
    statement?: {
        modeOfDelivery: string;
        deliveryFrequency: string;
    } 
};

interface ProofOfIdentity {
	idType: string;
	idNumber: string;
	issueDate: string;
	placeOfIssue: string;
	expiryDate: string;
}

interface BiographicalCore {
	title: {
		presets: string;
		other?: string;
	};
	firstName: string;
	middleName: string;
	lastName: string;
	dateOfBirth: string;
	gender: string;
	maritalStatus: string;
	countryOfBirth: string;
	countryOfResidence: string;
	countryOfCitizenship: string;
    placeOfBirth: string;
    stateOfOrigin?: string;
	localGovernment?: string;
    religion?: string;
    licenseNumber?; string;
    residence?: {
        status: string;
        permitNumber: string;
        permitIssueDate: string;
        permitExpiry: string;
        permitIssuePlace: string;
    }
}

type NextOfKinInfo = BiographicalCore & {
	relationshipToApplicant: string;
	percentageAllocation: string;
	contacts: BaseContact;
	proofOfIdentity: ProofOfIdentity;
};

interface Disclosures {
	signatureURL: string;
	ratification: {
		nameOfDeclarant: string;
		languageOfUnderstanding: string;
	};
	pepInfo: {
		isPep: string;
		pepDetails?: {
			desc: string;
			country: string;
		};
	};
	fatca: {
		status: string[];
		details?:
			| {
					ownership: string;
					foreignResidentialAddress: string;
					foreignMailingAddress: string;
					phoneNumber: PhoneInfo;
					tin: string;
			  }
			| object;
	};
	kestrel: {
		termsAndConditions: string;
		nomineeAgreement: {
			signatureURL: string;
		};
	};
	afrinvest: {
		indemnityAgreement: string;
		privacyPolicyAgreement: string;
	};
	declarations: string;
}


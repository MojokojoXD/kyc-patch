export type YesOrNo = 'Yes' | 'No';

export type InvestmentCategory = 'Fixed Income' | 'Equities/Shares';

export type TitlePresets = 'Mr' | 'Mrs' | 'Ms' | 'Prof' | 'Dr';

export type Gender = 'Male' | 'Female';

export type Frequency = 'Monthly' | 'Quarterly' | 'Bi-Annually' | 'Annually';

export type Levels = 'Low' | 'Medium' | 'High'

export type StatementDeliveryMode = 'Email' | 'Online' | 'Collection at Branch';

export interface FileStorage
{
    filename: string;    
}

export interface FieldsWithOther<TPresets = string,TOther = string>
{
    presets: TPresets;
    other?: TOther;
}

export interface InvestmentFrequency
{
    timeline: FieldsWithOther<Frequency>;
    amount: string;
}

export type SignatoryRole =
	| 'Director'
	| 'Beneficial Owner'
	| 'Executive/Trustee/Admin';

export type ResidenceStatus =
	| 'Resident Ghanaian'
	| 'Resident Foreigner'
	| 'Non-resident Ghanaian'
	| 'Non-resident Foreigner';

export type MaritalStatus =
	| 'Single'
	| 'Married'
	| 'Separated'
	| 'Divorced';

export interface Country {
	call_code: string | null;
	cty_code: string;
	cty_flag_name: string | null;
	cty_name: string;
	cty_upd_rem: string | null;
}

export interface BankList {
	bank_code: string;
	bank_name: string;
	country_code: string;
	swift_code: string | null;
}

export interface BaseContact {
	residentialAddress: string;
	city: string;
	phoneNumber: PhoneInfo;
	email: string;
}

export interface ExpandedContact extends BaseContact {
	postalAddress: string;
	postalCode?: string;
	faxNumber?: PhoneInfo;
	digitalAddress?: string;
	nearestLandmark?: string;
	emergencyContact: EmergencyContact;
}

export interface EmergencyContact {
	contactName: string;
	relation: string;
	phoneNumber: PhoneInfo;
}

export type PhoneInfo = {
	value: string;
}[];

export interface Bank {
	country: string;
	name: string;
	branch: string;
}

export interface BankAccount {
	name: string;
	number: string;
	bvn?: string;
	type?: string;
	KRAPin?: string;
	dateOpened?: string;
	swiftCode?: string;
	routingNumber?: string;
}

export interface ProofOfIdentity {
	idType: string;
	idNumber: string;
	issueDate: string;
	placeOfIssue: string;
	expiryDate: string;
}

export interface AccountPerson {
    title: FieldsWithOther<TitlePresets>;
	firstName: string;
	middleName?: string;
	lastName: string;
	dateOfBirth: string;
	gender: Gender;
	maritalStatus: MaritalStatus;
	placeOfBirth: string;
	countryOfBirth: string;
	citizenship: string;
	countryOfResidence: string;
	residenceStatus: ResidenceStatus;
	profession: string;
	occupation: string;
	jobTitle: string;
	mothersMaidenName: string;
	maidenName?: string;
	professionalLicenseNo?: string;
	tin: string;
}

export interface AfrinvestSpecific
{
    religion?: string;
    stateOfOrigin?: string;
    localGovernment?: string;
}

export interface PepInfo
{
    isPep: 'Yes' | 'No',
    pepDetails?: {
        desc: string;
        country: string;
    };
}

export type Agreement = {
	agreed: boolean;
	timestamp: string;
	version: string;
};

/* lifted this from the phone input library because imports aren't working for some reason */
export type CountryCode =
	| 'AC'
	| 'AD'
	| 'AE'
	| 'AF'
	| 'AG'
	| 'AI'
	| 'AL'
	| 'AM'
	| 'AO'
	| 'AR'
	| 'AS'
	| 'AT'
	| 'AU'
	| 'AW'
	| 'AX'
	| 'AZ'
	| 'BA'
	| 'BB'
	| 'BD'
	| 'BE'
	| 'BF'
	| 'BG'
	| 'BH'
	| 'BI'
	| 'BJ'
	| 'BL'
	| 'BM'
	| 'BN'
	| 'BO'
	| 'BQ'
	| 'BR'
	| 'BS'
	| 'BT'
	| 'BW'
	| 'BY'
	| 'BZ'
	| 'CA'
	| 'CC'
	| 'CD'
	| 'CF'
	| 'CG'
	| 'CH'
	| 'CI'
	| 'CK'
	| 'CL'
	| 'CM'
	| 'CN'
	| 'CO'
	| 'CR'
	| 'CU'
	| 'CV'
	| 'CW'
	| 'CX'
	| 'CY'
	| 'CZ'
	| 'DE'
	| 'DJ'
	| 'DK'
	| 'DM'
	| 'DO'
	| 'DZ'
	| 'EC'
	| 'EE'
	| 'EG'
	| 'EH'
	| 'ER'
	| 'ES'
	| 'ET'
	| 'FI'
	| 'FJ'
	| 'FK'
	| 'FM'
	| 'FO'
	| 'FR'
	| 'GA'
	| 'GB'
	| 'GD'
	| 'GE'
	| 'GF'
	| 'GG'
	| 'GH'
	| 'GI'
	| 'GL'
	| 'GM'
	| 'GN'
	| 'GP'
	| 'GQ'
	| 'GR'
	| 'GT'
	| 'GU'
	| 'GW'
	| 'GY'
	| 'HK'
	| 'HN'
	| 'HR'
	| 'HT'
	| 'HU'
	| 'ID'
	| 'IE'
	| 'IL'
	| 'IM'
	| 'IN'
	| 'IO'
	| 'IQ'
	| 'IR'
	| 'IS'
	| 'IT'
	| 'JE'
	| 'JM'
	| 'JO'
	| 'JP'
	| 'KE'
	| 'KG'
	| 'KH'
	| 'KI'
	| 'KM'
	| 'KN'
	| 'KP'
	| 'KR'
	| 'KW'
	| 'KY'
	| 'KZ'
	| 'LA'
	| 'LB'
	| 'LC'
	| 'LI'
	| 'LK'
	| 'LR'
	| 'LS'
	| 'LT'
	| 'LU'
	| 'LV'
	| 'LY'
	| 'MA'
	| 'MC'
	| 'MD'
	| 'ME'
	| 'MF'
	| 'MG'
	| 'MH'
	| 'MK'
	| 'ML'
	| 'MM'
	| 'MN'
	| 'MO'
	| 'MP'
	| 'MQ'
	| 'MR'
	| 'MS'
	| 'MT'
	| 'MU'
	| 'MV'
	| 'MW'
	| 'MX'
	| 'MY'
	| 'MZ'
	| 'NA'
	| 'NC'
	| 'NE'
	| 'NF'
	| 'NG'
	| 'NI'
	| 'NL'
	| 'NO'
	| 'NP'
	| 'NR'
	| 'NU'
	| 'NZ'
	| 'OM'
	| 'PA'
	| 'PE'
	| 'PF'
	| 'PG'
	| 'PH'
	| 'PK'
	| 'PL'
	| 'PM'
	| 'PR'
	| 'PS'
	| 'PT'
	| 'PW'
	| 'PY'
	| 'QA'
	| 'RE'
	| 'RO'
	| 'RS'
	| 'RU'
	| 'RW'
	| 'SA'
	| 'SB'
	| 'SC'
	| 'SD'
	| 'SE'
	| 'SG'
	| 'SH'
	| 'SI'
	| 'SJ'
	| 'SK'
	| 'SL'
	| 'SM'
	| 'SN'
	| 'SO'
	| 'SR'
	| 'SS'
	| 'ST'
	| 'SV'
	| 'SX'
	| 'SY'
	| 'SZ'
	| 'TA'
	| 'TC'
	| 'TD'
	| 'TG'
	| 'TH'
	| 'TJ'
	| 'TK'
	| 'TL'
	| 'TM'
	| 'TN'
	| 'TO'
	| 'TR'
	| 'TT'
	| 'TV'
	| 'TW'
	| 'TZ'
	| 'UA'
	| 'UG'
	| 'US'
	| 'UY'
	| 'UZ'
	| 'VA'
	| 'VC'
	| 'VE'
	| 'VG'
	| 'VI'
	| 'VN'
	| 'VU'
	| 'WF'
	| 'WS'
	| 'XK'
	| 'YE'
	| 'YT'
	| 'ZA'
	| 'ZM'
	| 'ZW';

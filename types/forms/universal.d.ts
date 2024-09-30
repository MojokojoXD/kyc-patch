import { PersonalInformationSteps } from '@/utils/vars/enums';

export interface Country {
	call_code: string;
	cty_code: string;
	cty_flag_name: string;
	cty_name: string;
	cty_upd_rem: string | null;
}

export interface BankList {
	bank_code: string;
	bank_name: string;
	country_code: string;
	swift_code: string;
}

export interface BaseContact
{
    residentialAddress: string;
	city: string;
    mobile: PhoneInfo;
	email: string;
}

export interface ExpandedContact extends BaseContact {
	postalAddress: string;
	postalCode: string;
    digitalAddress: string;
    nearestLandmark: string;
	emergencyContact: {
		contactName: string;
		relation: string;
		phoneNumber: PhoneInfo
	};
}

export interface PhoneInfo {
	areaCode: string;
	lineNumber: string;
}

export interface FormMetaData {
	step_no: PersonalInformationSteps;
	step_title: string;
	step_desc?: string;
}

export interface Bank {
	country: string;
	name: string;
	branch: string;
}

export interface BankAccount {
	name: string;
	number: string;
	bvn: string;
	type: string;
	dateOpened: string;
	swiftCode: string;
	routingNumber: string;
}

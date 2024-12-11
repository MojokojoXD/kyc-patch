import type { Country } from '@/types/forms/common';
import { IndividualFormSchema } from '@/types/forms/individualSchema';
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { parsePhoneNumber } from 'react-phone-number-input';

export class FormHelpers {
	static getCountryProperty(
		country: string,
		countryList: Country[],
		property: keyof Country
	) {
		const foundCountry = countryList.find(
			(c) => c.cty_name.toLowerCase() === country.toLowerCase()
		);

		if (!foundCountry) return;

		return foundCountry[property];
	}

	static transformIndividualSchemaToServerSchema(obj: IndividualFormSchema) {
		return {
			Personal: [
				[{
					clientType: obj.clientType,
					clientStatus: obj.clientStatus,
				}],
				[{
					catInvestment: [...obj.catInvestment],
					taxexempt: obj.taxexempt,
				}],
				[
					...obj.applicant.map((a) => ({
						firstName: a.firstName,
						middleName: a.middleName ?? '',
						lastName: a.lastName,
						title:
							a.title.presets === 'Other' ? a.title.other ?? '' : a.title.presets ?? '',
						dateOfBirth: a.dateOfBirth,
						gender: a.gender,
						countryOfBirth: a.citizenship,
						countryOfResidence: a.countryOfResidence,
						residentialStatus: a.residence.status ?? '',
						mothersMaidenName: a.mothersMaidenName,
						maidenName: a.maidenName ?? '',
						tin: a.tin,
						stateOfOrigin: a.stateOfOrigin ?? '',
						localGovernment: a.localGovernment ?? '',
						religion: a.religion ?? '',
					})),
				],
				[
					...obj.applicant.map((a) => {
						const p_phone = parsePhoneNumber(a.contacts.phoneNumber[0].value);
						const p_emergency_phone = parsePhoneNumber(
							a.contacts.emergencyContact.phoneNumber[0].value
						);

						return {
							emailAddress: a.contacts.email,
							residentialAddress: a.contacts.residentialAddress,
							city: a.contacts.city,
							postalAddress: a.contacts.postalAddress,
							postCode: a.contacts.postalCode ?? '',
							phoneNumber: {
								countryCode: p_phone?.countryCallingCode ?? '',
								phoneNumber: p_phone?.nationalNumber ?? '',
								country: p_phone?.country,
							},
							contactName: a.contacts.emergencyContact.contactName,
							relation: a.contacts.emergencyContact.relation,
							mobile: {
								countryCode: p_emergency_phone?.countryCallingCode,
								phoneNumber: p_emergency_phone?.nationalNumber,
								country: p_emergency_phone?.country,
							},
							digitalAddress: a.contacts.digitalAddress ?? '',
							nearestLandmark: a.contacts.nearestLandmark ?? '',
						};
					}),
				],
				[
					...obj.applicant.map((a) => {
						const details = a.employment.statusDetails ?? '';
						const e_phone = details ? parsePhoneNumber(details.phoneNumber[0].value) : '';
						return {
							employmentStatus: a.employment.status,
							employerPhoneNumber: {
								countryCode: e_phone ? e_phone.countryCallingCode : e_phone,
								phoneNumber: e_phone ? e_phone.nationalNumber : e_phone,
								country: e_phone ? e_phone.country : e_phone,
							},
							occupation: details ? details.occupation : details,
							profession: details ? details.profession : details,
							employerName: details ? details.name : details,
							employerAddress: details ? details.address : details,
							employerCity: details ? details.city : details,
							employerPostalAddress: details ? details.postalAddress : details,
							employerPostCode: details ? details.postalCode : details,
							positionHeld: details ? details.positionHeld : details,
							employerEmailAddress: details ? details.email : details,
							natureOfBusiness: details ? details.natureOfBusiness : details,
							countryOfEmployment: details ? details.countryOfEmployment : details,
							employerDigitalAddress: details ? details.digitalAddress : details,
							employerNearestLandmark: details ? details.nearestLandmark : details,
							yearsOfTotalEmployment: details ? details.yearsOfTotalEmployment : details,
							yearsOfCurrentEmployment: details ? details.yearsOfCurrentEmployment : details,
							yearsOfPreviousEmployment: details
								? details.yearsOfPreviousEmployment
								: details,
						};
					}),
				],
				[
					...obj.applicant.map((a) => ({
						bankCountry: a.bank.locale.country,
						bankName: a.bank.locale.name,
						bankBranch: a.bank.locale.branch,
						accountName: a.bank.account.name,
						accountNumber: a.bank.account.number,
						bvn: a.bank.account.bvn ?? '',
						accountType: a.bank.account.type ?? '',
						dateOpened: a.bank.account.dateOpened,
						swiftCode: a.bank.account.swiftCode,
						routingNumber: a.bank.account.routingNumber,
					})),
				],
				[
					...obj.applicant.map((a) => ({
						idType: a.proofOfIdentity.idType,
						idNumber: a.proofOfIdentity.idNumber,
						issueDate: a.proofOfIdentity.issueDate,
						idPlaceOfIssue: a.proofOfIdentity.placeOfIssue,
						idExpiryDate: a.proofOfIdentity.expiryDate,
					})),
				],
				[
					...obj.applicant.map((a) => ({
						riskTolerance: a.riskProfile.tolerance,
						investmentObjective: a.riskProfile.investmentObjective,
						beneficialOwner: a.riskProfile.beneficialOwner,
						investmentHorizon: a.riskProfile.investmentHorizon,
						initialInvestmentAmount: a.riskProfile.initialInvestmentAmount ?? '',
						'Top-ups':
							a.riskProfile.topUps?.timeline.presets === 'Other'
								? a.riskProfile.topUps.timeline.other
								: a.riskProfile.topUps?.timeline.presets,
						expectedRegularTopUpAmount: a.riskProfile.topUps?.amount,
						Withdrawals:
							a.riskProfile.withdrawals?.timeline.presets === 'Other'
								? a.riskProfile.withdrawals.timeline.other
								: a.riskProfile.withdrawals?.timeline.presets,
						expectedRegularWithdrawalAmount: a.riskProfile.withdrawals?.amount,
						significantPortionWithdrawal: a.riskProfile.significantWithdrawalTimetable,
						sourceOfFunds: [...a.riskProfile.sourceOfFunds],
						emergencyFunds: a.riskProfile.emergencyFunds,
						investmentKnowledge: a.riskProfile.investmentKnowledge,
						modeStatementDelivery: a.riskProfile.statements?.deliveryMode,
						statementFrequency: a.riskProfile.statements?.frequency,
						reaction: a.riskProfile.reaction,
						agreement: a.riskProfile.agreementOfTerms?.agreed.toString(),
					})),
				],
			],
			NextOfKin: [
				[
					...obj.nextOfKin.map((n) => ({
						title: n.title.presets === 'Other' ? n.title.other : n.title.presets,
						firstName: n.firstName,
						middleName: n.middleName,
						lastName: n.lastName,
						dateOfBirth: n.dateOfBirth,
						relationshipWithAccountApplicant: n.relationshipToApplicant,
						maritalStatus: n.maritalStatus,
						gender: n.gender,
						countryOfBirth: n.countryOfBirth,
						countryOfResidence: n.countryOfResidence,
						countryOfCitizenship: n.citizenship,
						percentageAllocation: n.percentageAllocation ?? '',
						placeOfBirth: n.placeOfBirth ?? '',
					})),
				],
				[
					...obj.nextOfKin.map((n) => {
						const nok_phone = parsePhoneNumber(n.contacts!.phoneNumber[0].value);

						return {
							phoneNumber: {
								countryCode: nok_phone?.countryCallingCode,
								phoneNumber: nok_phone?.nationalNumber,
								country: nok_phone?.country,
							},
							residentialAddress: n.contacts?.residentialAddress,
							city: n.contacts?.city,
							emailAddress: n.contacts?.email ?? '',
						};
					}),
				],
				[
					...obj.nextOfKin.map((n) => ({
						idType: n.proofOfIdentity?.idType ?? '',
						idNumber: n.proofOfIdentity?.idNumber ?? '',
						idIssueDate: n.proofOfIdentity?.issueDate ?? '',
						idPlaceOfIssue: n.proofOfIdentity?.placeOfIssue ?? '',
						idExpiryDate: n.proofOfIdentity?.expiryDate ?? '',
					})),
				],
			],
			Disclosures: [
				[
					...obj.applicant.map((a) => ({
						signature: {
							fileName: a.disclosures.signatureResource,
						},
					})),
				],
				[
					...obj.applicant.map((a) => ({
						nameOfApplicant: `${a.firstName} ${a.middleName ?? ''} ${a.lastName}`,
						nameOfDeclarant: a.disclosures.ratification.nameOfDeclarant,
						languageOfUnderstanding: a.disclosures.ratification.languageOfUnderstanding,
					})),
				],
				[
					...obj.applicant.map((a) => ({
						isPep: a.disclosures.pepInfo.isPep,
						specify:
							a.disclosures.pepInfo.isPep === 'Yes'
								? a.disclosures.pepInfo.pepDetails?.desc
								: '',
						countryOfPep:
							a.disclosures.pepInfo.isPep === 'Yes'
								? a.disclosures.pepInfo.pepDetails?.country
								: '',
					})),
				],
				[
					{
						...obj.applicant.map((a) => {
							const f_phone = a.disclosures.fatca.details
								? parsePhoneNumber(a.disclosures.fatca.details.phoneNumber[0].value)
								: undefined;
							return {
								fatcaStatus: [...a.disclosures.fatca.status],
								firstName: a.disclosures.fatca.details?.firstName ?? '',
								middleName: a.disclosures.fatca.details?.middleName ?? '',
								lastName: a.disclosures.fatca.details?.lastName ?? '',
								foreignTelephoneNumber: {
									countryCode: (f_phone && f_phone.countryCallingCode) ?? '',
									phoneNumber: (f_phone && f_phone.nationalNumber) ?? '',
									country: (f_phone && f_phone.nationalNumber) ?? '',
								},
								ownership: a.disclosures.fatca.details?.ownership ?? '',
								foreignResidentialAddress:
									a.disclosures.fatca.details?.foreignResidentialAddress ?? '',
								foreignMailingAddress: a.disclosures.fatca.details?.foreignMailingAddress ?? '',
								tin: a.disclosures.fatca.details?.tin ?? '',
							};
						}),
					},
				],
				[
					{
						terms: obj.agreements.kestrel.termsAndConditions.agreed.toString(),
					},
				],
				[
					...obj.applicant.map((a) => ({
						signature: {
							fileName: a.disclosures.kestrel.nomineeAgreement.signatureResource,
						},
					})),
				],
				[
					{
						afrinvestIndemnity: obj.agreements.afrinvest.emailIndemnity.agreed.toString(),
					},
				],
				[
					{
						declaration: obj.agreements.declarations.agreed.toString(),
					},
				],
				[
					{
						signatureMandate: obj.signatureMandate ?? '',
					},
				],
				[
					{
						privacyPolicy: obj.agreements.afrinvest.privacyPolicy.agreed.toString(),
					},
				],
			],
			DocumentChecklist: [
				...obj.applicant.map((a) => ([{
					applicantID: a.fileUploads.applicantID.filename ?? '',
          passportPhotograph: a.fileUploads.passportPhotograph.filename ?? '',
          taxRegistration: a.fileUploads.taxCertificate.filename ?? '',
          BVNNumber: a.fileUploads.BVN.filename ?? '',
          proofOfAddress: a.fileUploads.proofOfAddress.filename ?? '',
          mapScreenshot: a.fileUploads.addressMap.filename ?? '',
          proofOfForeignAddress: a.fileUploads.foreignAddress.filename ?? '',
          residenceWorkPermit: a.fileUploads.residencePermit.filename ?? '',
          bankStatement3Months: a.fileUploads.proofOfBank.filename ?? '',
          kenyaKRAPINCertificate: a.fileUploads.KRAPin.filename ?? ''
          }
				])),
			],
		};
	}

	static recursiveObjectSearch(path: string, target: unknown): unknown {
		if (path === '') return target;

		const accessors = path.split('.');

		if (typeof target !== 'object' || !target) return target;

		const hasProperty = Object.hasOwn(target, accessors[0]);

		const value = hasProperty
			? (<Record<(typeof accessors)[0], unknown>>target)[accessors[0]]
			: undefined;

		accessors.shift();
		return this.recursiveObjectSearch(accessors.join('.'), value);
	}

	static async statelessRequest<TRequest = unknown, TResponse = unknown>(
		url: string,
		options: AxiosRequestConfig<TRequest> = {
			method: 'GET',
			withCredentials: true,
		}
	) {
		try {
			const res = await axios<TResponse>(url, { ...options });

			if (res.status === 200) {
				return res.data;
			}

			throw new Error('Status: ' + res.status + ', Message: ' + res.statusText);
		} catch (error) {
			throw error;
		}
	}

	static currencyInputFormatter(value: string): string {
		const formatter = new Intl.NumberFormat('en-GB', {
			useGrouping: 'always',
		});

		return formatter.format(parseInt(value));
	}

	static generateUniqueIdentifier() {
		return Math.random().toString(36).substr(2, 7);
	}

	private static helper(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		obj: Record<string, any>,
		path: string[],
		value: unknown
	) {
		// get the current and the remaining keys from the path
		const [current, ...rest] = path;

		// if there are more keys
		// add the value as an object or array
		// depending upon the typeof key
		if (rest.length > 0) {
			// if there is no key present
			// create a new one
			if (!obj[current]) {
				// if the key is numeric
				// add an array
				// else add an object
				const isNumber = `${+rest[0]}` === rest[0];
				obj[current] = isNumber ? [] : {};
			}

			// recurisvely update the remaining path
			// if the last path is not of object type
			// but key is then
			// create an object or array based on the key
			// and update the value
			if (typeof obj[current] !== 'object') {
				// determine if the key is string or numeric
				const isNumber = `${+rest[0]}` === rest[0];
				obj[current] = this.helper(isNumber ? [] : {}, rest, value);
			}
			// else directly update value
			else {
				obj[current] = this.helper(obj[current], rest, value);
			}
		}
		// else directly assign the value to the key
		else {
			obj[current] = value;
		}

		// return the updated obj
		return obj;
	}

	static set(obj: Record<string, unknown>, path: string, value: unknown) {
		let pathArr: string[] = [];

		// if path is of string type
		// replace the special characters
		// and split the string on . to get the path keys array
		if (typeof path === 'string') {
			pathArr = path.split('.');
		}

		// use the helper function to update
		this.helper(obj, pathArr, value);
	}
}

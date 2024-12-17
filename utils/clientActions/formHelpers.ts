import type { Country, PhoneInfo } from '@/types/forms/common';
import { CorporateFormSchema } from '@/types/forms/corporateSchema';
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
            residentPermitNumber: a.residence.details?.permitNumber ?? '',
            permitIssueDate: a.residence.details?.permitIssueDate ?? '',
            placeOfIssue: a.residence.details?.permitIssuePlace ?? '',
            permitExpiryDate: a.residence.details?.permitExpiry ?? '',
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
  
  static transformCorporateSchemaToServerSchema( obj: CorporateFormSchema )
  {

    const phoneObjPropBuilder = ( phoneInfo: PhoneInfo ) =>
    {
        const parsedPhoneNumbers = phoneInfo.map( p => parsePhoneNumber( p.value ) );
    
      const temp: { [ x: string ]: { countryCode?: string; phoneNumber?: string; } } = {};
    
        parsedPhoneNumbers.forEach( ( p, i ) =>
        {
          if ( !p ) return;
    
        Object.defineProperty( temp, `tel${ i + 1 }`, {
          value: {
            countryCode: p.countryCallingCode,
            phoneNumber: p.nationalNumber,
          }
        } );
        } )
      
      return temp;
    }

    
    return {
      Business: [ 
           [ { catBusiness: obj.businessInfo.categoryOfBusiness } ],
           [
                 {
                   catInvestment: obj.businessInfo.categoryOfInvestment,
                   taxexempt: obj.businessInfo.taxExempt,
                 }
           ],
            [
              {
                ...phoneObjPropBuilder( obj.businessInfo.details.phoneNumber ),
                companyName: obj.businessInfo.details.name,
                companyType: obj.businessInfo.details.type,
                companySector: obj.businessInfo.details.sectorIndustry,
                companyPlace: obj.businessInfo.details.physicalAddress,
                companyPostal: obj.businessInfo.details.postalAddress,
                companyZip: obj.businessInfo.details.postCode,
                city: obj.businessInfo.details.city,
                companyEmail: obj.businessInfo.details.emailAddress,
                countryOfIncorporation: obj.businessInfo.details.countryOfIncorporation,
                companyWebsite: obj.businessInfo.details.emailAddress,
                digitalAddress: obj.businessInfo.details.digitalAddress,
                monthlyincome: obj.businessInfo.details.turnOver?.monthlyAmount ?? '',
                annualincome: obj.businessInfo.details.turnOver?.annualAmount ?? '',
              }
                
            ],
        [
          {
            certificatenbr: obj.businessInfo.incorporation.certficateNo,
            taxNumber: obj.businessInfo.incorporation.tin ?? '',
            pinnbr: obj.businessInfo.incorporation.KRAPin ?? '',
            dateOfBirth: obj.businessInfo.incorporation.date ?? '',
            licenseNumber: obj.businessInfo.incorporation.licenseNo ?? '',
            parentCompany: obj.businessInfo.incorporation.parentCountryIncorporation ?? '',
          }
        ]
      ],
      Contact: [
        [
          {
          title: obj.contacts.contactPerson.title.presets === 'Other' ? obj.contacts.contactPerson.title.other : obj.contacts.contactPerson.title.presets,
          firstName: obj.contacts.contactPerson.firstName,
          middleName: obj.contacts.contactPerson.middleName,
          lastName: obj.contacts.contactPerson.lastName,
          dateOfBirth: obj.contacts.contactPerson.dateOfBirth,
          gender: obj.contacts.contactPerson.gender,
          maritalStatus: obj.contacts.contactPerson.maritalStatus,
          placeOfBirth: obj.contacts.contactPerson.placeOfBirth,
          countryOfBirth: obj.contacts.contactPerson.countryOfBirth,
          countryOfResidence: obj.contacts.contactPerson.countryOfResidence,
          countryOfCitizenship: obj.contacts.contactPerson.citizenship,
          residentialStatus: obj.contacts.contactPerson.residence.status ?? '',
          residentPermitNumber: obj.contacts.contactPerson.residence.details?.permitNumber ?? '',
          issueDate: obj.contacts.contactPerson.residence.details?.permitIssueDate ?? '',
          placeIssued: obj.contacts.contactPerson.residence.details?.permitIssuePlace ?? '',
          expiryDate: obj.contacts.contactPerson.residence.details?.permitExpiry ?? '',
          profession: obj.contacts.contactPerson.profession,
          occupation: obj.contacts.contactPerson.occupation,
          job: obj.contacts.contactPerson.jobTitle,
          mothersmaidenname: obj.contacts.contactPerson.mothersMaidenName,
          professionalLicenseNumber: obj.contacts.contactPerson.professionalLicenseNo ?? '',
          tinNumber: obj.contacts.contactPerson.tin ?? '',
          signatoryContact: obj.contacts.contactPerson.isSignatory
          }
            ],
           [
            {
              mobile: { ...phoneObjPropBuilder( obj.contacts.emergencyContact.phoneNumber ).tel1 },
              ...phoneObjPropBuilder( obj.contacts.phoneNumber ),
              residentialAddress: obj.contacts.residentialAddress,
              city: obj.contacts.city,
              postalAddress: obj.contacts.postalAddress,
              emailAddress: obj.contacts.email,
              ContactName: obj.contacts.emergencyContact.contactName,
              relation: obj.contacts.emergencyContact.relation,
              digitalAddress: obj.contacts.digitalAddress,
              nearestLandmark: obj.contacts.nearestLandmark,
            }
          ],
          [
            {
              idType: obj.contacts.proofOfIdentity.idType,
              idNumber: obj.contacts.proofOfIdentity.idNumber,
              issueDate: obj.contacts.proofOfIdentity.issueDate,
              placeOfIssue: obj.contacts.proofOfIdentity.placeOfIssue,
              expiryDate: obj.contacts.proofOfIdentity.expiryDate
            }
          ]
        
      ],
      Signatories: [
        [ ...obj.accountSignatories.signatories.map( s => ( {
          ContactName: s.address.emergencyContact.contactName,
          city: s.address.city,
          countryOfBirth: s.countryOfBirth,
          countryOfCitizenship: s.citizenship,
          countryOfResidence: s.countryOfResidence,
          dateOfBirth: s.dateOfBirth,
          digitalAddress: s.address.digitalAddress ?? '',
          emailAddress: s.address.email,
          expiryDate: s.residence.details?.permitExpiry ?? '',
          firstName: s.firstName,
          gender: s.gender ?? '',
          issueDate: s.residence.details?.permitIssueDate ?? '',
          job: s.jobTitle,
          lastName: s.lastName,
          localGovernment: s.localGovernment ?? '',
          maidenName: s.maidenName ?? '',
          mandate: s.signatureMandate ?? '',
          maritalStatus: s.maritalStatus ?? '',
          mobile: { ...phoneObjPropBuilder( s.address.emergencyContact.phoneNumber ).tel1 },
          mothersmaidenname: s.mothersMaidenName,
          nearestLandmark: s.address.nearestLandmark ?? '',
          occupation: s.occupation,
          placeIssued: s.residence.details?.permitIssuePlace ?? '',
          placeOfBirth: s.placeOfBirth,
          postalAddress: s.address.postalAddress,
          profession: s.profession,
          professionallisence: s.professionalLicenseNo ?? '',
          relation: s.address.emergencyContact.relation,
          religion: s.religion ?? '',
          residentPermitNumber: s.residence.details?.permitNumber ?? '',
          residentialAddress: s.address.residentialAddress,
          residentialStatus: s.residence.status ?? '',
          signature: s.signatureResource,
          state: s.stateOfOrigin,
          status: [ ...s.role ],
          title: s.title,
          tinNumber: s.tin,

          ...phoneObjPropBuilder( s.address.phoneNumber ),
        } ) ) ],
        [
          ...obj.accountSignatories.signatories.map( s => ( {
            expiryDate: s.proofOfIdentity.expiryDate,
            idNumber: s.proofOfIdentity.idNumber,
            idType: s.proofOfIdentity.idType,
            issueDate: s.proofOfIdentity.issueDate,
            placeOfIssue: s.proofOfIdentity.placeOfIssue,
        } ) )
        ],
        [
          ...obj.accountSignatories.signatories.map( d => ( {
            countryOfPep: d.pepInfo.pepDetails?.country ?? '',
            pep: d.pepInfo.isPep,
            specify: d.pepInfo.pepDetails?.desc ?? ''
          }) )
        ],
        [
          ...obj.accountSignatories.directors.map( d => ( {
            countryOfPep: d.pepInfo?.pepDetails?.country ?? '',
            dateOfBirth: '',
            firatName: d.firstName,
            homeAddress: '',
            idNumber: d.idNumber,
            idType: d.idType,
            lastName: d.lastName,
            middleName: d.middleName ?? '',
            ownership: d.ownership,
            pep: d.pepInfo?.isPep ?? 'No',
            specify: d.pepInfo?.pepDetails?.desc ?? '',
            status: d.status ?? '',
            ...phoneObjPropBuilder( d.phoneNumber )
          }))
        ],
        [
          ...obj.accountSignatories.beneficialOwners.map( b => ( {
             countryOfPep: b.pepInfo?.pepDetails?.country ?? '',
            dateOfBirth: '',
            firatName: b.firstName,
            homeAddress: '',
            idNumber: b.idNumber,
            idType: b.idType,
            lastName: b.lastName,
            middleName: b.middleName ?? '',
            ownership: b.ownership,
            pep: b.pepInfo?.isPep ?? 'No',
            specify: b.pepInfo?.pepDetails?.desc ?? '',
            status: b.status ?? '',
            ...phoneObjPropBuilder( b.phoneNumber )
          }))
        ],
        [
          ...obj.accountSignatories.affiliations.map( a => a.value )
        ]
      ],
      Bank: [
        [
          {
            accountName: obj.settlementAccount.bank.account.name,
            accountNumber: obj.settlementAccount.bank.account.number,
            accountType: obj.settlementAccount.bank.account.type,
            bankBranch: obj.settlementAccount.bank.locale.branch,
            bankCountry: obj.settlementAccount.bank.locale.country,
            bankName: obj.settlementAccount.bank.locale.name,
            bvn: obj.settlementAccount.bank.account.bvn ?? '',
            routingNumber: obj.settlementAccount.bank.account.routingNumber ?? '',
            swiftCode: obj.settlementAccount.bank.account.swiftCode ?? '',
          }
        ],
        [
          {
            Topups: obj.settlementAccount.investmentActivity.topUps.timeline.presets === 'Other' ? obj.settlementAccount.investmentActivity.topUps.timeline.other : 
              obj.settlementAccount.investmentActivity.topUps.timeline.presets ?? '',
            Withdrawals: obj.settlementAccount.investmentActivity.withdrawals.timeline.presets === 'Other' ? obj.settlementAccount.investmentActivity.withdrawals.timeline.other : 
              obj.settlementAccount.investmentActivity.withdrawals.timeline.presets ?? '',
            expectedAmount: obj.settlementAccount.investmentActivity.withdrawalAmounts,
            funds: [ ...obj.settlementAccount.investmentActivity.sourceOfFunds ],
            initialAmount: obj.settlementAccount.investmentActivity.initialAmount,
            investmentFrequency: obj.settlementAccount.investmentActivity.frequency,
            reguralAmount: obj.settlementAccount.investmentActivity.topUpAmounts
          }
        ],
        [
          {
            agrement: obj.settlementAccount.riskProfile.riskAgreement ? 'I/We understand investing in equities/shares is inherently risker than investing in fixed income products or holding cash' : '',
            horizon: obj.settlementAccount.riskProfile.investmentHorizon,
            investmentKnowledge: obj.settlementAccount.riskProfile.investmentKnowledge,
            reaction: obj.settlementAccount.riskProfile.reaction,
            risktrelance: obj.settlementAccount.riskProfile.tolerance
          }
        ],
        [
          {
            investmentObjective: obj.settlementAccount.investmentActivity.objective,
            modeStatementDelivery: obj.settlementAccount.statements.modeOfDelivery,
            statementFrequency: obj.settlementAccount.statements.frequency
          }
        ]
      ],
      Disclosures: [
        [
          {
            terms: obj.disclosures.kestrel.termsAndConditions.agreed ? 'I/We agree to the above Terms and Conditions' : '',

          }
        ],
        [
          obj.accountSignatories.signatories.map( s => ( {
            signature: s.disclosures.kestrel.nomineeAgreement.signatureResource,
          }) )
        ],
        [
          obj.accountSignatories.signatories.map( s => ( {
            signature: s.disclosures.databank.emailIndemnity.signatureResource,
            YourHouseAddress: `${s.address.residentialAddress}, ${ s.address.city } ${ s.countryOfResidence }`
          }) )
        ],
        [
          {
            afrinvestIndemnity: obj.disclosures.afrinvest.emailIndemnity.agreed ? "I/We agree to the above indemnity provisions." : '',
          }
        ],
        [
          { 
            signatureMandate: obj.disclosures.signatureMandate
           }
        ],
        [
          {
            declaration: obj.disclosures.declarations.agreed ? 'I/We agree to the above declarations' : ''
          }
        ],
        [
          ...obj.accountSignatories.signatories.map( s => ( {
            factcastatus: [...s.disclosures.fatca.status],
            ownership: s.disclosures.fatca.ownership,
          }) )
        ]
      ],
      DocumentChecklist: [
        [
          ...obj.accountSignatories.signatories.map( s => ( {
            residentFile: s.documentChecklist.residencePermit.filename,
            signatoriesIDFile: s.documentChecklist.signatoryID.filename,
            signatoriesPhotosFile: s.documentChecklist.signatoryPhotographs.filename
          } ) ),
          {
            BVNNumber: obj.generalDocumentChecklist.BVN.filename ?? '',
            OriginalDirectorsIDsFile: obj.generalDocumentChecklist.directorsID.filename ?? '',
            W9W8BENEFile: obj.generalDocumentChecklist.W9_W8BEN_E.filename ?? '',
            authorizedPersonsPhotoFile: obj.generalDocumentChecklist.directors_authorizedPerson.filename ?? '',
            bankFile: obj.generalDocumentChecklist.bankProof.filename ?? '',
            beneficiariesIDFile: obj.generalDocumentChecklist.beneficiariesID.filename ?? '',
            foreignAddressFile: obj.generalDocumentChecklist.proofForeignAddress.filename ?? '',
            incorporationFile: obj.generalDocumentChecklist.incorporationCertificate.filename ?? '',
            kenyaKraPinCertificate: obj.generalDocumentChecklist.KRAPin.filename ?? '',
            officialRegistryFile: obj.generalDocumentChecklist.registrySearch.filename ?? '',
            proofOfAddressFile: obj.generalDocumentChecklist.proofOfAddress.filename ?? '',
            sealFile: obj.generalDocumentChecklist.companySeal.filename ?? '',
            resolutionFile: obj.generalDocumentChecklist.boardResolution.filename ?? '',
            taxRegistrationCertificateFile: obj.generalDocumentChecklist.taxCertificate.filename ?? '',
            uboFile: obj.generalDocumentChecklist.UBO.filename ?? ''
          }
        ],

      ]
    }
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

import type { ReviewStepMetadata } from "@/types/forms";
import { DisclosuresSteps } from "@/utils/vars/enums";


const disclosuresStepsMetadata: ReviewStepMetadata<DisclosuresSteps>[] = [
    {
		step: DisclosuresSteps.SIGNATURE_UPLOAD,
        header: 'Signature',
        _maxFieldIndex: 2,
		field: [
			{
                id: 1,
                name: 'Signature',
                fieldType: "image",
                path: ( index: number ) => `applicant.${index}.disclosures.signatureURL`,
			}
		],
    },
    {
		step: DisclosuresSteps.BLIND_ILLITERATE,
		header: 'Illiterate/Blind Customer Ratification',
		field: [
			{
                id: 1,
				name: 'Name of Declarant',
				path: (index: number) => `applicant.${index}.disclosures.ratification.nameOfDeclarant`,
			},
			{
                id: 2,
				name: 'Language',
				path: (index: number) => `applicant.${index}.disclosures.ratification.languageOfUnderstanding`,
			}
		],
    },
    {
		step: DisclosuresSteps.PEP,
        header: "Politically Exposed Person (PEP) Self-Certification",
        field: [
            {
                id: 1,
                name: "Having read and understood the above definition please confirm if you, or any of your directors, authorised persons, shareholders or beneficial owners are a PEP?",
                path: ( index:number ) => `applicant.${index}.disclosures.pepInfo.isPep`
            },
            {
                id: 2,
                name: "If Yes, Please Specify How",
                path: ( index:number ) => `applicant.${index}.disclosures.pepInfo.pepDetails.desc`
            },
            {
                id: 3,
                name: "In which country",
                path: ( index:number ) => `applicant.${index}.disclosures.pepInfo.pepDetails.country`
            },
        ],
	},
    {
		step: DisclosuresSteps.FATCA,
        header: "Foreign Account Tax Compliance Act (FATCA)",
        field: [
            {
                id: 1,
                name: "FATCA Status",
                path: ( index:number ) => `applicant.${index}.disclosures.fatca.status`
            },
            {
                id: 2,
                name: "Ownership(%)",
                path: ( index:number ) => `applicant.${index}.disclosures.fatca.details.ownership`
            },
            {
                id: 3,
                name: "Foreign Residential Address",
                path: ( index:number ) => `applicant.${index}.disclosures.fatca.details.foreignResidentialAddress`
            },
            {
                id: 4,
                name: "Foreign Mailing Address",
                path: ( index:number ) => `applicant.${index}.disclosures.fatca.details.foreignMailingAddress`
            },
            {
                id: 5,
                name: "Foreign Telephone Number",
                path: ( index: number ) => [
                    `applicant.${ index }.disclosures.fatca.details.phoneNumber.areaCode`,
                    `applicant.${ index }.disclosures.fatca.details.phoneNumber.lineNumber`,
                ]
            },
            {
                id: 6,
                name: "Foreign Tax Identification Number (TIN)/Social Security Number (SSN)/National Identity Number(NIN)",
                path: ( index: number ) => `applicant.${ index }.disclosures.fatca.details.tin`
            },
        ],
	},
    {
		step: DisclosuresSteps.KESTREL_TERMS,
        header: "Terms and Conditions - Kestrel Capital",
        field: [
            {
                id: 1,
                name: "Terms and Conditions",
                fieldType: "boolean",
                path: ( index:number ) => `applicant.${index}.disclosures.kestrel.termsAndConditions`
            }
        ],
	},
    {
		step: DisclosuresSteps.KESTREL_NOMINEE_AGREEMENT,
        header: "Nominee Agreement - Kestrel Capital Nominees Services LTD",
        field: [
            {
                id: 1,
                name: "Signature",
                fieldType: "image",
                path: ( index:number ) => `applicant.${index}.disclosures.kestrel.nomineeAgreement.signatureURL`
            }
        ],
    },
    {
		step: DisclosuresSteps.AFRIVEST_EMAIL_INDEMNITY,
        header: "Email Indemnity - Afrinvest",
        field: [
            {
                id: 1,
                name: "Email Indemnity",
                fieldType: "boolean",
                path: ( index:number ) => `applicant.${index}.disclosures.afrinvest.indemnityAgreement`
            }
        ],
	},
    {
		step: DisclosuresSteps.DECLARATIONS,
        header: "Declaration",
        field: [
            {
                id: 1,
                name: "Declaration",
                fieldType: "boolean",
                path: ( index:number ) => `applicant.${index}.disclosures.declarations`
            }
        ],
	},
    {
		step: DisclosuresSteps.AFRIVEST_PRIVACY_POLICY,
        header: "Privacy Policy - Afrinvest",
        field: [
            {
                id: 1,
                name: "Privacy Policy",
                fieldType: "boolean",
                path: ( index:number ) => `applicant.${index}.disclosures.afrinvest.privacyPolicyAgreement`
            }
        ],
	},
   
    
];


export default disclosuresStepsMetadata;
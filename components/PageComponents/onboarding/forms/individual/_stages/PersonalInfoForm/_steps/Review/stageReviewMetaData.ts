import { PersonalInformationSteps } from "@/utils/vars/enums";
import type { ReviewStepMetadata } from "@/types/forms";

const personalFormStepsMetadata: ReviewStepMetadata<PersonalInformationSteps>[] = [
	{
		step: PersonalInformationSteps.RETAIL_CLIENT,
        header: 'retail client',
        _maxFieldIndex: 1,
		field: [
			{
                id: 1,
				name: 'client type',
				path: 'clientType',
			},
			{
                id: 2,
				name: 'client status',
				path: 'clientStatus',
			},
		],
	},
	{
		step: PersonalInformationSteps.INVESTMENT_CAT,
		header: 'category of investment',
		field: [
			{
                id: 1,
				name: 'CSD Number',
				path: 'csdNumber',
			},
			{
                id: 2,
				name: 'Category of Investment',
				path: 'catInvestment',
			},
			{
                id: 3,
				name: 'Are you tax exempt',
				path: 'taxexempt',
			},
		],
	},
	{
		step: PersonalInformationSteps.BIO,
        header: 'Personal Information',
        _maxFieldIndex: 2,
		field: [
			{
                id: 1,
				name: 'Title',
                path: ( index: number ) => [
                    `applicant.${ index }.title.presets`,
                    `applicant.${ index }.title.other`,
                ],
			},
			{
                id: 2,
				name: 'Full Name',
				path: (index: number) => `applicant.${index}.firstName`,
			},
			{
                id: 3,
				name: 'Middle Name',
				path: (index: number) => `applicant.${index}.middleName`,
			},
			{
                id: 4,
				name: 'Last Name',
				path: (index: number) => `applicant.${index}.lastName`,
			},
			{
                id: 5,
				name: 'Date of birth',
				path: (index: number) => `applicant.${index}.dateOfBirth`,
			},
			{
                id: 6,
				name: 'Gender',
				path: (index: number) => `applicant.${index}.gender`,
			},
			{
                id: 7,
				name: 'Marital Status',
				path: (index: number) => `applicant.${index}.maritalStatus`,
			},
			{
                id: 8,
				name: 'Country of Birth',
				path: (index: number) => `applicant.${index}.countryOfBirth`,
			},
			{
                id: 9,
				name: 'Place of Birth',
				path: (index: number) => `applicant.${index}.placeOfBirth`,
			},
			{
                id: 10,
				name: 'Country of Residence',
				path: (index: number) => `applicant.${index}.countryOfResidence`,
			},
			{
                id: 11,
				name: 'Nationality/Country of Citizenship',
				path: (index: number) => `applicant.${index}.countryOfCitizenship`,
			},
			{
                id: 12,
				name: 'Residential Statu',
				path: (index: number) => `applicant.${index}.residentialStatus`,
			},
			{
                id: 13,
				name: "Mother's maiden name",
				path: (index: number) => `applicant.${index}.mothersMaidenName`,
			},
			{
                id: 14,
				name: 'Maiden Name (Optional)',
				path: (index: number) => `applicant.${index}.maidenName`,
			},
			{
                id: 15,
				name: 'Tax Identification Number',
				path: (index: number) => `applicant.${index}.tin`,
			},
			{
                id: 16,
				name: 'State of Origin',
				path: (index: number) => `applicant.${index}.stateOfOrigin`,
			},
			{
                id: 17,
				name: 'Local Government',
				path: (index: number) => `applicant.${index}.localGovernment`,
			},
			{
                id: 18,
				name: 'Religion',
				path: (index: number) => `applicant.${index}.religion`,
			},
		],
	},
	{
		step: PersonalInformationSteps.CONTACT_INFO,
		header: 'Contact Details',
		field: [
			{
                id: 1,
				name: 'Residential Address (Not a P.O Box)',
				path: (index: number) => `applicant.${index}.contacts.residentialAddress`,
			},
			{
                id: 2,
				name: 'City/Town',
				path: (index: number) => `applicant.${index}.contacts.city`,
			},
			{
                id: 3,
				name: 'Postal Address',
				path: (index: number) => `applicant.${index}.contacts.postalAddress`,
			},
			{
                id: 4,
				name: 'Post Code',
				path: (index: number) => `applicant.${index}.contacts.postalCode`,
			},
			{
                id: 5,
				name: 'Phone Number',
                path: ( index: number ) => [
                    `applicant.${ index }.contacts.mobile.areaCode`,
                    `applicant.${ index }.contacts.mobile.lineNumber`,
                ],
			},
			{
                id: 6,
				name: 'Email Address',
				path: (index: number) => `applicant.${index}.contacts.email`,
			},
			{
                id: 7,
				name: 'Emergency Contact Details',
                path: ( index: number ) => `applicant.${ index }.contacts.emergencyContact.contactName`,
			},
			{
                id: 8,
				name: '',
                path: ( index: number ) => `applicant.${ index }.contacts.emergencyContact.relation`,

			},
			{
                id: 9,
				name: '',
                path: ( index: number ) => [
                    `applicant.${ index }.contacts.emergencyContact.phoneNumber.areaCode`,
                    `applicant.${ index }.contacts.emergencyContact.phoneNumber.lineNumber`
                ],
			},
			{
                id: 10,
				name: 'Digital Address (Ghana Post GPS)',
				path: (index: number) => `applicant.${index}.contacts.digitalAddress`,
			},
			{
                id: 11,
				name: 'Nearest Landmark',
				path: (index: number) => `applicant.${index}.contacts.nearestLandmark`,
			},
		],
	},
	{
		step: PersonalInformationSteps.EMPLOYMENT_INFO,
		header: 'Employment Information',
		field: [
			{
                id: 1,
				name: 'Employment Status',
				path: (index: number) => `applicant.${index}.employment.status`,
			},
			{
                id: 2,
				name: 'Occupation',
				path: (index: number) => `applicant.${index}.employment.statusDetails.occupation`,
			},
			{
                id: 3,
				name: 'Profession',
				path: (index: number) => `applicant.${index}.employment.statusDetails.profession`,
			},
			{
                id: 4,
				name: 'Employer/Business/School Name',
				path: (index: number) => `applicant.${index}.employment.statusDetails.name`,
			},
			{
                id: 5,
				name: 'Employer/Business/School Address',
                path: ( index: number ) => `applicant.${ index }.employment.statusDetails.address`,
			},
			{
                id: 6,
				name: 'City/Town',
				path: (index: number) => `applicant.${index}.employment.statusDetails.city`,
			},
			{
                id: 7,
				name: 'Postal Address',
                path: ( index: number ) => `applicant.${ index }.employment.statusDetails.postalAddress`,
			},
			{
                id: 8,
				name: 'Post Code',
				path: (index: number) => `applicant.${index}.employment.statusDetails.postalCode`,
			},
			{
                id: 9,
				name: 'Position Held',
				path: (index: number) => `applicant.${index}.employment.statusDetails.positionHeld`,
			},
			{
                id: 10,
				name: 'Employer/Business/School Phone Number',
                path: ( index: number ) => [
                    `applicant.${ index }.employment.statusDetails.phoneNumber.areaCode`,
                    `applicant.${ index }.employment.statusDetails.phoneNumber.lineNumber`,
                ],
			},
			{
                id: 11,
				name: 'Employer/Business/School Email Address',
				path: (index: number) => `applicant.${index}.employment.statusDetails.email`,
			},
			{
                id: 12,
				name: 'Nature of Business',
				path: (index: number) => `applicant.${index}.employment.statusDetails.natureOfBusiness`,
			},
			{
                id: 13,
				name: 'Country of Employment',
				path: (index: number) => `applicant.${index}.employment.statusDetails.country`,
			},
			{
                id: 14,
				name: 'Digital Address (Ghana Post GPS)',
				path: (index: number) => `applicant.${index}.employment.statusDetails.digitalAddress`,
			},
			{
                id: 15,
				name: 'Nearest Landmark',
				path: (index: number) => `applicant.${index}.employment.statusDetails.nearestLandmark`,
			},
			{
                id: 16,
				name: 'Years of Total Employment',
				path: (index: number) => `applicant.${index}.employment.statusDetails.yearsOfTotalEmployment`,
			},
			{
                id: 17,
				name: 'Years of Current Employment',
				path: (index: number) => `applicant.${index}.employment.statusDetails.yearsOfCurrentEmployment`,
			},
			{
                id: 18,
				name: 'Years of Previous Employment',
				path: (index: number) => `applicant.${index}.employment.statusDetails.yearsOfPreviousEmployment`,
			},
			{
                id: 19,
				name: 'Total Monthly Income Range (GHS)',
				path: (index: number) => `applicant.${index}.employment.statusDetails.incomeRange`,
			},
			{
                id: 20,
				name: 'Professional License Number',
				path: (index: number) => `applicant.${index}.employment.statusDetails.licenseNumber`,
			}
		],
	},
	{
		step: PersonalInformationSteps.BANK_INFO,
		header: 'Settlement Bank Account',
		field: [
			{
                id: 1,
				name: 'Bank Country',
				path: (index: number) => `applicant.${index}.bank.country`,
			},
			{
                id: 2,
				name: 'Bank Name',
				path: (index: number) => `applicant.${index}.bank.name`,
			},
			{
                id: 3,
				name: 'Bank Branch',
				path: (index: number) => `applicant.${index}.bank.branch`,
			},
			{
                id: 4,
				name: 'Account Name',
				path: (index: number) => `applicant.${index}.bank.accountDetails.name`,
			},
			{
                id: 5,
				name: 'Account Number',
                path: ( index: number ) => `applicant.${ index }.bank.accountDetails.number`,
			},
			{
                id: 6,
				name: 'BVN number',
				path: (index: number) => `applicant.${index}.bank.accountDetails.bvn`,
			},
			{
                id: 7,
				name: 'Account Type',
                path: ( index: number ) => `applicant.${ index }.bank.accountDetails.type`,
			},
			{
                id: 8,
				name: 'Date Opened',
				path: (index: number) => `applicant.${index}.bank.accountDetails.dateOpened`,
			},
			{
                id: 9,
				name: 'SWIFT Code',
				path: (index: number) => `applicant.${index}.bank.accountDetails.swiftCode`,
			},
			{
                id: 10,
				name: 'Routing Number',
                path: ( index: number ) => `applicant.${index}.bank.accountDetails.routingNumber`,
			}
		],
	},
	{
		step: PersonalInformationSteps.IDENTITY_PROOF,
		header: 'Proof of Identity',
		field: [
			{
                id: 1,
				name: 'ID Type',
				path: (index: number) => `applicant.${index}.proofOfIdentity.idType`,
			},
			{
                id: 2,
				name: 'ID Number',
				path: (index: number) => `applicant.${index}.proofOfIdentity.idNumber`,
			},
			{
                id: 3,
				name: 'Issue Date',
				path: (index: number) => `applicant.${index}.proofOfIdentity.issuedOn`,
			},
			{
                id: 4,
				name: 'Place of Issue',
				path: (index: number) => `applicant.${index}.proofOfIdentity.placeOfIssue`,
			},
			{
                id: 5,
				name: 'Expiry Date',
                path: ( index: number ) => `applicant.${ index }.proofOfIdentity.expiry`,
			}
		],
	},
	{
		step: PersonalInformationSteps.RISK_PROFILE,
		header: 'Investment & Risk Profile',
		field: [
			{
                id: 1,
				name: 'Risk Tolerance',
				path: (index: number) => `applicant.${index}.riskProfile.tolerance`,
			},
			{
                id: 2,
				name: 'Investment Objective',
				path: (index: number) => `applicant.${index}.riskProfile.investmentObjective`,
			},
			{
                id: 3,
				name: 'Name of Beneficial Owner',
				path: (index: number) => `applicant.${index}.riskProfile.beneficialOwner`,
			},
			{
                id: 4,
				name: 'Investment Horizon',
				path: (index: number) => `applicant.${index}.riskProfile.investmentHorizon`,
			},
			{
                id: 5,
				name: 'Initial Investment Amount (GHS)',
                path: ( index: number ) => `applicant.${ index }.riskProfile.initialAmount`,
			},
			{
                id: 6,
				name: 'Anticipated Investment Activity: Top-ups',
                path: ( index: number ) => [
                    `applicant.${ index }.riskProfile.topUpFrequency.frequency`,
                    `applicant.${ index }.riskProfile.topUpFrequency.other`
                ]
			},
			{
                id: 7,
				name: 'Expected Regular Top-up Amount (GHS)',
                path: ( index: number ) => `applicant.${ index }.riskProfile.topUpAmount`,
			},
			{
                id: 8,
				name: 'Anticipated Investment Activity: Withdrawals',
                path: ( index: number ) => [
                    `applicant.${ index }.riskProfile.withdrawalFrequency.frequency`,
                    `applicant.${ index }.riskProfile.withdrawalFrequency.other`
                ]
            },
            {
                id: 9,
				name: 'Expected Regular Withdrawal Amount (GHS)',
                path: ( index: number ) => `applicant.${ index }.riskProfile.withdrawalAmount`,
			},
            {
                id: 10,
				name: 'When do you plan to withdraw a significant portion of your money?',
                path: ( index: number ) => `applicant.${ index }.riskProfile.significantWithdrawalTimetable`,
			},
            {
                id: 11,
				name: 'Do you have an emergency fund (ie 6 months of after-tax income)?',
                path: ( index: number ) => `applicant.${ index }.riskProfile.emergencyFunds`,
			},
            {
                id: 12,
				name: 'What is the level of your investment knowledge',
                path: ( index: number ) => `applicant.${ index }.riskProfile.investmentKnowledge`,
			},
            {
                id: 13,
				name: 'Source of Funds',
                path: ( index: number ) => `applicant.${ index }.riskProfile.sourceOfFunds`,
            },
            {
                id: 14,
				name: 'Mode of Statement Delivery',
                path: ( index: number ) => `applicant.${ index }.riskProfile.statements.deliveryMode`,
            },
            {
                id: 15,
				name: 'Statement Frequency',
                path: ( index: number ) => `applicant.${ index }.riskProfile.statements.frequency`,
            },
            {
                id: 16,
				name: 'How would you react if an investment you have invested in lost 10% of its value in the first year:',
                path: ( index: number ) => `applicant.${ index }.riskProfile.reaction`,
            },
            {
                id: 17,
				name: 'How would you react if an investment you have invested in lost 10% of its value in the first year:',
                path: ( index: number ) => `applicant.${ index }.riskProfile.reaction`,
            },
            {
                id: 18,
                name: 'Investment and equities terms and agreement',
                fieldType: "boolean",
                path: ( index: number ) => `applicant.${ index }.riskProfile.agreementOfTerms`,
            },
            
		],
    },
    {
        step: PersonalInformationSteps.REVIEW,
        header: "Review",
        field: []
    }
];


export default personalFormStepsMetadata;
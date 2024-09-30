import type { ReviewStepMetadata } from "@/types/forms";
import { NextOfKinSteps } from "@/utils/vars/enums";


const nextOfKinStepsMetadata: ReviewStepMetadata<NextOfKinSteps>[] = [
    {
		step: NextOfKinSteps.BIO,
        header: 'Next of Kin - Personal Information',
        _maxFieldIndex: 2,
		field: [
			{
                id: 1,
				name: 'Title',
                path: ( index: number ) => [
                    `applicant.${ index }.nextOfKin.title.presets`,
                    `applicant.${ index }.nextOfKin.title.other`,
                ],
			},
			{
                id: 2,
				name: 'First Name',
				path: (index: number) => `applicant.${index}.nextOfKin.firstName`,
			},
			{
                id: 3,
				name: 'Middle Name',
				path: (index: number) => `applicant.${index}.nextOfKin.middleName`,
			},
			{
                id: 4,
				name: 'Last Name',
				path: (index: number) => `applicant.${index}.nextOfKin.lastName`,
			},
			{
                id: 5,
				name: 'Date of birth',
				path: (index: number) => `applicant.${index}.nextOfKin.dateOfBirth`,
			},
			{
                id: 6,
				name: 'Relationship to Applicant',
				path: (index: number) => `applicant.${index}.nextOfKin.relationshipToApplicant`,
			},
			{
                id: 7,
				name: 'Gender',
				path: (index: number) => `applicant.${index}.nextOfKin.gender`,
			},
			{
                id: 8,
				name: 'Marital Status',
				path: (index: number) => `applicant.${index}nextOfKin.maritalStatus`,
			},
			{
                id: 9,
				name: 'Country of Birth',
				path: (index: number) => `applicant.${index}.nextOfKin.countryOfBirth`,
			},
			{
                id: 10,
				name: 'Place of Birth',
				path: (index: number) => `applicant.${index}.nextOfKin.placeOfBirth`,
			},
			{
                id: 11,
				name: 'Country of Residence',
				path: (index: number) => `applicant.${index}.nextOfKin.countryOfResidence`,
			},
			{
                id: 12,
				name: 'Nationality/Country of Citizenship',
				path: (index: number) => `applicant.${index}.nextOfKin.countryOfCitizenship`,
			},
			{
                id: 13,
				name: 'Percentage Allocation',
				path: (index: number) => `applicant.${index}.nextOfKin.percentageAllocation`,
			},
		],
    },
    {
		step: NextOfKinSteps.CONTACT,
		header: 'Next of Kin - Contact Details',
		field: [
			{
                id: 1,
				name: 'Residential Address (Not a P.O Box)',
				path: (index: number) => `applicant.${index}.nextOfKin.contacts.residentialAddress`,
			},
			{
                id: 2,
				name: 'City/Town',
				path: (index: number) => `applicant.${index}.nextOfKin.contacts.city`,
			},
			{
                id: 5,
				name: 'Phone Number',
                path: ( index: number ) => [
                    `applicant.${ index }.nextOfKin.contacts.mobile.areaCode`,
                    `applicant.${ index }.nextOfKin.contacts.mobile.lineNumber`,
                ],
			},
			{
                id: 6,
				name: 'Email Address',
				path: (index: number) => `applicant.${index}.nextOfKin.contacts.email`,
			},
			
		],
    },
    {
		step: NextOfKinSteps.PROOF_OF_IDENTITY,
		header: 'Next of Kin - Proof of Identity',
		field: [
			{
                id: 1,
				name: 'ID Type',
				path: (index: number) => `applicant.${index}.nextOfKin.proofOfIdentity.idType`,
			},
			{
                id: 2,
				name: 'ID Number',
				path: (index: number) => `applicant.${index}.nextOfKin.proofOfIdentity.idNumber`,
			},
			{
                id: 3,
				name: 'Issue Date',
				path: (index: number) => `applicant.${index}.nextOfKin.proofOfIdentity.issuedOn`,
			},
			{
                id: 4,
				name: 'Place of Issue',
				path: (index: number) => `applicant.${index}.nextOfKin.proofOfIdentity.placeOfIssue`,
			},
			{
                id: 5,
				name: 'Expiry Date',
                path: ( index: number ) => `applicant.${ index }.nextOfKin.proofOfIdentity.expiry`,
			}
		],
	},
];


export default nextOfKinStepsMetadata;
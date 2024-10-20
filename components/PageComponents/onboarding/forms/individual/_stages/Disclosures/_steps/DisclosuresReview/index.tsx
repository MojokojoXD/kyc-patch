import {
	FormContent,
	FormHeader,
	FormSubHeader,
	FormTitle,
} from '@/components/UIcomponents/FormLayout';
import type { FormStep } from '@/types/Components/onboarding';
import { ReviewerSection } from '@/components/UIcomponents/FormReviewer/ReviewerComponents/ReviewerSection';
import { signatureUploadFieldModel } from '../SignatureUpload/formBuilder/signatureUploadFieldModel';
import { blindDisabledRatificationFieldsModel } from '../BlindDisabledRatification/formBuilder/blindDisabledRatificationFields';
import { pepFieldsModel } from '../Pep/formbuilder/pepFieldsModel';
import { fatcaFieldsModel } from '../Fatca/formBuilder/fatcaFieldsModel';
import { kestrelTermsFields } from '../KestrelTerms/formBuilder/kestrelTermsFields';
import { kestrelNomineeFieldsModel } from '../KestrelNominee/formBuilder/kestrelNomineeFields';
import { afrinvestEmailIndemnityFields } from '../AfrinvestEmailIndemnity/formBuilder/afrinvestEmailIndemnityFields';
import { declarationsFields } from '../Declarations/formBuilder/declarationsFields';
import { signatureMandateFields } from '../SignatureMandate/formBuilder/signatureMandateFields';
import { afrinvestPrivacyPolicyFields } from '../AfrinvestPrivacyPolicy/formBuilder/afrinvestPrivacyPolicyFields';

export const DisclosuresReview: FormStep = ( { applicantCount,formAction } ) => {

	const editStep = (step: number) =>
		formAction({
			type: 'jump_to_form_location',
			toStage: 3,
			toStep: step,
        } );
    
    const accordionTitle = ( index: number ) => ( {
        firstName: `applicant.${ index }.firstName`,
        lastName: `applicant.${ index }.lastName`,
        titlePrefix: 'Applicant',
    })

	return (
		<>
			<FormHeader>
				<FormTitle>Application Summary</FormTitle>
				<FormSubHeader>
					Review your submissions for any inaccuracies
				</FormSubHeader>
			</FormHeader>
			<FormContent className='bg-white px-0 pt-0'>
				<div className='bg-neutral-50 space-y-[16px]'>
					<ReviewerSection
						sectionName='Signature Upload'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, 0)}
                        fieldModel={ signatureUploadFieldModel }
                        accordionTitle={ accordionTitle }
					/>
					<ReviewerSection
						sectionName='Illiterate/Blind Customer Ratification'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, 1)}
                        fieldModel={ blindDisabledRatificationFieldsModel }
                        accordionTitle={ accordionTitle }
					/>
					<ReviewerSection
						sectionName='Politically Exposed Person (PEP) Self-Certification'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, 2)}
                        fieldModel={ pepFieldsModel }
                        accordionTitle={ accordionTitle }
					/>
					<ReviewerSection
						sectionName='Foreign Account Tax Compliance Act (FATCA)'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, 3)}
                        fieldModel={ fatcaFieldsModel}
                        accordionTitle={ accordionTitle }
					/>
					<ReviewerSection
						sectionName='Terms and Conditions - Kestrel Capital'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, 4)}
                        fieldModel={kestrelTermsFields}
                        accordionTitle={ accordionTitle }
					/>
					<ReviewerSection
						sectionName='Nominee Agreement - Kestrel Capital Nominees Services LTD'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, 5)}
                        fieldModel={kestrelNomineeFieldsModel}
                        accordionTitle={ accordionTitle }
					/>
					<ReviewerSection
						sectionName='Email Indemnity - Afrinvest'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, 6)}
                        fieldModel={afrinvestEmailIndemnityFields}
                        accordionTitle={ accordionTitle }
					/>
					<ReviewerSection
						sectionName='Declaration'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, 7)}
                        fieldModel={declarationsFields}
                        accordionTitle={ accordionTitle }
					/>
					{applicantCount! > 1 && <ReviewerSection
						sectionName='Signature Mandate'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, 8)}
                        fieldModel={signatureMandateFields}
                        accordionTitle={ accordionTitle }
					/>}
					<ReviewerSection
						sectionName='Privacy Policy - Afrinvest'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, applicantCount! > 1 ? 9 : 8)}
                        fieldModel={afrinvestPrivacyPolicyFields}
                        accordionTitle={ accordionTitle }
					/>
					
				</div>
			</FormContent>
		</>
	);
};

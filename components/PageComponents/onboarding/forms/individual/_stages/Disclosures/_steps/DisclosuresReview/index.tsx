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
import type { Step } from '../../../../utils/formReducer';

export const DisclosuresReview: FormStep = ( { applicantCount,formAction } ) => {

	const editStep = (step: Step) =>
		formAction({
			type: 'jump_to_form_location',
			toStage: 'disclosures',
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
				<FormTitle>Disclosures Summary</FormTitle>
				<FormSubHeader>
					Review your submissions for any inaccuracies
				</FormSubHeader>
			</FormHeader>
			<FormContent className='bg-white px-0 pt-0'>
				<div className='bg-neutral-50 space-y-[16px]'>
					<ReviewerSection
						sectionName='Signature Upload'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, 'signature upload')}
                        fieldModel={ signatureUploadFieldModel }
                        accordionTitle={ accordionTitle }
					/>
					<ReviewerSection
						sectionName='Illiterate/Blind Customer Ratification'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, 'customer ratification')}
                        fieldModel={ blindDisabledRatificationFieldsModel }
                        accordionTitle={ accordionTitle }
					/>
					<ReviewerSection
						sectionName='Politically Exposed Person (PEP) Self-Certification'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, 'pep')}
                        fieldModel={ pepFieldsModel }
                        accordionTitle={ accordionTitle }
					/>
					<ReviewerSection
						sectionName='Foreign Account Tax Compliance Act (FATCA)'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, 'fatca')}
                        fieldModel={ fatcaFieldsModel}
                        accordionTitle={ accordionTitle }
					/>
					<ReviewerSection
						sectionName='Terms and Conditions - Kestrel Capital'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, 'kestrel capital - terms')}
                        fieldModel={kestrelTermsFields}
                        accordionTitle={ accordionTitle }
					/>
					<ReviewerSection
						sectionName='Nominee Agreement - Kestrel Capital Nominees Services LTD'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, 'kestrel capital - nominee')}
                        fieldModel={kestrelNomineeFieldsModel}
                        accordionTitle={ accordionTitle }
					/>
					<ReviewerSection
						sectionName='Email Indemnity - Afrinvest'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, 'afrinvest - email indemnity')}
                        fieldModel={afrinvestEmailIndemnityFields}
                        accordionTitle={ accordionTitle }
					/>
					<ReviewerSection
						sectionName='Declaration'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, 'declarations')}
                        fieldModel={declarationsFields}
                        accordionTitle={ accordionTitle }
					/>
					{ applicantCount > 1 && <ReviewerSection
						sectionName='Signature Mandate'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, 'signature mandate')}
                        fieldModel={signatureMandateFields}
                        accordionTitle={ accordionTitle }
					/>}
					<ReviewerSection
						sectionName='Privacy Policy - Afrinvest'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, 'afrinvest - privacy policy')}
                        fieldModel={afrinvestPrivacyPolicyFields}
                        accordionTitle={ accordionTitle }
					/>
					
				</div>
			</FormContent>
		</>
	);
};

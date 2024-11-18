import {
	FormContent,
	FormHeader,
	FormSubHeader,
	FormTitle,
} from '@/components/FormLayout';
import type { FormStep } from '@/types/Components/onboarding';
import { ReviewerSection } from '@/components/FormReviewer/ReviewerComponents/ReviewerSection';
import { signatureUploadModel } from '../SignatureUpload/model/signatureUploadModel';
import { blindDisabledRatificationModel } from '../BlindDisabledRatification/model/blindDisabledRatificationModel';
import { pepModel$Individual } from '../Pep$Individual/model/pepModel$Individual';
import { fatcaModel$Individual } from '../Fatca$Individual/model/fatcaModel$Individual';
import { kestrelTermsModel$Individual } from '../KestrelTerms$Individual/model/kestrelTermsModel$Individual';
import { kestrelNomineeModel$Individual } from '../KestrelNominee$Individual/model/kestrelNomineeModel$Individual';
import { afrinvestIndemnityModel$Individual } from '../AfrinvestIndemnity$Individual/model/afrinvestIndemnityModel$Individual';
import { declarationsModel$Individual } from '../Declarations$Individual/model/declarationsModel$Individual';
import { signatureMandateModel$Individual } from '../SignatureMandate$Individual/model/signatureMandateModel$Individual';
import { afrinvestPrivacyPolicyModel } from '../AfrinvestPrivacyPolicy/model/afrinvestPrivacyPolicyModel';
import { useKYCFormContext } from '@/components/forms/utils/formController';
import type {
	IndividualFormMetadata,
	IndividualFormStep,
} from '../../../../config/individualFormMetadata';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';

export const Review$Disclosures$Individual: FormStep = () => {
	const {
		formAction,
		form: { getValues },
	} = useKYCFormContext<IndividualFormSchema, IndividualFormMetadata>();

	const applicantCount = (getValues('applicant') || [{}]).length;

	const editStep = (step: IndividualFormStep) =>
		formAction({
			type: 'jump_to_form_location',
			toStage: 'disclosures',
			toStep: step,
		});

	const accordionTitle = (index: number) => ({
		firstName: `applicant.${index}.firstName`,
		lastName: `applicant.${index}.lastName`,
		titlePrefix: 'Applicant',
	});

	return (
		<>
			<FormHeader>
				<FormTitle>Disclosures Summary</FormTitle>
				<FormSubHeader>Review your submissions for any inaccuracies</FormSubHeader>
			</FormHeader>
			<FormContent className='bg-white px-0 pt-0'>
				<div className='bg-neutral-50 space-y-[16px]'>
					<ReviewerSection
						sectionName='Signature Upload'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, 'signature upload')}
						fieldModel={signatureUploadModel}
						accordionTitle={accordionTitle}
					/>
					<ReviewerSection
						sectionName='Illiterate/Blind Customer Ratification'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, 'customer ratification')}
						fieldModel={blindDisabledRatificationModel}
						accordionTitle={accordionTitle}
					/>
					<ReviewerSection
						sectionName='Politically Exposed Person (PEP) Self-Certification'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, 'pep')}
						fieldModel={pepModel$Individual}
						accordionTitle={accordionTitle}
					/>
					<ReviewerSection
						sectionName='Foreign Account Tax Compliance Act (FATCA)'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, 'fatca')}
						fieldModel={fatcaModel$Individual}
						accordionTitle={accordionTitle}
					/>
					<ReviewerSection
						sectionName='Terms and Conditions - Kestrel Capital'
						editAction={editStep.bind(this, 'kestrel capital - terms')}
						fieldModel={kestrelTermsModel$Individual}
					/>
					<ReviewerSection
						sectionName='Nominee Agreement - Kestrel Capital Nominees Services LTD'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, 'kestrel capital - nominee')}
						fieldModel={kestrelNomineeModel$Individual}
						accordionTitle={accordionTitle}
					/>
					<ReviewerSection
						sectionName='Email Indemnity - Afrinvest'
						editAction={editStep.bind(this, 'afrinvest - email indemnity')}
						fieldModel={afrinvestIndemnityModel$Individual}
					/>
					<ReviewerSection
						sectionName='Declaration'
						editAction={editStep.bind(this, 'declarations')}
						fieldModel={declarationsModel$Individual}
					/>
					{applicantCount && applicantCount > 1 && (
						<ReviewerSection
							sectionName='Signature Mandate'
							editAction={editStep.bind(this, 'signature mandate')}
							fieldModel={signatureMandateModel$Individual}
						/>
					)}
					<ReviewerSection
						sectionName='Privacy Policy - Afrinvest'
						editAction={editStep.bind(this, 'afrinvest - privacy policy')}
						fieldModel={afrinvestPrivacyPolicyModel}
					/>
				</div>
			</FormContent>
		</>
	);
};

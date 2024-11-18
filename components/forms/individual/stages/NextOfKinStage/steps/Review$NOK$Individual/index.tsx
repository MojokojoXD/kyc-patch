import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import {
	FormContent,
	FormHeader,
	FormSubHeader,
	FormTitle,
} from '@/components/FormLayout';
import type { FormStep } from '@/types/Components/onboarding';
import { ReviewerSection } from '@/components/FormReviewer/ReviewerComponents/ReviewerSection';
import { contactModel$NOK$Individual } from '../Contact$NOK$Individual/model/contactModel$NOK$Individual';
import { proofOfIdentityModel$NOK$Individual } from '../ProofOfIdentity$NOK$Individual/model/proofOfIdentityModel$NOK$Individual';
import { personalModel$NOK$Individual } from '../Personal$NOK$Individual/model/personalModel$NOK$Individual';
import type {
	IndividualFormStep,
	IndividualFormMetadata,
} from '../../../../config/individualFormMetadata';
import { useKYCFormContext } from '@/components/forms/utils/formController';

export const Review$NOK$Individual: FormStep = () => {
	const {
		form: { getValues },
		formAction,
	} = useKYCFormContext<IndividualFormSchema, IndividualFormMetadata>();

	const nextOfKinCount = getValues(`nextOfKin`).length;

	const editStep = (step: IndividualFormStep) =>
		formAction({
			type: 'jump_to_form_location',
			toStage: 'next of kin',
			toStep: step,
		});

	const accordionTitle = (index: number) => ({
		firstName: `nextOfKin.${index}.firstName`,
		lastName: `nextOfKin.${index}.lastName`,
		titlePrefix: 'Next of Kin',
	});

	return (
		<>
			<FormHeader>
				<FormTitle>Next of Kin Summary</FormTitle>
				<FormSubHeader>Review your submissions for any inaccuracies</FormSubHeader>
			</FormHeader>
			<FormContent className='bg-white px-0 pt-0'>
				<div className='bg-neutral-50 space-y-[16px]'>
					<ReviewerSection
						sectionName='Next of Kin - Personal Information'
						applicantCount={nextOfKinCount}
						editAction={editStep.bind(this, 'personal information_next of kin')}
						fieldModel={personalModel$NOK$Individual}
						accordionTitle={accordionTitle}
					/>
					<ReviewerSection
						sectionName='Next of Kin - Contact Details'
						applicantCount={nextOfKinCount}
						editAction={editStep.bind(this, 'contact details_next of kin')}
						fieldModel={contactModel$NOK$Individual}
						accordionTitle={accordionTitle}
					/>
					<ReviewerSection
						sectionName='Next of Kin - Proof of Identity'
						applicantCount={nextOfKinCount}
						editAction={editStep.bind(this, 'proof of identity_next of kin')}
						fieldModel={proofOfIdentityModel$NOK$Individual}
						accordionTitle={accordionTitle}
					/>
				</div>
			</FormContent>
		</>
	);
};

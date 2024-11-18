import type { FormStep } from '@/types/Components/onboarding';
import { useKYCFormContext } from '@/components/forms/utils/formController';
import { contactDetailsModel$Corporate } from '../ContactDetails$Corporate/model/contactDetailsModel$Corporate';
import { contactPersonModel } from '../ContactPerson/model/contactPersonModel';
import { proofOfIdentityModel$Contacts } from '../ProofOfIdentity$Corporate/model/proofOfIdentityModel_contact';
import { ReviewerSection } from '@/components/FormReviewer/ReviewerComponents/ReviewerSection';
import {
	FormHeader,
	FormContent,
	FormTitle,
	FormSubHeader,
} from '@/components/FormLayout';
import type { CorporateStep } from '../../../../config/corporateFormConfigs';

export const Review$Contacts: FormStep = () => {
	const { formAction } = useKYCFormContext();

	const editStep = (step: CorporateStep) => {
		formAction({
			type: 'jump_to_form_location',
			toStage: 'contacts',
			toStep: step,
		});
	};

	return (
		<>
			<FormHeader>
				<FormTitle>Business Information Summary</FormTitle>
				<FormSubHeader>Review your submissions for any inaccuracies</FormSubHeader>
			</FormHeader>
			<FormContent className='bg-white px-0 pt-0'>
				<div className='bg-neutral-50 space-y-[16px]'>
					<ReviewerSection
						sectionName='Contact Person'
						editAction={editStep.bind(this, 'contact person')}
						fieldModel={contactPersonModel}
					/>
					<ReviewerSection
						sectionName='Contact Details'
						editAction={editStep.bind(this, 'address')}
						fieldModel={contactDetailsModel$Corporate}
					/>
					<ReviewerSection
						sectionName='Proof of Identity'
						editAction={editStep.bind(this, 'proof of identity_contacts')}
						fieldModel={proofOfIdentityModel$Contacts}
					/>
				</div>
			</FormContent>
		</>
	);
};

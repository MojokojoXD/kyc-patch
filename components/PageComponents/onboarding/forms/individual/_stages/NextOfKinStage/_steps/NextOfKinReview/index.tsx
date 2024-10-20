import { useFormContext } from 'react-hook-form';
import type { IndividualFormSchema } from '@/types/forms/individual';
import {
	FormContent,
	FormHeader,
	FormSubHeader,
	FormTitle,
} from '@/components/UIcomponents/FormLayout';
import type { FormStep } from '@/types/Components/onboarding';
import { ReviewerSection } from '@/components/UIcomponents/FormReviewer/ReviewerComponents/ReviewerSection';
import { NOK_bioFieldsModel } from '../NextOfKin_Bio/formBuilder/NOK_biofieldsModel';
import { NOK_contactFieldsModel } from '../NextOfKin_Contact/formBuilder/NOK_contactFieldModel';
import { NOK_identifyProofFieldsModel } from '../NextOfKin_IdentityProof/formBuilder/NOK_identityProofFieldModel';

export const NextOfKinReview: FormStep = ( { formAction } ) => {
	const { getValues } = useFormContext<IndividualFormSchema>();

	const nextOfKinCount = getValues(`nextOfKin`).length;

	const editStep = (step: number) =>
		formAction({
			type: 'jump_to_form_location',
			toStage: 2,
			toStep: step,
        } );
    
    const accordionTitle = ( index: number ) => ( {
        firstName: `nextOfKin.${ index }.firstName`,
        lastName: `nextOfKin.${ index }.lastName`,
        titlePrefix: 'Next of Kin',
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
						sectionName='Next of Kin - Personal Information'
						applicantCount={nextOfKinCount}
						editAction={editStep.bind(this, 0)}
                        fieldModel={ NOK_bioFieldsModel }
                        accordionTitle={ accordionTitle }
					/>
					<ReviewerSection
						sectionName='Next of Kin - Contact Details'
						applicantCount={nextOfKinCount}
						editAction={editStep.bind(this, 1)}
                        fieldModel={ NOK_contactFieldsModel}
                        accordionTitle={ accordionTitle }
					/>
					<ReviewerSection
						sectionName='Next of Kin - Proof of Identity'
						applicantCount={nextOfKinCount}
						editAction={editStep.bind(this, 2)}
                        fieldModel={ NOK_identifyProofFieldsModel}
                        accordionTitle={ accordionTitle }
					/>
					
				</div>
			</FormContent>
		</>
	);
};

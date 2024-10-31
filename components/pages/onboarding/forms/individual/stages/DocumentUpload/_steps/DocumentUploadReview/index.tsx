import {
	FormContent,
	FormHeader,
	FormSubHeader,
	FormTitle,
} from '@/components/UIcomponents/FormLayout';
import type { FormStep } from '@/types/Components/onboarding';
import { ReviewerSection } from '@/components/UIcomponents/FormReviewer/ReviewerComponents/ReviewerSection';
import { fileUploadsFieldsModel } from '../FileUploads/formBuilder/fileUploadsFieldsModel';
import type { Step } from '../../../../_stageMetadata/stages';

export const DocumentUploadReview: FormStep = ( { applicantCount,formAction } ) => {

	const editStep = (step: Step) =>
		formAction?.call(this,{
			type: 'jump_to_form_location',
			toStage: 'document upload',
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
						sectionName='Document Checklist'
						applicantCount={ applicantCount }
						editAction={editStep.bind(this, 'checklist')}
                        fieldModel={ fileUploadsFieldsModel }
                        accordionTitle={ accordionTitle }
					/>
				</div>
			</FormContent>
		</>
	);
};

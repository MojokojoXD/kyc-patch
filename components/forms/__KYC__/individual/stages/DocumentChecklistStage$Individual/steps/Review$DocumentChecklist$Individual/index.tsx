import {
	FormContent,
	FormHeader,
	FormSubHeader,
	FormTitle,
} from '@/components/forms/FormLayout';
import type { FormStep } from '@/types/Components/onboarding';
import { ReviewerSection } from '@/components/forms/FormReviewer/ReviewerComponents/ReviewerSection';
import { fileUploadsModel$Individual } from '../FileUploads$Individual/model/fileUploadsModel$Individual';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import type {
	IndividualFormStep,
	IndividualFormMetadata,
} from '../../../../config/individualFormMetadata';
import { useKYCFormContext } from '@/components/forms/utils/formController';

export const Review$DocumentChecklist$Individual: FormStep = () => {
	const {
		formAction,
		form: { getValues },
	} = useKYCFormContext<IndividualFormSchema, IndividualFormMetadata>();

	const applicantCount = (getValues('applicant') || [{}]).length;

	const editStep = (step: IndividualFormStep) =>
		formAction({
			type: 'jump_to_form_location',
			toStage: 'document checklist',
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
				<FormTitle>Application Summary</FormTitle>
				<FormSubHeader>Review your submissions for any inaccuracies</FormSubHeader>
			</FormHeader>
			<FormContent className='bg-white px-0 pt-0'>
				<div className='bg-neutral-50 space-y-[16px]'>
					<ReviewerSection
						sectionName='Document Checklist'
						applicantCount={applicantCount}
						editAction={editStep.bind(this, 'checklist')}
						fieldModel={fileUploadsModel$Individual}
						accordionTitle={accordionTitle}
					/>
				</div>
			</FormContent>
		</>
	);
};

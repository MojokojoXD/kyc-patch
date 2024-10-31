import type { FormStep } from '@/types/Components/onboarding';
import { useKYCFormContext } from '@/components/pages/onboarding/forms/utils/formController';
import { signatoryFileUploadsModel$Corporate,generalFileUpload$Corporate } from '../FileUploads$Corporate/model/fileUploadsModel$Corporate';
import { ReviewerSection } from '@/components/UIcomponents/FormReviewer/ReviewerComponents/ReviewerSection';
import {
	FormHeader,
	FormContent,
	FormTitle,
	FormSubHeader,
} from '@/components/UIcomponents/FormLayout';
import type { Signatory } from '@/types/forms/corporateSchema';

export const Review$DocumentCheckList$Corporate: FormStep = () => {
	const { formAction, form } = useKYCFormContext();
	const { getValues } = form;

	const signatoriesCount = (
		(getValues('accountSignatories.signatories') as Signatory[]) || [{}]
	).length;

	const editStep = () => {
		formAction({
			type: 'jump_to_form_location',
			toStage: 'document checklist',
			toStep: 'file uploads',
		});
	};

	const accordionTitle = (index: number) => ({
		firstName: `accountSignatories.signatories.${index}.firstName`,
		lastName: `accountSignatories.signatories.${index}.lastName`,
		titlePrefix: 'Signatory',
	});

	return (
		<>
			<FormHeader>
				<FormTitle>Document Upload Summary</FormTitle>
				<FormSubHeader>Review your submissions for any inaccuracies</FormSubHeader>
			</FormHeader>
			<FormContent className='bg-white px-0 pt-0'>
				<div className='bg-neutral-50 space-y-[16px]'>
					<ReviewerSection
                        sectionName='Signatory Documents'
                        applicantCount={signatoriesCount}
						editAction={editStep}
                        fieldModel={ signatoryFileUploadsModel$Corporate }
                        accordionTitle={accordionTitle}
					/>
					<ReviewerSection
						sectionName='General Documents'
						editAction={editStep}
						fieldModel={generalFileUpload$Corporate}
					/>
					
				</div>
			</FormContent>
		</>
	);
};

// import CustomProgress from '@/components/UIcomponents/CompoundUI/CustomProgress';
import { FormStage } from '@/types/Components/onboarding';
import { FileUploads } from './_steps/FileUploads';
import { DocumentUploadReview } from './_steps/DocumentUploadReview';
import { Submit } from './_steps/Submit';

export const DocumentUpload: FormStage = ({ step, renderStep }) => {
	const getStageStep = () => {
		switch (step) {
			case 'checklist':
                return FileUploads;
            case 'review_document upload':
                return DocumentUploadReview;
            case 'submit':
                return Submit;
			default:
				throw new Error('step ' + step + ' is not supported');
		}
	};

	const StepComponent = getStageStep();

	return (
		<>
			<div className='flex flex-col grow'>
				{renderStep(StepComponent)}
			</div>
		</>
	);
};

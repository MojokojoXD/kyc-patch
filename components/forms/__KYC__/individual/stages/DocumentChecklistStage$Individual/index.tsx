// import CustomProgress from '@/components/UIcomponents/CompoundUI/CustomProgress';
import { FileUploads$Individual } from './steps/FileUploads$Individual';
import { Review$DocumentChecklist$Individual } from './steps/Review$DocumentChecklist$Individual';
import { Submit$Individual } from './steps/Submit$Individual';
import type {
	IndividualFormMetadata,
	IndividualFormStep,
} from '../../config/individualFormMetadata';
import type { FormComponentDict } from '../../../../utils/formReducer';
import { useKYCFormContext } from '../../../../utils/formController';

export const DocumentChecklistStage$Individual = () => {
	const { formNav } = useKYCFormContext<object, IndividualFormMetadata>();

	const checklistStepsDict: FormComponentDict<IndividualFormStep> = {
		checklist: <FileUploads$Individual />,
		'review_document upload': <Review$DocumentChecklist$Individual />,
		submit: <Submit$Individual />,
	};

	return <>{checklistStepsDict[formNav.currentStep]}</>;
};

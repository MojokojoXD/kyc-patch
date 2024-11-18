import type { CorporateStepDict } from '../../config/corporateFormConfigs';
//steps import
import { FileUploads$Corporate } from './steps/FileUploads$Corporate';
import { Review$DocumentCheckList$Corporate } from './steps/Review$DocumentCheckList$Corporate';
import { Submit$Corporate } from './steps/Submit$Corporate';
import { useKYCFormContext } from '../../../utils/formController';
import type { CorporateStep } from '../../config/corporateFormConfigs';

export const DocumentCheckListStage$Corporate = () => {
    const {
		formNav: { currentStep },
	} = useKYCFormContext();

	const contactStepDict: CorporateStepDict = {
        'file uploads': <FileUploads$Corporate />,
        'review_document checklist': <Review$DocumentCheckList$Corporate />,
        'submit': <Submit$Corporate/>
    };
    

	return <>{contactStepDict[currentStep as CorporateStep]}</>;
};

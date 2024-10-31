import type { CorporateStepDict } from '../../config/corporateFormConfigs';
//steps import
import { KestrelTerms$Corporate } from './steps/KestrelTerms$Corporate';
import { KestrelNorminee$Corporate } from './steps/KestrelNominee$Corporate';
import { DatabankEmailIndemnity$Corporate } from './steps/DatabankIndemnity$Corporate';
import { AfrinvestIndemnity$Corporate } from './steps/AfrinvestIndemity$Corporate';
import { SignatureMandate$Corporate } from './steps/SignatureMandate';
import { Declarations$Corporate } from './steps/Declarations$Corporate';
import { Review$Disclosures$Corporate } from './steps/Review$Disclosures$Corporate';
import { Fatca$Corporate } from './steps/Fatca$Corporate';
import { useKYCFormContext } from '../../../utils/formController';
import type { CorporateStep } from '../../config/corporateFormConfigs';

export const DisclosuresStage$Corporate = () => {
    const {
		formNav: { currentStep },
	} = useKYCFormContext();

	const contactStepDict: CorporateStepDict = {
        'kestrel - terms': <KestrelTerms$Corporate />,
        'kestrel - nominee': <KestrelNorminee$Corporate />,
        'databank - indemnity': <DatabankEmailIndemnity$Corporate />,
        'afrinvest - indemnity': <AfrinvestIndemnity$Corporate />,
        'signature mandate': <SignatureMandate$Corporate />,
        'declarations': <Declarations$Corporate />,
        'fatca': <Fatca$Corporate />,
        'review_disclosures': <Review$Disclosures$Corporate/>
    };
    

	return <>{contactStepDict[currentStep as CorporateStep]}</>;
};

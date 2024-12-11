import type { CorporateStepDict } from '../../config/corporateFormConfigs';
//steps import
import { Signatories } from './steps/Signatories';
import { ProofOfIdentity$Corporate } from './steps/ProofOfIdentity$Corporate';
import { Pep$Corporate } from './steps/Pep$Corporate';
import { Directors } from './steps/Directors';
import { BeneficialOwners } from './steps/BeneficialOwner';
import { Affiliations } from './steps/Affiliations';
import { Review$Signatories$Corporate } from './steps/Review$Signatories$Corporate';
import { useKYCFormContext } from '../../../../utils/formController';
import type { CorporateStep } from '../../config/corporateFormConfigs';

export const AccountSignatoriesStage = () => {
	const {
		formNav: { currentStep },
	} = useKYCFormContext();


	const contactStepDict: CorporateStepDict = {
		signatories: <Signatories/>,
		'proof of identity_account signatories': <ProofOfIdentity$Corporate />,
		pep: <Pep$Corporate  />,
		directors: <Directors  />,
		'beneficial owners': <BeneficialOwners  />,
		affiliations: <Affiliations />,
		'review_account signatories': <Review$Signatories$Corporate />,
	};


	return <>{contactStepDict[currentStep as CorporateStep]}</>;
};

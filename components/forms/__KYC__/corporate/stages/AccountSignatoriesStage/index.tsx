import type { CorporateStepDict } from '../../config/corporateFormConfigs';
//steps import
import { Signatories } from './steps/Signatories';
import { ProofOfIdentity$Corporate } from './steps/ProofOfIdentity$Corporate';
import { Pep$Corporate } from './steps/Pep$Corporate';
import { Directors } from './steps/Directors';
import { BeneficialOwners } from './steps/BeneficialOwner';
import { Affiliations } from './steps/Affiliations';
import { Review$Signatories$Corporate } from './steps/Review$Signatories$Corporate';
import { useAsyncAction } from '@/components/forms/utils/customHooks/useAsyncAction';
import { getCountryList } from '@/utils/vars/countries';
import Loading from '@/components/ui/Loading';
import { useKYCFormContext } from '../../../../utils/formController';
import type { CorporateStep } from '../../config/corporateFormConfigs';

export const AccountSignatoriesStage = () => {
	const {
		formNav: { currentStep },
	} = useKYCFormContext();

	const [countryList, isLoading] = useAsyncAction(getCountryList);

	const contactStepDict: CorporateStepDict = {
		signatories: <Signatories countryList={countryList} />,
		'proof of identity_account signatories': <ProofOfIdentity$Corporate />,
		pep: <Pep$Corporate countryList={countryList} />,
		directors: <Directors countryList={countryList} />,
		'beneficial owners': <BeneficialOwners countryList={countryList} />,
		affiliations: <Affiliations />,
		'review_account signatories': <Review$Signatories$Corporate />,
	};

	if (isLoading) return <Loading reveal={isLoading} />;

	return <>{contactStepDict[currentStep as CorporateStep]}</>;
};

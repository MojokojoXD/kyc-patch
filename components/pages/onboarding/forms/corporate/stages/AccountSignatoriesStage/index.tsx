import type { CorporateStepDict } from '../../config/corporateFormConfigs';
//steps import
import { Signatories } from './steps/Signatories';
import { ProofOfIdentity$Signatories } from './steps/ProofOfIdentity$Signatories';
import { Pep$Signatories } from './steps/Pep';
import { Directors } from './steps/Directors';
import { BeneficialOwners } from './steps/BeneficialOwner';
import { Affiliations } from './steps/Affiliations';
import { Review$Signatories } from './steps/Review$Signatories';
import { useAsyncAction } from '@/customHooks/useAsyncAction';
import { getCountryList } from '@/utils/vars/countries';
import Loading from '@/components/UIcomponents/Loading';
import { useKYCFormContext } from '../../../utils/formController';
import type { CorporateStep } from '../../config/corporateFormConfigs';

export const AccountSignatoriesStage = () => {
	const {
		formNav: { currentStep },
	} = useKYCFormContext() ;

	const [countryList, isLoading] = useAsyncAction(getCountryList);

	const contactStepDict: CorporateStepDict = {
		signatories: <Signatories countryList={countryList} />,
		'proof of identity_account signatories': <ProofOfIdentity$Signatories />,
		pep: <Pep$Signatories countryList={countryList} />,
		directors: <Directors countryList={countryList} />,
		'beneficial owners': <BeneficialOwners countryList={countryList} />,
		affiliations: <Affiliations />,
		'review_account signatories': <Review$Signatories />,
    };
    
    console.log('stg',countryList)
	if (isLoading) return <Loading />;

	return <>{contactStepDict[currentStep as CorporateStep]}</>;
};

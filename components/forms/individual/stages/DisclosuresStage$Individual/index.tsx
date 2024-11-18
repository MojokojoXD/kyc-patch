import { SignatureUpload } from './steps/SignatureUpload';
import { BlindDisabledRatification } from './steps/BlindDisabledRatification';
import { Pep$Individual } from './steps/Pep$Individual';
import { Fatca$Individual } from './steps/Fatca$Individual';
import { KestrelTerms$Individual } from './steps/KestrelTerms$Individual';
import { KestrelNominee$Individual } from './steps/KestrelNominee$Individual';
import { AfrinvestIndemnity$Individual } from './steps/AfrinvestIndemnity$Individual';
import { DatabankEmailIndemnity$Individual } from './steps/DatabankIndemnity$Individual';
import { SignatureMandate$Individual } from './steps/SignatureMandate$Individual';
import { AfrinvestPrivacyPolicy } from './steps/AfrinvestPrivacyPolicy';
import { Declarations$Individual } from './steps/Declarations$Individual';
import { Review$Disclosures$Individual } from './steps/Review$Disclosures$Individual';
import { useKYCFormContext } from '../../../utils/formController';
import type {
	IndividualFormMetadata,
	IndividualFormStep,
} from '../../config/individualFormMetadata';
import type { FormComponentDict } from '../../../utils/formReducer';
import { useAsyncAction } from '@/components/forms/utils/customHooks/useAsyncAction';
import { getCountryList } from '@/utils/vars/countries';
import Loading from '@/components/ui/Loading';

export const DisclosuresStage$Individual = () => {
	const { formNav } = useKYCFormContext<object, IndividualFormMetadata>();

	const [countryList, isLoading] = useAsyncAction(getCountryList);

	const disclosuresStepsDict: FormComponentDict<IndividualFormStep> = {
		'signature upload': <SignatureUpload />,
		'customer ratification': <BlindDisabledRatification />,
		pep: <Pep$Individual countryList={countryList} />,
		fatca: <Fatca$Individual countryList={countryList} />,
		'kestrel capital - terms': <KestrelTerms$Individual />,
		'kestrel capital - nominee': <KestrelNominee$Individual />,
		'afrinvest - email indemnity': <AfrinvestIndemnity$Individual />,
		'databank - email indemnity': <DatabankEmailIndemnity$Individual />,
		declarations: <Declarations$Individual />,
		'signature mandate': <SignatureMandate$Individual />,
		'afrinvest - privacy policy': <AfrinvestPrivacyPolicy />,
		review_disclosures: <Review$Disclosures$Individual />,
	};

	if (isLoading) return <Loading reveal={isLoading} />;
	return <>{disclosuresStepsDict[formNav.currentStep]}</>;
};

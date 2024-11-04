import { Personal$NOK$Individual } from './steps/Personal$NOK$Individual';
import { Contact$NOK$Individual } from './steps/Contact$NOK$Individual';
import { ProofOfIdentity$NOK$Individual } from './steps/ProofOfIdentity$NOK$Individual';
import { Review$NOK$Individual } from './steps/Review$NOK$Individual';
import type { FormComponentDict } from '../../../utils/formReducer';
import type { IndividualFormStep } from '../../config/individualFormMetadata';
import type { IndividualFormMetadata } from '../../config/individualFormMetadata';
import { useKYCFormContext } from '../../../utils/formController';
import { getCountryList } from '@/utils/vars/countries';
import { useAsyncAction } from '@/components/pages/onboarding/forms/utils/customHooks/useAsyncAction';
import Loading from '@/components/UIcomponents/Loading';

export const NextOfKinStage = () => {
	const { formNav } = useKYCFormContext<object, IndividualFormMetadata>();

	const [countryList, isloading] = useAsyncAction(getCountryList);

	const NOKStepDict: FormComponentDict<IndividualFormStep> = {
		'personal information_next of kin': (
			<Personal$NOK$Individual countryList={countryList} />
		),
		'contact details_next of kin': (
			<Contact$NOK$Individual countryList={countryList} />
		),
		'proof of identity_next of kin': <ProofOfIdentity$NOK$Individual />,
		'review_next of kin': <Review$NOK$Individual />,
	};

	return (
		<>
			<Loading reveal={isloading} />
			{NOKStepDict[formNav.currentStep]}
		</>
	);
};

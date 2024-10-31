import type { CorporateStepDict } from '../../config/corporateFormConfigs';
//steps import
import { ContactPerson } from './steps/ContactPerson';
import { ContactDetails } from './steps/ContactDetails';
import { ProofOfIdentity$Contacts } from './steps/ProofOfIdentity';
import { Review$Contacts } from './steps/Review$Contacts';
import { useAsyncAction } from '@/customHooks/useAsyncAction';
import { getCountryList } from '@/utils/vars/countries';
import Loading from '@/components/UIcomponents/Loading';
import { useKYCFormContext } from '../../../utils/formController';
import type { CorporateStep } from '../../config/corporateFormConfigs';

export const ContactsStage = () => {
	const {
		formNav: { currentStep },
	} = useKYCFormContext();

	const [countryList, isLoading] = useAsyncAction(getCountryList);

	const contactStepDict: CorporateStepDict = {
        'contact person': <ContactPerson countryList={ countryList } />,
        'address': <ContactDetails countryList={ countryList } />,
        'proof of identity_contacts': <ProofOfIdentity$Contacts />,
        'review_contacts': <Review$Contacts/>
	};

	if (isLoading) return <Loading />;

	return <>{contactStepDict[currentStep as CorporateStep]}</>;
};

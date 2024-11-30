import type { CorporateStepDict } from '../../config/corporateFormConfigs';
//steps import
import { ContactPerson } from './steps/ContactPerson';
import { ContactDetails$Corporate } from './steps/ContactDetails$Corporate';
import { ProofOfIdentity$Corporate } from './steps/ProofOfIdentity$Corporate';
import { Review$Contacts } from './steps/Review$Contacts';
import { useAsyncAction } from '@/components/forms/utils/customHooks/useAsyncAction';
import { getCountryList } from '@/utils/vars/countries';
import Loading from '@/components/ui/Loading';
import { useKYCFormContext } from '../../../../utils/formController';
import type { CorporateStep } from '../../config/corporateFormConfigs';

export const ContactsStage = () => {
	const {
		formNav: { currentStep },
	} = useKYCFormContext();

	const [countryList, isLoading] = useAsyncAction(getCountryList);

	const contactStepDict: CorporateStepDict = {
		'contact person': <ContactPerson countryList={countryList} />,
		address: <ContactDetails$Corporate countryList={countryList} />,
		'proof of identity_contacts': <ProofOfIdentity$Corporate />,
		review_contacts: <Review$Contacts />,
	};

	if (isLoading) return <Loading reveal={isLoading} />;

	return <>{contactStepDict[currentStep as CorporateStep]}</>;
};

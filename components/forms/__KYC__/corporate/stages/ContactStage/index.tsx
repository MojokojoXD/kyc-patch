import type { CorporateStepDict } from '../../config/corporateFormConfigs';
//steps import
import { ContactPerson } from './steps/ContactPerson';
import { ContactDetails$Corporate } from './steps/ContactDetails$Corporate';
import { ProofOfIdentity$Corporate } from './steps/ProofOfIdentity$Corporate';
import { Review$Contacts } from './steps/Review$Contacts';
import { useKYCFormContext } from '../../../../utils/formController';
import type { CorporateStep } from '../../config/corporateFormConfigs';

export const ContactsStage = () => {
	const {
		formNav: { currentStep },
	} = useKYCFormContext();


	const contactStepDict: CorporateStepDict = {
		'contact person': <ContactPerson/>,
		address: <ContactDetails$Corporate />,
		'proof of identity_contacts': <ProofOfIdentity$Corporate />,
		review_contacts: <Review$Contacts />,
	};

	return <>{contactStepDict[currentStep as CorporateStep]}</>;
};

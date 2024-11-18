import { RetailClient } from './steps/RetailClient';
import { InvestmentCategory } from './steps/InvestmentCategory';
import { BiographicalInfo } from './steps/BiographicalInfo';
import { ContactDetail$Individual } from './steps/ContactDetails$Individual';
import { EmploymentInfo } from './steps/EmploymentInfo';
import { BankDetails$Individual } from './steps/BankDetails$Individual';
import { ProofOfIdentity$Individual } from './steps/ProofOfIdentity$Individual';
import { RiskProfile$Individual } from './steps/RiskProfile$Individual';
import { Review$Personal$Individual } from './steps/Review$Personal$Individual';
import { useKYCFormContext } from '../../../utils/formController';
import { useAsyncAction } from '@/components/forms/utils/customHooks/useAsyncAction';
import { getCountryList } from '@/utils/vars/countries';
import Loading from '@/components/ui/Loading';
import type {
	IndividualFormMetadata,
	IndividualFormStep,
} from '../../config/individualFormMetadata';
import type { FormComponentDict } from '../../../utils/formReducer';

export const PersonalInfoStage = () => {
	const { formNav } = useKYCFormContext<object, IndividualFormMetadata>();

	const [countryList, isLoading] = useAsyncAction(getCountryList);

	const personalStepDict: FormComponentDict<IndividualFormStep> = {
		'retail client': <RetailClient />,
		'category of investment': <InvestmentCategory />,
		'personal information_personal': (
			<BiographicalInfo countryList={countryList} />
		),
		'contact details_personal': (
			<ContactDetail$Individual countryList={countryList} />
		),
		'employment information': <EmploymentInfo countryList={countryList} />,
		'settlement bank account': (
			<BankDetails$Individual countryList={countryList} />
		),
		'proof of identity_personal': <ProofOfIdentity$Individual />,
		'investment & risk profile': <RiskProfile$Individual />,
		review_personal: <Review$Personal$Individual />,
	};

	return (
		<>
			<Loading reveal={isLoading} />
			{personalStepDict[formNav.currentStep]}
		</>
	);
};

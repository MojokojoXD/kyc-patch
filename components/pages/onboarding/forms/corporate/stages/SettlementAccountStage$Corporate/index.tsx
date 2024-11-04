import type { CorporateStepDict } from '../../config/corporateFormConfigs';
//steps import
import { BankDetails$Corporate } from './steps/BankDetails$Corporate';
import { AccountActivity } from './steps/AccountActivity';
import { RiskProfile$Corporate } from './steps/RiskProfile$Corporate';
import { Statements } from './steps/Statements';
import { Review$Settlement } from './steps/Review$Settlement';
import { useAsyncAction } from '@/components/pages/onboarding/forms/utils/customHooks/useAsyncAction';
import { getCountryList } from '@/utils/vars/countries';
import Loading from '@/components/UIcomponents/Loading';
import { useKYCFormContext } from '../../../utils/formController';
import type { CorporateStep } from '../../config/corporateFormConfigs';

export const SettlementAccountStage$Corporate = () => {
	const {
		formNav: { currentStep },
	} = useKYCFormContext();

	const [countryList, isLoading] = useAsyncAction(getCountryList);

	const contactStepDict: CorporateStepDict = {
		'account details': <BankDetails$Corporate countryList={countryList} />,
		'account activity': <AccountActivity />,
		'risk profile': <RiskProfile$Corporate />,
		statements: <Statements />,
		'review_settlement account': <Review$Settlement />,
	};

    if ( isLoading ) return <Loading reveal={ isLoading } />;

	return <>{contactStepDict[currentStep as CorporateStep]}</>;
};

import { useKYCFormContext } from '@/components/forms/utils/formController';
import { CategoryOfBusiness } from './CategoryOfBusiness';
import { CategoryOfInvestment } from './CategoryOfInvestments';
import { CompanyDetails } from './CompanyDetails';
import { Incorporation } from './Incorporation';
import { Review$Business } from './Review$Business';
import { useAsyncAction } from '@/components/forms/utils/customHooks/useAsyncAction';
import { getCountryList } from '@/utils/vars/countries';
import Loading from '@/components/ui/Loading';
import { CorporateStepDict } from '../../../config/corporateFormConfigs';
import type { CorporateStep } from '../../../config/corporateFormConfigs';

export const BusinessStage = () => {
	const {
		formNav: { currentStep },
	} = useKYCFormContext();

	const [countryList, isLoading] = useAsyncAction(getCountryList);

	const businessStepDict: CorporateStepDict = {
		'category of business': <CategoryOfBusiness />,
		'category of investments': <CategoryOfInvestment />,
		'company details': <CompanyDetails countryList={countryList} />,
		'proof of incorporation': <Incorporation countryList={countryList} />,
		review_business: <Review$Business />,
	};

	if (isLoading) return <Loading reveal={isLoading} />;

	return <>{businessStepDict[currentStep as CorporateStep]}</>;
};

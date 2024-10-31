import { useKYCFormContext } from '../../../../utils/formController';
import { CategoryOfBusiness } from './CategoryOfBusiness';
import { CategoryOfInvestment } from './CategoryOfInvestments';
import { CompanyDetails } from './CompanyDetails';
import { Incorporation } from './Incorporation';
import { BusinessReview } from './BusinessReview';
import { useAsyncAction } from '@/customHooks/useAsyncAction';
import { getCountryList } from '@/utils/vars/countries';
import Loading from '@/components/UIcomponents/Loading';
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
		'review_business': <BusinessReview />,
	};

	if (isLoading) return <Loading />;

	return <>{businessStepDict[currentStep as CorporateStep]}</>;
};

import { useKYCFormContext } from '@/components/forms/utils/formController';
import { CategoryOfBusiness } from './CategoryOfBusiness';
import { CategoryOfInvestment } from './CategoryOfInvestments';
import { CompanyDetails } from './CompanyDetails';
import { Incorporation } from './Incorporation';
import { Review$Business } from './Review$Business';
import { CorporateStepDict } from '../../../config/corporateFormConfigs';
import type { CorporateStep } from '../../../config/corporateFormConfigs';

export const BusinessStage = () => {
	const {
		formNav: { currentStep },
	} = useKYCFormContext();


	const businessStepDict: CorporateStepDict = {
		'category of business': <CategoryOfBusiness />,
		'category of investments': <CategoryOfInvestment />,
		'company details': <CompanyDetails />,
		'proof of incorporation': <Incorporation/>,
		review_business: <Review$Business />,
	};


	return <>{businessStepDict[currentStep as CorporateStep]}</>;
};

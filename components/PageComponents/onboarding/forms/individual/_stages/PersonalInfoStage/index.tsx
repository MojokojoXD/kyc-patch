import { RetailClient } from './_steps/RetailClient';
import { InvestmentCategory } from './_steps/InvestmentCategory';
import { BiographicalInfo } from './_steps/BiographicalInfo';
import { Contacts } from './_steps/Contacts';
import { EmploymentInfo } from './_steps/EmploymentInfo';
import { BankAccountInfo } from './_steps/BankAccountInfo';
import { IdentityProofInfo } from './_steps/IdentityProof';
import { RiskProfile } from './_steps/RiskProfile';
import { Review } from './_steps/Review';
// import CustomProgress from '@/components/UIcomponents/CompoundUI/CustomProgress';
import { FormStage } from '@/types/Components/onboarding';



export const PersonalInformation: FormStage = ({
	step,
	renderStep,
}) => {
	const getStageStep = () => {
		switch (step) {
			case 'retail client':
				return RetailClient;
			case 'category of investment':
				return InvestmentCategory;
			case 'personal information_personal':
				return BiographicalInfo;
			case 'contact details_personal':
				return Contacts;
			case 'employment information':
				return EmploymentInfo;
			case 'settlement bank account':
				return BankAccountInfo;
			case 'proof of identity_personal':
				return IdentityProofInfo;
			case 'investment & risk profile':
				return RiskProfile;
			case 'review_personal':
				return Review;
			default:
				throw new Error('step ' + step + ' is not supported');
		}
	};

	const StepComponent = getStageStep();

	return (
		<>
			<div className='flex flex-col grow'>
				{renderStep(StepComponent)}
			</div>
		</>
	);
};

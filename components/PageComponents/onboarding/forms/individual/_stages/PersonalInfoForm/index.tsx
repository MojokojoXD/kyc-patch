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
	const getStageStep = (stepName: Steps) => {
		switch (stepName) {
			case 'retail client':
				return RetailClient;
			case 'category of investment':
				return InvestmentCategory;
			case 'personal information':
				return BiographicalInfo;
			case 'contact details':
				return Contacts;
			case 'employment information':
				return EmploymentInfo;
			case 'settlement bank account':
				return BankAccountInfo;
			case 'proof of identity':
				return IdentityProofInfo;
			case 'investment & risk profile':
				return RiskProfile;
			case 'review':
				return Review;
			default:
				throw new Error('step ' + step + ' is not supported');
		}
	};

	const StepComponent = getStageStep(step);

	return (
		<>
			{/* <CustomProgress
				maxSteps={personalFormStepsMetadata.length}
				currentStep={currentStep}
			/> */}
			<div className='flex flex-col grow'>
				{renderStep(StepComponent)}
			</div>
		</>
	);
};

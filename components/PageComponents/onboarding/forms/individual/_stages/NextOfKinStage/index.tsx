// import CustomProgress from '@/components/UIcomponents/CompoundUI/CustomProgress';
import { FormStage } from '@/types/Components/onboarding';
import { NextOfKinBio } from './_steps/NextOfKin_Bio';
import { NextOfKinContacts } from './_steps/NextOfKin_Contact';
import { NextOfKin_IdentityProof } from './_steps/NextOfKin_IdentityProof';
import { NextOfKinReview } from './_steps/NextOfKinReview';

export const NextOfKinStage: FormStage = ({
	step,
	renderStep,
}) => {
	const getStageStep = () => {
		switch (step) {
			case 'personal information_next of kin':
				return NextOfKinBio;
			case 'contact details_next of kin':
				return NextOfKinContacts;
			case 'proof of identity_next of kin':
				return NextOfKin_IdentityProof;
			case 'review_next of kin':
				return NextOfKinReview;
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

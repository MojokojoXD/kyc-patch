import { SignatureUpload } from './_steps/SignatureUpload';
import { BlindDisabledRatification } from './_steps/BlindDisabledRatification';
import { Pep } from './_steps/Pep';
import { Fatca } from './_steps/Fatca';
import { KestrelTerms } from './_steps/KestrelTerms';
import { KestrelNominee } from './_steps/KestrelNominee';
import { AfrinvestEmailIndemnity } from './_steps/AfrinvestEmailIndemnity';
import { SignatureMandate } from './_steps/SignatureMandate';
import { AfrinvestPrivacyPolicy } from './_steps/AfrinvestPrivacyPolicy';
import { Declarations } from './_steps/Declarations';
import { DisclosuresReview } from './_steps/DisclosuresReview';
import type { FormStage } from '@/types/Components/onboarding';

export const Disclosures: FormStage = ({ renderStep, step }) => {
	const getStageStep = () => {
		switch (step) {
			case 'signature upload':
				return SignatureUpload;
			case 'customer ratification':
				return BlindDisabledRatification;
			case 'pep':
				return Pep;
			case 'fatca':
				return Fatca;
			case 'kestrel capital - terms':
				return KestrelTerms;
			case 'kestrel capital - nominee':
				return KestrelNominee;
			case 'afrinvest - email indemnity':
				return AfrinvestEmailIndemnity;
			case 'declarations':
				return Declarations;
			case 'signature mandate':
				return SignatureMandate;
			case 'afrinvest - privacy policy':
				return AfrinvestPrivacyPolicy;
			case 'review_disclosures':
					return DisclosuresReview;
			default:
				throw new Error('step ' + step + ' is not supported');
		}
	};

	const stepComponent = getStageStep();

	return (
		<>
			{/* <CustomProgress
				maxSteps={disclosuresStepsMetadata.length}
				currentStep={currentStep}
			/> */}
			<div className='flex flex-col grow'>
				{renderStep(stepComponent)}
			</div>
		</>
	);
};

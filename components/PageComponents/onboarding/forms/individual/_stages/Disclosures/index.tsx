import { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/UIcomponents/ui/button';
import { DisclosuresSteps } from '@/utils/vars/enums';
import SignatureUpload from './_steps/SignatureUpload';
import BlindDisabledRatification from './_steps/BlindDisabledRatification';
import Pep from './_steps/Pep';
import Fatca from './_steps/Fatca';
import KestrelTerms from './_steps/KestrelTerms';
import KestrelNominee from './_steps/KestrelNominee';
import AfrinvestEmailEndemnity from './_steps/AfrinvestEmailEndemnity';
import AfrinvestPrivacyPolicy from './_steps/AfrinvestPrivacyPolicy';
import Declarations from './_steps/Declarations';
import DisclosuresReview from './_steps/Review';
import type { Country } from '@/types/forms/universal';
import disclosuresStepsMetadata from './_steps/Review/stageReviewMetadata';
import CustomProgress from '@/components/UIcomponents/CompoundUI/CustomProgress';

interface DisclosuresProps {
	nextStage: () => void;
	prevStage: () => void;
	countryList: Country[];
}

export default function Disclosures({
	nextStage,
	prevStage,
	countryList,
}: DisclosuresProps) {
	const [currentStep, setCurrentStep] = useState<DisclosuresSteps>(
		DisclosuresSteps.SIGNATURE_UPLOAD
	);

	const prevStepCache = useRef<DisclosuresSteps | null>(null);

	const handleNextStep = useCallback(
		(forceStep?: DisclosuresSteps, returnStep?: DisclosuresSteps) => {
			if (prevStepCache.current) {
				const temp = prevStepCache.current;
				prevStepCache.current = null;
				setCurrentStep(temp);
				return;
			}

			if (forceStep) {
				prevStepCache.current = returnStep ? returnStep : null;
				setCurrentStep(forceStep);
				return;
			}

			if (currentStep !== DisclosuresSteps.REVIEW) {
				setCurrentStep((prevStep) => prevStep + 1);
				return;
			}

			nextStage();
		},
		[setCurrentStep, currentStep, prevStepCache, nextStage]
	);

	const handlePrevStep = useCallback(() => {
		if (currentStep > DisclosuresSteps.SIGNATURE_UPLOAD) {
			setCurrentStep((prevStep) => prevStep - 1);
			return;
		}

		prevStage();
	}, [currentStep, setCurrentStep, prevStage]);

	const getStageStep = (step: DisclosuresSteps) => {
		switch (step) {
			case DisclosuresSteps.SIGNATURE_UPLOAD:
				return <SignatureUpload />;
			case DisclosuresSteps.BLIND_ILLITERATE:
				return <BlindDisabledRatification />;
			case DisclosuresSteps.PEP:
				return <Pep countryList={countryList} />;
			case DisclosuresSteps.FATCA:
				return <Fatca countryList={countryList} />;
			case DisclosuresSteps.KESTREL_TERMS:
				return <KestrelTerms />;
			case DisclosuresSteps.KESTREL_NOMINEE_AGREEMENT:
				return <KestrelNominee />;
			case DisclosuresSteps.AFRIVEST_EMAIL_INDEMNITY:
				return <AfrinvestEmailEndemnity />;
			case DisclosuresSteps.DECLARATIONS:
				return <Declarations />;
			case DisclosuresSteps.AFRIVEST_PRIVACY_POLICY:
				return <AfrinvestPrivacyPolicy />;
			case DisclosuresSteps.REVIEW:
				return <DisclosuresReview jumpToStep={handleNextStep} />;
			default:
				throw new Error('step ' + step + ' is not supported');
		}
	};

	return (
		<>
			<CustomProgress
				maxSteps={disclosuresStepsMetadata.length}
				currentStep={currentStep}
            />
            <div className='row-span-5 flex flex-col grow'>
                {getStageStep(currentStep)}
            </div>
			<div className='flex items-center justify-end px-10 space-x-2 h-32'>
				<Button
					type='button'
					variant={'outline'}
					onClick={() => handlePrevStep()}>
					Go Back
				</Button>
				<Button
					type='button'
					onClick={() => handleNextStep()}>
					Continue
				</Button>
			</div>
		</>
	);
}
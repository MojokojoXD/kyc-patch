import { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/UIcomponents/ui/button';
import SignatureUpload from './_steps/SignatureUpload';
import BlindDisabledRatification from './_steps/BlindDisabledRatification';
import Pep from './_steps/Pep';
import Fatca from './_steps/Fatca';
import KestrelTerms from './_steps/KestrelTerms';
import KestrelNominee from './_steps/KestrelNominee';
import AfrinvestEmailEndemnity from './_steps/AfrinvestEmailEndemnity';
import AfrinvestPrivacyPolicy from './_steps/AfrinvestPrivacyPolicy';
import Declarations from './_steps/Declarations';
import CustomProgress from '@/components/UIcomponents/CompoundUI/CustomProgress';
import { useFormContext } from 'react-hook-form';
import type { IndividualFormSchema } from '@/types/forms/individual';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import type { FormStage } from '@/types/Components/onboarding';

export const DisclosuresSteps = {
	SIGNATURE_UPLOAD: 1,
	BLIND_ILLITERATE: 2,
	PEP: 3,
	FATCA: 4,
	KESTREL_TERMS: 5,
	KESTREL_NOMINEE_AGREEMENT: 6,
	AFRINVEST_EMAIL_INDEMNITY: 7,
	DECLARATIONS: 8,
	AFRINVEST_PRIVACY_POLICY: 9,
	REVIEW: 10,
} as const;

type DisclosuresSteps = typeof DisclosuresSteps;

export const Disclosures: FormStage = ({
    renderStep,
    currentStepIndex
}) => {
	const [currentStep, setCurrentStep] = useState<DisclosuresSteps>(
		DisclosuresSteps.SIGNATURE_UPLOAD
	);
	const [setIsValidating] = useState<boolean>(false);
	const { getValues, trigger } =
		useFormContext<IndividualFormSchema>();

	const prevStepCache = useRef<DisclosuresSteps | null>(null);

	const handleNextStep = useCallback(
		async (
			forceStep?: DisclosuresSteps,
			returnStep?: DisclosuresSteps
		) => {
			const currentStepMetadata = disclosuresStepsMetadata.find(
				(m) => m.step === currentStep
			);

			setIsValidating(true);

			const numberOfApplicants = getValues(`applicant`).length;

			const fieldsToValidate = FormHelpers.generateAllStepFields(
				currentStepMetadata,
				numberOfApplicants
			);

			//@ts-expect-error Unable to profile literal type for fieldsToValidate and trigger method name param
			const isValid = await trigger(fieldsToValidate, {
				shouldFocus: true,
			});

			if (prevStepCache.current && isValid) {
				const temp = prevStepCache.current;
				prevStepCache.current = null;
				setCurrentStep(temp);
				setIsValidating(false);

				return;
			}

			if (forceStep) {
				prevStepCache.current = returnStep ? returnStep : null;
				setCurrentStep(forceStep);
				return;
			}

			if (currentStep !== DisclosuresSteps.REVIEW && isValid) {
				setCurrentStep((prevStep) => prevStep + 1);
				return;
			}

			isValid && nextStage();
		},
		[
			setCurrentStep,
			currentStep,
			prevStepCache,
			nextStage,
			trigger,
			getValues,
			setIsValidating,
		]
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
			case DisclosuresSteps.AFRINVEST_EMAIL_INDEMNITY:
				return <AfrinvestEmailEndemnity />;
			case DisclosuresSteps.DECLARATIONS:
				return <Declarations />;
			case DisclosuresSteps.AFRINVEST_PRIVACY_POLICY:
				return <AfrinvestPrivacyPolicy />;
			case DisclosuresSteps.REVIEW:
				return <></>;
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
			<div className='flex flex-col grow'>
				{renderStep(
					{
						step: currentStep,
						finalStep: DisclosuresSteps.REVIEW,
					},
					getStageStep(currentStep)
				)}
			</div>
			<div className='flex items-center justify-end px-10 space-x-2 pb-16 pt-5 grow-0 bg-white'>
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
};

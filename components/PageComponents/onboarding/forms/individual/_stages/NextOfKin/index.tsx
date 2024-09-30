import { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/UIcomponents/ui/button';
import NextOfKinBio from './_steps/NextOfKin_Bio';
import NextOfKinContacts from './_steps/NextOfKin_Contact';
import NextOfKin_IdentityProof from './_steps/NextOfKin_IdentityProof';
import NextofKin_Review from './_steps/Review';
import type { Country } from '@/types/forms/universal';
import { NextOfKinSteps } from '@/utils/vars/enums';
import nextOfKinStepsMetadata from './_steps/Review/stageReviewMetadata';
import CustomProgress from '@/components/UIcomponents/CompoundUI/CustomProgress';
import { useFormContext } from 'react-hook-form';
import type { IndividualFormSchema } from '@/types/forms/individual';
import { FormHelpers } from '@/utils/clientActions/formHelpers';

interface NextOfKinProps {
	nextStage: () => void;
	prevStage: () => void;
	countryList: Country[];
}

export default function NextOfKin({
	nextStage,
	prevStage,
	countryList,
}: NextOfKinProps) {
	const { getValues, trigger } = useFormContext<IndividualFormSchema>();
	const [currentStep, setCurrentStep] = useState<NextOfKinSteps>(
		NextOfKinSteps.CONTACT
	);
	const [isValidating, setIsValidating] = useState<boolean>(false);

	const prevStepCache = useRef<NextOfKinSteps | null>(null);

	const handleNextStep = useCallback(
		async(forceStep?: NextOfKinSteps, returnStep?: NextOfKinSteps) => {
			const currentStepMetadata = nextOfKinStepsMetadata.find(
				(m) => m.step === currentStep
			);

			setIsValidating(true);

			const numberOfApplicants = getValues(`applicant`).length;

			const fieldsToValidate = FormHelpers.generateAllStepFields(
				currentStepMetadata,
				numberOfApplicants
			);

			//@ts-expect-error Unable to profile literal type for fieldsToValidate and trigger method name param
			const isValid = await trigger(fieldsToValidate, { shouldFocus: true });

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
				setIsValidating(false);

				return;
			}

			if ((currentStep !== NextOfKinSteps.REVIEW) && isValid) {
				setCurrentStep((prevStep) => prevStep + 1);
				setIsValidating(false);

				return;
			}

			isValid && nextStage();
			setIsValidating(false);
		},
		[setCurrentStep, currentStep, prevStepCache, nextStage]
	);

	const handlePrevStep = useCallback(() => {
		if (currentStep > NextOfKinSteps.BIO) {
			setCurrentStep((prevStep) => prevStep - 1);
			return;
		}

		prevStage();
	}, [currentStep, setCurrentStep, prevStage]);

	const getStageStep = (step: NextOfKinSteps) => {
		switch (step) {
			case NextOfKinSteps.BIO:
				return <NextOfKinBio countryList={countryList} />;
			case NextOfKinSteps.CONTACT:
				return <NextOfKinContacts countryList={countryList} />;
			case NextOfKinSteps.PROOF_OF_IDENTITY:
				return <NextOfKin_IdentityProof />;
			case NextOfKinSteps.REVIEW:
				return <NextofKin_Review jumpToStep={handleNextStep} />;
			default:
				throw new Error('step ' + step + ' is not supported');
		}
	};

	return (
		<>
			<CustomProgress
				maxSteps={nextOfKinStepsMetadata.length}
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

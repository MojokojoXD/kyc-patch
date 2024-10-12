import { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/UIcomponents/ui/button';
import { RetailClient } from './_steps/RetailClient';
import { InvestmentCategory } from './_steps/InvestmentCategory';
import { BiographicalInfo } from './_steps/BiographicalInfo';
import { Contacts } from './_steps/Contacts';
import { EmploymentInfo } from './_steps/EmploymentInfo';
import { BankAccountInfo } from './_steps/BankAccountInfo';
import { IdentityProofInfo } from './_steps/IdentityProof';
import { RiskProfile } from './_steps/RiskProfile';
import { Review } from './_steps/Review';
// import { PersonalInformationSteps } from '@/utils/vars/enums';
// import { BASE_URL } from '@/utils/vars/uri';
import personalFormStepsMetadata from './_steps/Review/stageReviewMetaData';
import CustomProgress from '@/components/UIcomponents/CompoundUI/CustomProgress';
import { IndividualFormSchema } from '@/types/forms/individual';
import { useFormContext } from 'react-hook-form';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import { LoaderCircle } from 'lucide-react';
import { FormStage } from '@/types/Components/onboarding';

//Bank list uri
// const BANK_LIST_URL = BASE_URL + '/kyc/lov/banks';

export const PersonalInformationSteps = {
	RETAIL_CLIENT: 1,
	INVESTMENT_CAT: 2,
	BIO: 3,
	CONTACT_INFO: 4,
	EMPLOYMENT_INFO: 5,
	BANK_INFO: 6,
	IDENTITY_PROOF: 7,
	RISK_PROFILE: 8,
	REVIEW: 9,
} as const;

type PersonalInformationSteps = typeof PersonalInformationSteps;

export const PersonalInformation: FormStage<
	PersonalInformationSteps
> = ({ nextStage, prevStage, renderStep }) => {
	const [currentStep, setCurrentStep] =
		useState<PersonalInformationSteps>(
			PersonalInformationSteps.IDENTITY_PROOF
		);

	const [isValidating, setIsValidating] = useState<boolean>(false);
	const { getValues, trigger } =
		useFormContext<IndividualFormSchema>();

	const prevStepCache = useRef<PersonalInformationSteps | null>(null);

	const handleNextStep = useCallback(
		async (
			forceStep?: PersonalInformationSteps,
			returnStep?: PersonalInformationSteps
		) => {
			const currentStepMetadata = personalFormStepsMetadata.find(
				(m) => m.step === currentStep
			);

			setIsValidating(true);

			const numberOfApplicants = 1;

			console.log(getValues());

			const fieldsToValidate = FormHelpers.generateAllStepFields(
				currentStepMetadata,
				numberOfApplicants
			);

			//@ts-expect-error Unable to profile literal type for fieldsToValidate and trigger method
			const isValid =
				true || (await trigger(fieldsToValidate, { shouldFocus: true }));

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

			if (currentStep !== PersonalInformationSteps.REVIEW && isValid) {
				setCurrentStep((prevStep) => prevStep + 1);
				setIsValidating(false);

				return;
			}

			isValid && nextStage();
			setIsValidating(false);
		},
		[
			setCurrentStep,
			currentStep,
			prevStepCache,
			nextStage,
			getValues,
			trigger,
		]
	);

	const handlePrevStep = useCallback(() => {
		if (currentStep > PersonalInformationSteps.RETAIL_CLIENT) {
			setCurrentStep((prevStep) => prevStep - 1);
			return;
		}

		prevStage();
	}, [currentStep, setCurrentStep, prevStage]);

	const getStageStep = (step: PersonalInformationSteps) => {
		switch (step) {
			case PersonalInformationSteps.RETAIL_CLIENT:
				return RetailClient;
			case PersonalInformationSteps.INVESTMENT_CAT:
				return InvestmentCategory;
			case PersonalInformationSteps.BIO:
				return BiographicalInfo;
			case PersonalInformationSteps.CONTACT_INFO:
				return Contacts;
			case PersonalInformationSteps.EMPLOYMENT_INFO:
				return EmploymentInfo;
			case PersonalInformationSteps.BANK_INFO:
				return BankAccountInfo;
			case PersonalInformationSteps.IDENTITY_PROOF:
				return IdentityProofInfo;
			case PersonalInformationSteps.RISK_PROFILE:
				return RiskProfile;
			case PersonalInformationSteps.REVIEW:
				return Review;
			default:
				throw new Error('step ' + step + ' is not supported');
		}
	};

	// if (error) {
	// 	console.log(error);
	// 	return <p className='p-10'>Something went wrong! Try again later.</p>;
	// }

	return (
		<>
			<CustomProgress
				maxSteps={personalFormStepsMetadata.length}
				currentStep={currentStep}
			/>
			<div className='flex flex-col grow'>
				{renderStep(
					{
						step: currentStep,
						finalStep: PersonalInformationSteps.REVIEW,
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
					disabled={isValidating}
					onClick={() => handleNextStep()}>
					{isValidating ? (
						<LoaderCircle className='w-5 h-5 animate-spin' />
					) : (
						'Save & Continue'
					)}
				</Button>
			</div>
		</>
	);
};

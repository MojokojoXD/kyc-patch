import { useState,useCallback,useRef } from 'react';
import { Button } from '@/components/UIcomponents/ui/button';
import NextOfKinBio from './_steps/NextOfKin_Bio';
import NextOfKinContacts from './_steps/NextOfKin_Contact';
import NextOfKin_IdentityProof from './_steps/NextOfKin_IdentityProof';
import NextofKin_Review from './_steps/Review'
import type { Country } from '@/types/forms/universal';
import { NextOfKinSteps } from '@/utils/vars/enums';
import nextOfKinStepsMetadata from './_steps/Review/stageReviewMetadata';
import CustomProgress from '@/components/UIcomponents/CompoundUI/CustomProgress';


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
    const [ currentStep, setCurrentStep ] = useState<NextOfKinSteps>(
        NextOfKinSteps.BIO
    );

    const prevStepCache = useRef<NextOfKinSteps | null>( null );
    
    const handleNextStep = useCallback( (
        forceStep?: NextOfKinSteps,
        returnStep?: NextOfKinSteps) =>
    {
		
        if ( prevStepCache.current )
        {
            const temp = prevStepCache.current;
            prevStepCache.current = null;
            setCurrentStep( temp );
            return;
        }


        if ( forceStep )
        {
            prevStepCache.current = returnStep ? returnStep : null;
            setCurrentStep( forceStep );
            return;
        }
        
        if ( currentStep !== NextOfKinSteps.REVIEW )
        {
			setCurrentStep((prevStep) => prevStep + 1);
			return;
		}

		nextStage();
	},[setCurrentStep,currentStep,prevStepCache,nextStage]);

	const handlePrevStep = useCallback( () => {
		if (currentStep > NextOfKinSteps.BIO) {
			setCurrentStep((prevStep) => prevStep - 1);
			return;
		}

		prevStage();
	},[currentStep,setCurrentStep, prevStage]);

	const getStageStep = (step: NextOfKinSteps) => {
		switch (step) {
			case NextOfKinSteps.BIO:
                return <NextOfKinBio countryList={ countryList } />;
			case NextOfKinSteps.CONTACT:
                return <NextOfKinContacts countryList={ countryList }/>;
			case NextOfKinSteps.PROOF_OF_IDENTITY:
				return <NextOfKin_IdentityProof/>;
			case NextOfKinSteps.REVIEW:
				return <NextofKin_Review jumpToStep={handleNextStep}/>;
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

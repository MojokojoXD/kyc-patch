import {
	FormTitle,
	FormHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import CustomProgress from '@/components/UIcomponents/CompoundUI/CustomProgress';
import type { FormStage } from '@/types/Components/onboarding';

export const IndividualFormIntro: FormStage = ( { renderStep } ) =>
{   
	return (
        <>
            {renderStep( null )}
            <div className='flex flex-col'>
                <FormHeader>
                    <FormTitle>KYC Verification</FormTitle>
                </FormHeader>
                <FormContent >
                    <CustomProgress disable maxSteps={1} currentStep={0}/>
                    <div className='max-w-prose paragraph2Medium text-neutral-700 grow space-y-1.5'>
                        <p>
                            Kindly comply with regulations and help us secure our platform and
                            users with our quick and easy verification process. Some questions
                            may be jurisdiction specific and may not apply to you, if so, please
                            enter <strong>&apos;NA&apos;</strong> and proceed to the next
                            question.
                        </p>
                        <p>
                            Since SecondSTAX doesn&apos;t keep your data, please ensure you use
                            the same browser to complete your application and submit your
                            documents. See details of the application below:
                        </p>
                    </div>
                </FormContent>
            </div>
		</>
	);
}

import {
	FormTitle,
	FormHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
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
                    <div className='max-w-prose paragraph2Medium text-neutral-700 grow space-y-1.5'>
                        <p>
                        Please comply with regulations and help us secure our application and users with our simple verification process. Some questions are jurisdiction specific and may not apply to you, if so, enter &apos;<strong>NA</strong>&apos; and proceed to the next question.
                        </p>
                        <p>
                        Since SecondSTAX doesn&apos;t keep your data, please ensure you use the same browser to complete your application and submit your documents. The progress bar on the left will guide you through the application process. When you’re ready, click “Begin Process” to start.
                        </p>
                    </div>
                </FormContent>
            </div>
		</>
	);
}

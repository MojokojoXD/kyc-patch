import {
	FormTitle,
	FormHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import { Button } from '@/components/UIcomponents/ui/button';
import CustomProgress from '@/components/UIcomponents/CompoundUI/CustomProgress';

interface IndividualFormIntroProps {
	nextStage: () => void;
}

export default function IndividualFormIntro({
	nextStage,
}: IndividualFormIntroProps) {
	return (
        <>
            <div className='flex flex-col'>

                <FormHeader>
                    <FormTitle>KYC Verification</FormTitle>
                </FormHeader>
                <FormContent className=''>
                    <CustomProgress disable maxSteps={1} currentStep={0}/>
                    <div className='max-w-prose leading-relaxed overflow-y-scroll text-base font-normal my-5 text-neutral-700 p-5 grow space-y-3'>
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
                    <div className='flex items-center justify-end px-10 space-x-2 h-32'>
                        <Button
                            type='button'
                            onClick={() => nextStage()}>
                            Begin Process
                        </Button>
                    </div>
                </FormContent>
            </div>
		</>
	);
}

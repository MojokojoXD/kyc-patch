import { useForm } from 'react-hook-form';
import { useState, useCallback } from 'react';
import type { IndividualFormSchema } from '@/types/forms/individual';
import { Form } from '@/components/UIcomponents/ui/form';
import { IndividualFormIntro } from '@/components/PageComponents/onboarding/forms/individual/_stages/IndividualFormIntro';
import { PersonalInformation } from '@/components/PageComponents/onboarding/forms/individual/_stages/PersonalInfoForm';
import { NextOfKin } from '@/components/PageComponents/onboarding/forms/individual/_stages/NextOfKin';
import { Disclosures } from '@/components/PageComponents/onboarding/forms/individual/_stages/Disclosures';
import FormProgressSheet from '@/components/UIcomponents/CompoundUI/FormProgressSheet';
import Loading from '@/components/UIcomponents/Loading';
import { FormLayout } from '@/components/UIcomponents/FormLayout';
// import { UserContext } from '@/Contexts/UserProfileProvider';
import { useAsyncAction } from '@/customHooks/useAsyncAction';
import { useCloseTabWarning } from '@/customHooks/useCloseTabWarning';
import { getCountryList } from '@/utils/vars/countries';
import { Button } from '@/components/UIcomponents/ui/button';
// import { LoaderCircle } from 'lucide-react';

//Form meta data for navigation components
const individualFormMetadata = [
	{
		name: 'Introduction',
		steps: ['intro'],
	},
	{
		name: 'Personal',
		steps: [
			'retail client',
			'category of investment',
			'personal information',
			'contact details',
			'employment information',
			'settlement bank account',
			'proof of identity',
			'investment & risk profile',
			'review',
		],
	},
	{
		name: 'Next of Kin',
		steps: [],
	},
	{
		name: 'Disclosures',
		steps: [],
	},
	{
		name: 'Document Checklist',
		steps: [],
	},
] as const;

export type FormMetadata = (typeof individualFormMetadata)[number];

export default function KYCIndividualFormPage() {
	//state management
	const [currentStageIndex, setCurrentStageIndex] = useState(0);
	const [currentStepIndex, setCurrentStepIndex] = useState(0);

	// const userProgress = useRef<IndividualFormStages>(currentStageIndex);

	const form = useForm<IndividualFormSchema>({
		defaultValues: {
			_formMetadata: {
				applicantCount: 1,
				applicant: [
					{
						signatureFileName: '',
						kestrelSignatureFileName: '',
					},
				],
			},
		},
		mode: 'onChange',
	});

	const {
		watch,
		formState: { isDirty },
	} = form;

	//will relocate later

	//variables used by stage steps
	const applicantCount = watch(`_formMetadata.applicantCount`);
	// const appWideContext = useContext(UserContext);

	useCloseTabWarning(isDirty);
	const [countryList, loading, error] = useAsyncAction(getCountryList);

	//Form navigation methods
	const next = useCallback(async () => {
		const stagesCount = individualFormMetadata.length;
		const stepsCount =
			individualFormMetadata[currentStageIndex].steps.length;

		if (
			currentStageIndex < stagesCount - 1 &&
			currentStepIndex < stepsCount - 1
		) {
			setCurrentStepIndex((prevStep) => prevStep + 1);
			return;
		}

		setCurrentStageIndex((prevStage) => prevStage + 1);
	}, [setCurrentStepIndex, currentStageIndex, currentStepIndex]);

	const prev = useCallback(() => {
		if (currentStepIndex > 0) {
			setCurrentStepIndex((step) => step - 1);
			return;
		}

		currentStageIndex !== 0 &&
			setCurrentStageIndex((stage) => stage - 1);
	}, [currentStepIndex, currentStageIndex]);

	const jumpToStep = (stage: number, step: number) => {
		if (stage < 0 || stage >= individualFormMetadata.length) {
			throw new ('stage ' + stage + ' is out of range')();
		}

		if (
			step < 0 ||
			step >= individualFormMetadata[currentStageIndex].steps.length
		) {
			throw new ('step ' + step + ' is out of range')();
		}

		setCurrentStageIndex(stage);
		setCurrentStepIndex(step);
	};

	//Form stage selector
	const getFormStage = (stage: FormMetadata) => {
		switch (stage.name) {
			case 'Introduction':
				return IndividualFormIntro;
			case 'Personal':
				return PersonalInformation;
			case 'Next of Kin':
				return NextOfKin;
			case 'Disclosures':
				return Disclosures;
			case 'Document Checklist':
				throw new Error('checklist not implemented');
			default:
				throw new Error('stage is not supported');
		}
	};
	const FormStage = getFormStage(
		individualFormMetadata[currentStageIndex]
	);

	//Reporting and feedback
	// if ( !appWideData || !appWideData.onboardingFacts )
	// {
	//     console.error(` 'missing client ID information' );
	//     return <p className='p-10'>Something went wrong! Please contact system admin</p>
	// }

	if (error.flag) {
		console.error(error.message);
		return (
			<p className='p-10'>
				Something went wrong! Please try again later
			</p>
		);
	}

	return (
		<FormLayout>
			{loading && <Loading />}
			<Form {...form}>
				<form className='flex flex-col h-full bg-white'>
					<FormProgressSheet
                        formStages={ individualFormMetadata }
                        formAction={ jumpToStep }
                        stageIndex={currentStageIndex}
						reveal={true}
					/>
					<FormStage
						step={
							individualFormMetadata[currentStageIndex].steps[
								currentStepIndex
							]
						}
						renderStep={ FormStep =>
							FormStep ? (
								<FormStep
									applicantCount={applicantCount}
									passCountryList={(pass) => (pass ? countryList : undefined)}
									passBrokerInfo={(pass) =>
										pass ? { org_code: 'KESTR', org_cty: 'KE' } : undefined
									}
								/>
							) : null
						}
					/>
					<div className='flex items-center justify-end px-10 space-x-2 pb-16 pt-5 grow-0 bg-white'>
						{individualFormMetadata[currentStageIndex].name !==
							'Introduction' && (
							<Button
								type='button'
								variant={'outline'}
								onClick={prev}>
								Go Back
							</Button>
						)}
						<Button
							type='button'
							onClick={next}>
							{individualFormMetadata[currentStageIndex].name ===
							'Introduction'
								? 'Begin'
								: 'Save & Continue'}
						</Button>
					</div>
				</form>
			</Form>
		</FormLayout>
	);
}

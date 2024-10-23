import { useForm } from 'react-hook-form';
import {
	useCallback,
	useReducer,
	useEffect,
	useContext,
} from 'react';
import type { IndividualFormSchema } from '@/types/forms/individual';
import { Form } from '@/components/UIcomponents/ui/form';
import { IndividualFormIntro } from '@/components/PageComponents/onboarding/forms/individual/_stages/IndividualFormIntro';
import { PersonalInformation } from '@/components/PageComponents/onboarding/forms/individual/_stages/PersonalInfoStage';
import { NextOfKinStage } from '@/components/PageComponents/onboarding/forms/individual/_stages/NextOfKinStage';
import { Disclosures } from '@/components/PageComponents/onboarding/forms/individual/_stages/Disclosures';
import { DocumentUpload } from '@/components/PageComponents/onboarding/forms/individual/_stages/DocumentUpload';
import FormProgressSheet from '@/components/UIcomponents/CompoundUI/FormProgressSheet';
import Loading from '@/components/UIcomponents/Loading';
import { FormLayout } from '@/components/UIcomponents/FormLayout';
import { UserContext } from '@/Contexts/UserProfileProvider';
import { useAsyncAction } from '@/customHooks/useAsyncAction';
import { useCloseTabWarning } from '@/customHooks/useCloseTabWarning';
import { getCountryList } from '@/utils/vars/countries';
import { Button } from '@/components/UIcomponents/ui/button';
import {
	individualFormMetadata,
	formReducer,
} from '@/components/PageComponents/onboarding/forms/individual/utils/formReducer';

export default function KYCIndividualFormPage() {
	//state management
	const [formControl, formControlDispatch] = useReducer(formReducer, {
        currentStage: 'introduction',
		currentStep: 'instructions',
		allStages: individualFormMetadata,
	});

	const { currentStage, currentStep, allStages } = formControl;

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
		trigger,
		formState: { isDirty },
	} = form;

	//variables used by stage steps
	const applicantCount = watch(`_formMetadata.applicantCount`);

	const appWideContext = useContext(UserContext);

	useCloseTabWarning(isDirty);
	const [countryList, loading, error] = useAsyncAction(getCountryList);

	//Form navigation methods
	const next = useCallback(async () => {
		const isStepValid = await trigger(undefined, { shouldFocus: true });
        if ( !isStepValid ) return;
		formControlDispatch({ type: 'next' });
	}, [trigger]);

	const prev = useCallback(() => {
		formControlDispatch({ type: 'prev' });
	}, []);

	//Form stage selector
	const getFormStage = () => {
		switch (currentStage) {
			case 'introduction':
				return IndividualFormIntro;
			case 'personal':
				return PersonalInformation;
			case 'next of kin':
				return NextOfKinStage;
			case 'disclosures':
				return Disclosures;
			case 'document upload':
				return DocumentUpload;
			default:
				throw new Error('stage is not supported');
		}
	};
	const FormStage = getFormStage();

	useEffect(() => {
		if (applicantCount === 1) {
			formControlDispatch({
				type: 'remove_step',
				stage: 'disclosures',
				step: 'signature mandate',
			});
		} else
			formControlDispatch({
				type: 'reset',
				stages: individualFormMetadata,
			});
	}, [applicantCount]);

	// Reporting and feedback
	if (!appWideContext || !appWideContext.onboardingFacts) {
		console.error('missing client ID information');
		return (
			<p className='p-10'>
				Something went wrong! Please contact system admin
			</p>
		);
	}

	if (error.flag) {
		console.error(error.message);

		return (
			<p className='p-10'>
				Something went wrong! Please try again later
			</p>
		);
	}

	return (
		<>
			<FormLayout>
				{loading && <Loading />}
				<Form {...form}>
					<form className='flex flex-col h-full'>
						<FormProgressSheet
							formStages={allStages}
							formAction={formControlDispatch}
							stage={currentStage}
							step={currentStep}
						/>
						<FormStage
							step={currentStep}
							renderStep={(FormStep) =>
								FormStep ? (
									<FormStep
										applicantCount={applicantCount}
										formAction={formControlDispatch}
										countryList={countryList}
										clientID={appWideContext?.onboardingFacts?.clientID}
									/>
								) : null
							}
						/>
						<div className='flex items-center justify-end px-10 space-x-2 pb-16 pt-5 grow-0 bg-white'>
							{currentStage !== 'introduction' && (
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
								{currentStage === 'introduction'
									? 'Begin Process'
									: 'Save & Continue'}
							</Button>
						</div>
					</form>
				</Form>
			</FormLayout>
		</>
	);
}

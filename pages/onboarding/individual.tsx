import { useForm } from 'react-hook-form';
import { useReducer, useEffect, useContext } from 'react';
import type { IndividualFormSchema } from '@/types/forms/individual';
import { Form } from '@/components/UIcomponents/ui/form';
import { FormsIntro } from '@/components/pages/onboarding/forms/preface/FormsIntro';
import { PersonalInformation } from '@/components/pages/onboarding/forms/individual/stages/PersonalInfoStage';
import { NextOfKinStage } from '@/components/pages/onboarding/forms/individual/stages/NextOfKinStage';
import { Disclosures } from '@/components/pages/onboarding/forms/individual/stages/Disclosures';
import { DocumentUpload } from '@/components/pages/onboarding/forms/individual/stages/DocumentUpload';
import FormProgressSheet from '@/components/UIcomponents/CompoundUI/FormProgressSheet';
import Loading from '@/components/UIcomponents/Loading';
import { FormLayout } from '@/components/UIcomponents/FormLayout';
import { UserContext } from '@/Contexts/UserProfileProvider';
import { useAsyncAction } from '@/customHooks/useAsyncAction';
import { useCloseTabWarning } from '@/customHooks/useCloseTabWarning';
import { getCountryList } from '@/utils/vars/countries';
import { formReducer } from '@/components/pages/onboarding/forms/utils/formReducer';
import { individualFormMetadata } from '@/components/pages/onboarding/forms/individual/_stageMetadata/stages';
import { IndividualReducerFn } from '@/components/pages/onboarding/forms/individual/_stageMetadata/stages';

export default function KYCIndividualFormPage() {
	//state management
	const [formControl, formControlDispatch] = useReducer(
		formReducer as IndividualReducerFn,
		{
			currentStage: 'introduction',
			currentStep: 'instructions',
			allStages: individualFormMetadata,
		}
	);

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
		formState: { isDirty },
	} = form;

	//variables used by stage steps
	const applicantCount = watch(`_formMetadata.applicantCount`);

	const appWideContext = useContext(UserContext);

	useCloseTabWarning(isDirty);
	const [countryList, loading, error] = useAsyncAction(getCountryList);

	//Form stage selector
	const getFormStage = () => {
		switch (currentStage) {
			case 'introduction':
				return FormsIntro;
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
			<p className='p-10'>Something went wrong! Please contact system admin</p>
		);
	}

	if (error.flag) {
		console.error(error.message);

		return <p className='p-10'>Something went wrong! Please try again later</p>;
	}

	return (
		<>
			<FormLayout>
				{loading && <Loading />}
				<Form {...form}>
					<form>
						<FormProgressSheet
							formStages={allStages}
							formAction={formControlDispatch}
							stage={currentStage}
							step={currentStep}
						/>
						<FormStage
							step={currentStep}
							renderStep={(FormStep) => (
								<FormStep
									applicantCount={applicantCount}
									formAction={formControlDispatch}
									countryList={countryList}
									clientID={appWideContext?.onboardingFacts?.clientID}
								/>
							)}
						/>
					</form>
				</Form>
			</FormLayout>
		</>
	);
}

import { useForm } from 'react-hook-form';
import { useState, useCallback, useRef, useContext } from 'react';
import type { IndividualFormSchema } from '@/types/forms/individual';
import { Form } from '@/components/UIcomponents/ui/form';
import { IndividualFormIntro } from '@/components/PageComponents/onboarding/forms/individual/_stages/IndividualFormIntro';
import { PersonalInformation } from '@/components/PageComponents/onboarding/forms/individual/_stages/PersonalInfoForm';
import { NextOfKin } from '@/components/PageComponents/onboarding/forms/individual/_stages/NextOfKin';
import { Disclosures } from '@/components/PageComponents/onboarding/forms/individual/_stages/Disclosures';
import FormProgressSheet, {
	FormProgressSheetButton,
} from '@/components/UIcomponents/CompoundUI/FormProgressSheet';
import Loading from '@/components/UIcomponents/Loading';
import { FormLayout } from '@/components/UIcomponents/FormLayout';
import { UserContext } from '@/Contexts/UserProfileProvider';
import { useAsyncAction } from '@/customHooks/useAsyncAction';
import { useCloseTabWarning } from '@/customHooks/useCloseTabWarning';
import { getCountryList } from '@/utils/vars/countries';
//Enumerations

export enum IndividualFormStages {
	INTRO = 1,
	PERSONAL = 2,
	NEXT_OF_KIN = 3,
	DISCLOSURES = 4,
	CHECKLIST = 5,
}

//Form meta data for navigation components
const individualFormMetadata = [
	{
		id: 0,
		stageName: 'Introduction',
		step_no: IndividualFormStages.INTRO,
	},
	{
		id: 1,
		stageName: 'Personal',
		step_no: IndividualFormStages.PERSONAL,
	},
	{
		id: 2,
		stageName: 'Next of Kin',
		step_no: IndividualFormStages.NEXT_OF_KIN,
	},
	{
		id: 3,
		stageName: 'Disclosures',
		step_no: IndividualFormStages.DISCLOSURES,
	},
	{
		id: 4,
		stageName: 'Document Checklist',
		step_no: IndividualFormStages.CHECKLIST,
	},
];

export default function KYCIndividualFormPage() {
	//state management
	const [currentFormStage, setCurrentFormStage] =
		useState<IndividualFormStages>(IndividualFormStages.INTRO);

	const userProgress = useRef<IndividualFormStages>(currentFormStage);

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

	//Form navigation methods
	const nextStage = useCallback(
		async (step?: IndividualFormStages) => {
			//make sure to not force stage past last maximum the user was on;
			if (step && step <= userProgress.current) {
				setCurrentFormStage(step);
				return;
			}

			currentFormStage === userProgress.current &&
				userProgress.current++;

			setCurrentFormStage((prevStage) =>
				prevStage !== IndividualFormStages.CHECKLIST
					? prevStage + 1
					: prevStage
			);
		},
		[currentFormStage, userProgress]
	);
	const prevStage = useCallback(
		() =>
			setCurrentFormStage((prevStage) =>
				prevStage !== IndividualFormStages.INTRO
					? prevStage - 1
					: prevStage
			),
		[]
	);

	//Form stage selector
	const selectIndividualFormStage = (stage: IndividualFormStages) => {
		switch (stage) {
			case IndividualFormStages.INTRO:
				return IndividualFormIntro;
			case IndividualFormStages.PERSONAL:
				return PersonalInformation;
			case IndividualFormStages.NEXT_OF_KIN:
				return NextOfKin;
			case IndividualFormStages.DISCLOSURES:
				return Disclosures;
			case IndividualFormStages.CHECKLIST:
				throw new Error('checklist not implemented');
			default:
				throw new Error('stage ' + stage + ' is not supported');
		}
	};
	const FormStage = selectIndividualFormStage(currentFormStage);

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
						renderProgressListing={(s) => (
							<FormProgressSheetButton
								onClick={() => nextStage(s.step_no)}
								disabled={
									s.step_no > currentFormStage &&
									s.step_no > userProgress.current
								}
								active={s.step_no === currentFormStage}>
								{s.stageName}
							</FormProgressSheetButton>
						)}
						keyExtractor={(step) => step.id}
						stepsCollection={individualFormMetadata}
						reveal={true}
					/>
					{
						<FormStage
							nextStage={nextStage}
							prevStage={prevStage}
							renderStep={(step, FormStep) =>
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
					}
				</form>
			</Form>
		</FormLayout>
	);
}

import { useForm } from 'react-hook-form';
import { useCallback, useReducer } from 'react';
import type { IndividualFormSchema } from '@/types/forms/individual';
import { Form } from '@/components/UIcomponents/ui/form';
import { IndividualFormIntro } from '@/components/PageComponents/onboarding/forms/individual/_stages/IndividualFormIntro';
import { PersonalInformation } from '@/components/PageComponents/onboarding/forms/individual/_stages/PersonalInfoStage';
import { NextOfKinStage } from '@/components/PageComponents/onboarding/forms/individual/_stages/NextOfKinStage';
import { Disclosures } from '@/components/PageComponents/onboarding/forms/individual/_stages/Disclosures';
import FormProgressSheet from '@/components/UIcomponents/CompoundUI/FormProgressSheet';
import Loading from '@/components/UIcomponents/Loading';
import { FormLayout } from '@/components/UIcomponents/FormLayout';
// import { UserContext } from '@/Contexts/UserProfileProvider';
import { useAsyncAction } from '@/customHooks/useAsyncAction';
import { useCloseTabWarning } from '@/customHooks/useCloseTabWarning';
import { getCountryList } from '@/utils/vars/countries';
import { Button } from '@/components/UIcomponents/ui/button';
import {
	FormReducerFn,
	formReducer,
} from '@/components/PageComponents/onboarding/forms/individual/utils/formReducer';
// import { LoaderCircle } from 'lucide-react';

//Form meta data for navigation components
const individualFormMetadata = [
	{
		name: 'Introduction',
		steps: ['Instructions'],
	},
	{
		name: 'Personal',
		steps: [
			'retail client',
			'category of investment',
			'personal information_personal',
			'contact details_personal',
			'employment information',
			'settlement bank account',
			'proof of identity_personal',
			'investment & risk profile',
			'review_personal',
		],
	},
	{
		name: 'Next of Kin',
		steps: [
			'personal information_next of kin',
			'contact details_next of kin',
			'proof of identity_next of kin',
			'review_next of kin',
		],
	},
	{
		name: 'Disclosures',
		steps: ['Signature Upload','Customer Ratification','PEP','FATCA'],
	},
	{
		name: 'Document Checklist',
		steps: [],
	},
] as const;

export type IndividualFormStages = typeof individualFormMetadata;

export type FormMetadata = (typeof individualFormMetadata)[number];

type IndividualFormReducerFn = FormReducerFn<{
	readonly stepIndex: number;
	readonly stageIndex: number;
	stages: IndividualFormStages;
}>;

export default function KYCIndividualFormPage() {
	//state management
	const [formControl, formControlDispatch] =
		useReducer<IndividualFormReducerFn>(formReducer, {
			stepIndex: 0,
			stageIndex: 0,
			stages: individualFormMetadata,
		});

	const { stepIndex, stageIndex, stages } = formControl;

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
		getValues,
		trigger,
		formState: { isDirty },
	} = form;

	//variables used by stage steps
	const applicantCount = watch(`_formMetadata.applicantCount`);

	// const appWideContext = useContext(UserContext);

	useCloseTabWarning(isDirty);
	const [countryList, loading, error] = useAsyncAction(getCountryList);

	//Form navigation methods
	const next = useCallback(async () => {
		const isStepValid = await trigger();
		if (!isStepValid) return;

		formControlDispatch({ type: 'next' });
	}, [trigger]);

	const prev = useCallback(() => {
		console.log(getValues());
		formControlDispatch({ type: 'prev' });
	}, [getValues]);

	//Form stage selector
	const getFormStage = (stage: FormMetadata) => {
		switch (stage.name) {
			case 'Introduction':
				return IndividualFormIntro;
			case 'Personal':
				return PersonalInformation;
			case 'Next of Kin':
				return NextOfKinStage;
			case 'Disclosures':
				return Disclosures;
			case 'Document Checklist':
				throw new Error('checklist not implemented');
			default:
				throw new Error('stage is not supported');
		}
	};
	const FormStage = getFormStage(stages[stageIndex]);

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
		<>
			<FormLayout>
				{loading && <Loading />}
				<Form {...form}>
					<form className='flex flex-col h-full'>
						<FormProgressSheet
							formStages={stages}
							formAction={formControlDispatch}
							stageIndex={stageIndex}
							stepIndex={stepIndex}
							reveal={true}
						/>
						<FormStage
							step={stages[stageIndex].steps[stepIndex]}
							renderStep={(FormStep) =>
								FormStep ? (
									<FormStep
										applicantCount={applicantCount}
										formAction={formControlDispatch}
										countryList={countryList}
										broker={{ org_code: 'DATAB', org_cty: 'GH' }}
									/>
								) : null
							}
						/>
						<div className='flex items-center justify-end px-10 space-x-2 pb-16 pt-5 grow-0 bg-white'>
							{stages[stageIndex].name !== 'Introduction' && (
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
								{stages[stageIndex].name === 'Introduction'
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

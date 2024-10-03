import { useForm } from 'react-hook-form';
import { useEffect, useState, useCallback, useRef } from 'react';
import type { IndividualFormSchema } from '@/types/forms/individual';
import INDIVIDUAL_FORM_DEFAULTS from '@/utils/vars/_formDefaults/defaults_individual.json';
import { Form } from '@/components/UIcomponents/ui/form';
import IndividualFormIntro from '@/components/PageComponents/onboarding/forms/individual/_stages/IndividualFormIntro';
import PersonalInformation from '@/components/PageComponents/onboarding/forms/individual/_stages/PersonalInfoForm';
import NextOfKin from '@/components/PageComponents/onboarding/forms/individual/_stages/NextOfKin';
import Disclosures from '@/components/PageComponents/onboarding/forms/individual/_stages/Disclosures';
import useApplicantAdjustor from '@/components/PageComponents/onboarding/forms/individual/_customHooks/useApplicantAdjustor';
import FormProgressSheet, {
	FormProgressSheetButton,
} from '@/components/UIcomponents/CompoundUI/FormProgressSheet';
import useHTTPRequest from '@/components/PageComponents/onboarding/forms/individual/_customHooks/useHTTPRequest';
import Loading from '@/components/UIcomponents/Loading';
import { BASE_URL } from '@/utils/vars/uri';
import { Country } from '@/types/forms/universal';
import { FormLayout } from '@/components/UIcomponents/FormLayout';
import countries from '@/utils/vars/_formDefaults/countries.json'

//Fetch url constants
const COUNTRY_LIST_URL = BASE_URL + '/kyc/lov/country';

//Enumerations
export enum ClientType {
	INDIVIDUAL = 'Individual',
	JOINT = 'Joint Account',
}
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

export default function IndividualKycForm() {
	const [currentFormStage, setCurrentFormStage] =
		useState<IndividualFormStages>(IndividualFormStages.INTRO);

	const userProgress = useRef<IndividualFormStages>(currentFormStage);

	const form = useForm<IndividualFormSchema>({
		defaultValues: {
			...INDIVIDUAL_FORM_DEFAULTS,
        },
        mode: 'onChange',
	});

	// const [res, isLoading, error] = useHTTPRequest<{ data: Country[] } | null>(
	// 	COUNTRY_LIST_URL
	// );

	const {
		getValues,
		reset,
		formState: { isDirty },
	} = form;

	const currentClientType = getValues('clientType');

	useApplicantAdjustor(currentClientType as ClientType, reset);

	//  useEffect(() => {
	// 	const warnOfDataLoss = (event: BeforeUnloadEvent) => {
	// 		event.preventDefault();
	// 		if (isDirty) {
	// 			const confirmationMsg =
	// 				'You will lose application progress, if you close this tab';
	// 			// ( event || event.returnValue) = confirmationMsg;
	// 			return confirmationMsg;
	// 		}

	// 		return null;
	// 	};
	// 	window.addEventListener('beforeunload', warnOfDataLoss);

	// 	return () => window.removeEventListener('beforeunload', warnOfDataLoss);
	// }, [isDirty]);

	const nextStage = useCallback(
        async ( step?: IndividualFormStages ) =>
        {
			//make sure to not force stage past last maximum the user was on;
			if (step && step <= userProgress.current) {
				setCurrentFormStage(step);
				return;
			}

			currentFormStage === userProgress.current && userProgress.current++;

			setCurrentFormStage((prevStage) =>
				prevStage !== IndividualFormStages.CHECKLIST ? prevStage + 1 : prevStage
			);
		},
		[currentFormStage, userProgress]
	);

	const prevStage = useCallback(
		() =>
			setCurrentFormStage((prevStage) =>
				prevStage !== IndividualFormStages.INTRO ? prevStage - 1 : prevStage
			),
		[]
	);

	const getIndividualFormStage = (stage: IndividualFormStages) => {
		switch (stage) {
			case IndividualFormStages.INTRO:
				return <IndividualFormIntro nextStage={nextStage} />;
			case IndividualFormStages.PERSONAL:
                return (
					<PersonalInformation
						nextStage={nextStage}
						prevStage={prevStage}
						countryList={countries.data}
					/>
				);
			case IndividualFormStages.NEXT_OF_KIN:
                return (
					<NextOfKin
						nextStage={nextStage}
						prevStage={prevStage}
						countryList={countries.data}
					/>
				);
			case IndividualFormStages.DISCLOSURES:
                return (
					<Disclosures
						nextStage={nextStage}
                        prevStage={ prevStage }
                        countryList={countries.data}
					/>
				);
			case IndividualFormStages.CHECKLIST:
                return (<div className='p-10'>
                    Disclosures
                    ***Under construction****
                </div>);
			default:
				throw new Error('form stage ' + stage + ' is not supported');
		}
	};

	// if (error) {
	// 	console.log(error);
	// 	return <p>Something went wrong! Please try again later</p>;
    // }
    
	return (
		<FormLayout>
			<Form {...form}>
				<form className='flex flex-col h-full'>
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
					{false ? <Loading /> : getIndividualFormStage(currentFormStage)}
				</form>
			</Form>
		</FormLayout>
	);
}

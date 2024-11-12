import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import type { FormComponentDict } from '@/components/pages/onboarding/forms/utils/formReducer';
import type { IndividualFormStage } from '@/components/pages/onboarding/forms/individual/config/individualFormMetadata';
import { Form } from '@/components/UIcomponents/ui/form';
import * as Stages from '@/components/pages/onboarding/forms/individual/stages/stagesDictionary';
import {
	FormLayout,
	FormNav,
    FormNavButtons,
} from '@/components/UIcomponents/FormLayout';
import { useCloseTabWarning } from '@/components/pages/onboarding/forms/utils/customHooks/useCloseTabWarning';
import { individualFormMetadata } from '@/components/pages/onboarding/forms/individual/config/individualFormMetadata';
import {
	useKYCForm,
	KYCContext,
} from '@/components/pages/onboarding/forms/utils/formController';
import Loading from '@/components/UIcomponents/Loading';

export default function IndividualForm() {
	const form = useForm<IndividualFormSchema>({
		mode: 'onChange',
	});

	const KYCForm = useKYCForm(individualFormMetadata, form);

	const {
		form: {
            formState: { isDirty },
            handleSubmit
        },
        formVars: { clientID, submissionID },
		formAction,
		error,
        isLoading,
	} = KYCForm;

	useCloseTabWarning(isDirty);

	const individualStages: FormComponentDict<IndividualFormStage> = {
		introduction: <Stages.FormsIntro />,
		personal: <Stages.PersonalInfoStage />,
		'next of kin': <Stages.NextOfKinStage />,
		disclosures: <Stages.DisclosuresStage$Individual />,
		'document checklist': <Stages.DocumentChecklistStage$Individual />,
	};

	const clientType = form.watch('clientType');

	useEffect(() => {
		if (clientType === 'Individual') {
			formAction({
				type: 'remove_step',
				stage: 'disclosures',
				step: 'signature mandate',
			});
		} else
			formAction({
				type: 'reset',
				stages: individualFormMetadata,
			});
    }, [ clientType, formAction ] );
    

    const submitHandler: SubmitHandler<IndividualFormSchema> = ( data ) =>
    {
        const payload = {
            clientID,
            submissionID,
            payload: {
                ...data
            }
        }

        console.log( payload )
        console.log( JSON.stringify( payload ) );
    }

	if (error) {
		console.error(error);
		return (
			<p className='p-10'>Something went wrong! Please contact system admin</p>
		);
	}

	return (
		//@ts-expect-error will fix mismatch later
		<KYCContext.Provider value={KYCForm}>
			<FormLayout>
				<Loading reveal={isLoading} />
				<Form {...form}>
					<form  onSubmit={ handleSubmit( submitHandler ) }>
						<FormNav />
						{individualStages[KYCForm.formNav.currentStage]}
						<FormNavButtons />
					</form>
				</Form>
			</FormLayout>
		</KYCContext.Provider>
	);
}

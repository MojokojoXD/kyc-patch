import { useForm, type SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import type { FormComponentDict } from '@/components/forms/utils/formReducer';
import { Form } from '@/components/ui/form';
import * as Stages from '@/components/forms/individual/stages/stagesDictionary';
import { FormLayout, FormNav, FormNavButtons } from '@/components/FormLayout';
import { useCloseTabWarning } from '@/components/forms/utils/customHooks/useCloseTabWarning';
import {
	individualFormMetadata,
	type IndividualFormStage,
} from '@/components/forms/individual/config/individualFormMetadata';
import {
	useKYCForm,
	KYCContext,
} from '@/components/forms/utils/formController';
import Loading from '@/components/ui/Loading';

export default function IndividualForm() {
	const form = useForm<IndividualFormSchema>({
		mode: 'onChange',
	});

	const KYCForm = useKYCForm(individualFormMetadata, form);

	const {
		form: {
			formState: { isDirty },
			handleSubmit,
		},
		formVars: { clientID, submissionID },
		formNav: { currentStage },
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
	}, [clientType, formAction]);

	const submitHandler: SubmitHandler<IndividualFormSchema> = async (data) => {
		const payload = {
			clientID,
			submissionID,
			payload: {
				...data,
			},
		};

		console.log(payload);

		try {
			const res = await fetch(
				'/api/forms',
				{
					method: 'POST',
					body: JSON.stringify(payload),
				}
			);

			if (res.ok) {
			}
		} catch (error) {
			console.log(error);
		}
	};

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
					<form onSubmit={handleSubmit(submitHandler)}>
						<FormNav />
						{individualStages[currentStage]}
						<FormNavButtons />
					</form>
				</Form>
			</FormLayout>
		</KYCContext.Provider>
	);
}

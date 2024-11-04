import { useForm } from 'react-hook-form';
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

export default function IndividualForm() {
	const form = useForm<IndividualFormSchema>({
		mode: 'onChange',
	});

	const KYCForm = useKYCForm(individualFormMetadata, form);

	const {
		formState: { isDirty },
	} = KYCForm.form;

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
			KYCForm.formAction({
				type: 'remove_step',
				stage: 'disclosures',
				step: 'signature mandate',
			});
		} else
			KYCForm.formAction({
				type: 'reset',
				stages: individualFormMetadata,
			});
	}, [clientType]);

	// Reporting and feedback
	if (!KYCForm.clientID) {
		console.error('missing client ID information');
		return (
			<p className='p-10'>Something went wrong! Please contact system admin</p>
		);
	}

    return (
        //@ts-expect-error will fix mismatch later
		<KYCContext.Provider value={KYCForm}>
			<FormLayout>
				<Form {...form}>
					<form>
						<FormNav />
						{individualStages[KYCForm.formNav.currentStage]}
						<FormNavButtons />
					</form>
				</Form>
			</FormLayout>
		</KYCContext.Provider>
	);
}

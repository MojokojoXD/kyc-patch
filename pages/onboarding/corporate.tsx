import { useForm, SubmitHandler } from 'react-hook-form';
import {
	corporateStages,
	CorporateStageDict,
} from '@/components/forms/corporate/config/corporateFormConfigs';
import { Form } from '@/components/ui/form';
import { FormLayout, FormNav, FormNavButtons } from '@/components/FormLayout';
import type { CorporateFormSchema } from '@/types/forms/corporateSchema';
import * as Stages from '@/components/forms/corporate/stages/stagesComponents';
import { useCloseTabWarning } from '@/components/forms/utils/customHooks/useCloseTabWarning';
import {
	KYCContext,
	useKYCForm,
} from '@/components/forms/utils/formController';
import Loading from '@/components/ui/Loading';

export default function CorporateForm() {
	const form = useForm<CorporateFormSchema>({
		mode: 'onChange',
	});
	const KYCForm = useKYCForm(corporateStages, form);

	const {
		formNav: { currentStage },
		formVars: { clientID, submissionID },
		isLoading,
		error,
	} = KYCForm;

	const {
		formState: { isDirty },
		handleSubmit,
	} = form;

	useCloseTabWarning(isDirty);

	const StagesDict: CorporateStageDict = {
		introduction: <Stages.FormsIntro />,
		business: <Stages.BusinessStage />,
		contacts: <Stages.ContactsStage />,
		'account signatories': <Stages.AccountSignatoriesStage />,
		'settlement account': <Stages.SettlementAccountStage$Corporate />,
		disclosures: <Stages.DisclosuresStage$Corporate />,
		'document checklist': <Stages.DocumentCheckListStage$Corporate />,
	};

    const submitHandler: SubmitHandler<CorporateFormSchema> = ( data ) =>
    {
		const payload = {
			clientID,
			submissionID,
			payload: {
				...data,
			},
		};

		console.log(payload);
		console.log(JSON.stringify(payload));
	};

	if (error) {
		console.error(error);

		return (
			<p className='p-10'>
				Link or session expired! Please contact broker for a new link{' '}
			</p>
		);
	}

	return (
		//@ts-expect-error will fix type mismatch between context types
		<KYCContext.Provider value={KYCForm}>
			<Form {...form}>
				<form onSubmit={handleSubmit(submitHandler)}>
					<FormLayout>
						<Loading reveal={isLoading} />
						<FormNav />
						{StagesDict[currentStage]}
						<FormNavButtons />
					</FormLayout>
				</form>
			</Form>
		</KYCContext.Provider>
	);
}

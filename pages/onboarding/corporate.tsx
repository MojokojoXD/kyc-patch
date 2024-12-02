import { useForm, SubmitHandler } from 'react-hook-form';
import {
	corporateStages,
	CorporateStageDict,
} from '@/components/forms/__KYC__/corporate/config/corporateFormConfigs';
import { Form } from '@/components/ui/form';
import { FormLayout, FormNav, FormNavButtons } from '@/components/forms/FormLayout';
import type { CorporateFormSchema } from '@/types/forms/corporateSchema';
import * as Stages from '@/components/forms/__KYC__/corporate/stages/stagesComponents';
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

	const corporateStagesDict: CorporateStageDict = {
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
		<FormLayout>
			<FormNav />
			<Loading reveal={isLoading} />
			<div className='relative w-full bg-neutral-50 flex justify-center overflow-auto h-full py-10'>
				<Form {...KYCForm.form}>
					<form
						onSubmit={handleSubmit(submitHandler)}
						className='w-full max-w-[44.75rem]'>
						<div className='border border-neutral-100 rounded-xl overflow-hidden'>
							{corporateStagesDict[currentStage]}
							<FormNavButtons />
						</div>
					</form>
				</Form>
			</div>
		</FormLayout>
	</KYCContext.Provider>
);
}

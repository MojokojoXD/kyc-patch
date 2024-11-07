import { useForm } from 'react-hook-form';
import {
	corporateStages,
	CorporateStageDict,
} from '@/components/pages/onboarding/forms/corporate/config/corporateFormConfigs';
import { Form } from '@/components/UIcomponents/ui/form';
import {
	FormLayout,
	FormNav,
	FormNavButtons,
} from '@/components/UIcomponents/FormLayout';
import type { CorporateFormSchema } from '@/types/forms/corporateSchema';
import * as Stages from '@/components/pages/onboarding/forms/corporate/stages/stagesComponents';
import { useCloseTabWarning } from '@/components/pages/onboarding/forms/utils/customHooks/useCloseTabWarning';
import {
	KYCContext,
	useKYCForm,
} from '@/components/pages/onboarding/forms/utils/formController';
import Loading from '@/components/UIcomponents/Loading';

export default function CorporateForm() {
	const form = useForm<CorporateFormSchema>({
		mode: 'onChange',
	});
	const KYCForm = useKYCForm(corporateStages, form);

	const {
		formNav: { currentStage },
		isLoading,
		error,
	} = KYCForm;

	const {
		formState: { isDirty },
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

	if (error) {
		console.error(error);

		return (
			<p className='p-10'>
				Link or session expired! Please contact broker for a new link{' '}
			</p>
		);
	}

	return (
		//@ts-expect-error will fix type between context types
		<KYCContext.Provider value={KYCForm}>
            <Form { ...form }>
                <FormLayout>
                    <Loading reveal={ isLoading }/>
					<FormNav />
					{StagesDict[currentStage]}
					<FormNavButtons />
				</FormLayout>
			</Form>
		</KYCContext.Provider>
	);
}

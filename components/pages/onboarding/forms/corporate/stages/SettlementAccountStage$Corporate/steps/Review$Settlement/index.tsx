import type { FormStep } from '@/types/Components/onboarding';
import { useKYCFormContext } from '@/components/pages/onboarding/forms/utils/formController';
import { ReviewerSection } from '@/components/UIcomponents/FormReviewer/ReviewerComponents/ReviewerSection';
import {
	FormHeader,
	FormContent,
	FormTitle,
	FormSubHeader,
} from '@/components/UIcomponents/FormLayout';
import type { CorporateStep } from '../../../../config/corporateFormConfigs';
import { accountDetailsModel$Corporate } from '../BankDetails$Corporate/model/accountDetailsModel$Corporate';
import { accountActivityModel } from '../AccountActivity/model/accountActivityModel';
import { riskProfileModel$Corporate } from '../RiskProfile$Corporate/model/riskProfileModel$Corporate';
import { statementsModel } from '../Statements/model/statementsModel';

export const Review$Settlement: FormStep = () => {
	const { formAction } = useKYCFormContext();

	const editStep = (step: CorporateStep) => {
		formAction({
			type: 'jump_to_form_location',
			toStage: 'settlement account',
			toStep: step,
		});
	};

	return (
		<>
			<FormHeader>
				<FormTitle>Business Information Summary</FormTitle>
				<FormSubHeader>Review your submissions for any inaccuracies</FormSubHeader>
			</FormHeader>
			<FormContent className='bg-white px-0 pt-0'>
				<div className='bg-neutral-50 space-y-[16px]'>
					<ReviewerSection
						sectionName='Settlement Account Details'
						editAction={editStep.bind(this, 'account details')}
						fieldModel={accountDetailsModel$Corporate}
					/>
					<ReviewerSection
						sectionName='Expected Account Activity'
						editAction={editStep.bind(this, 'account activity')}
						fieldModel={accountActivityModel}
					/>
					<ReviewerSection
						sectionName='Investment & Risk Profile'
						editAction={editStep.bind(this, 'risk profile')}
						fieldModel={riskProfileModel$Corporate}
					/>
					<ReviewerSection
						sectionName='Statement Services & Preferences'
						editAction={editStep.bind(this, 'statements')}
						fieldModel={statementsModel}
					/>
				</div>
			</FormContent>
		</>
	);
};

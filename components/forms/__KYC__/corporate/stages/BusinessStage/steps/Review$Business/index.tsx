import type { FormStep } from '@/types/Components/onboarding';
import { useKYCFormContext } from '@/components/forms/utils/formController';
import { categoryOfBusinessFields } from '../CategoryOfBusiness/model/categoryOfBusinessFields';
import { categoryOfInvestmentFields } from '../CategoryOfInvestments/model/categoryOfInvestmentsFields';
import { companyDetailsFields } from '../CompanyDetails/model/companyDetailsFields';
import { incorporationFields } from '../Incorporation/model/incorporationFields';
import { ReviewerSection } from '@/components/forms/FormReviewer/ReviewerComponents/ReviewerSection';
import {
	FormHeader,
	FormContent,
	FormTitle,
	FormSubHeader,
} from '@/components/forms/FormLayout';
import type { CorporateStep } from '../../../../config/corporateFormConfigs';

export const Review$Business: FormStep = () => {
	const { formAction } = useKYCFormContext();

	const editStep = (step: CorporateStep) => {
		formAction({
			type: 'jump_to_form_location',
			toStage: 'business',
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
						sectionName='Category of Business'
						editAction={editStep.bind(this, 'category of business')}
						fieldModel={categoryOfBusinessFields}
					/>
					<ReviewerSection
						sectionName='Category of Investment'
						editAction={editStep.bind(this, 'category of investments')}
						fieldModel={categoryOfInvestmentFields}
					/>
					<ReviewerSection
						sectionName='Company/Business Details'
						editAction={editStep.bind(this, 'company details')}
						fieldModel={companyDetailsFields}
					/>
					<ReviewerSection
						sectionName='Proof of Incorporation/Registration'
						editAction={editStep.bind(this, 'proof of incorporation')}
						fieldModel={incorporationFields}
					/>
				</div>
			</FormContent>
		</>
	);
};

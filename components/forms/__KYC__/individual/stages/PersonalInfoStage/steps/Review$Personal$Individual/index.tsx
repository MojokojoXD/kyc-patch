import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import {
	FormContent,
	FormHeader,
	FormSubHeader,
	FormTitle,
} from '@/components/forms/FormLayout';
// import { useMemo } from 'react';k
import type { FormStep } from '@/types/Components/onboarding';
import { ReviewerSection } from '@/components/forms/FormReviewer/ReviewerComponents/ReviewerSection';
import { retailClientModel } from '../RetailClient/model/retailClientModel';
import { investmentCatergoryFields } from '../InvestmentCategory/model/InvestmentCategoryFormBuilder';
import { bioInfoModel } from '../BiographicalInfo/model/bioInfoModel';
import { contactDetailsModel$Individual } from '../ContactDetails$Individual/model/contactDetailsModel$Individual';
import { employmentModel } from '../EmploymentInfo/model/employmentModel';
import { bankDetailsModel$Individual } from '../BankDetails$Individual/model/bankDetailsModel$Individual';
import { proofOfIdentityModel$Individual } from '../ProofOfIdentity$Individual/model/proofOfIdentityModel$Individual';
import { riskProfileModel$Individual } from '../RiskProfile$Individual/model/riskProfileModel$Individual';
import type {
	IndividualFormStep,
	IndividualFormMetadata,
} from '../../../../config/individualFormMetadata';
import { useKYCFormContext } from '@/components/forms/utils/formController';

export const Review$Personal$Individual: FormStep = () => {
	const {
		form: { getValues },
    goToFormLocation,
    onFormNav
	} = useKYCFormContext<IndividualFormSchema, IndividualFormMetadata>();

	const applicantCount = (getValues('applicant') || [{}]).length;

  const editStep = ( step: IndividualFormStep ) =>
  {
    goToFormLocation( 'personal', step );
    
    onFormNav( () => true) 
  }

	const accordionTitle = (index: number) => ({
		firstName: `applicant.${index}.firstName`,
		lastName: `applicant.${index}.lastName`,
		titlePrefix: 'Applicant',
	});

	return (
		<>
			<FormHeader>
				<FormTitle>Personal Information Summary</FormTitle>
				<FormSubHeader>Review your submissions for any inaccuracies</FormSubHeader>
			</FormHeader>
			<FormContent className='bg-white px-0 pt-0'>
				<div className='bg-neutral-50 space-y-[16px]'>
					<ReviewerSection
						sectionName='Retail Client'
						accordionTitle='Retail Client'
						editAction={editStep.bind(this, 'retail client')}
						fieldModel={retailClientModel}
					/>
					<ReviewerSection
						sectionName='Category of Investment'
						accordionTitle='Category of Investment'
						editAction={editStep.bind(this, 'category of investment')}
						fieldModel={investmentCatergoryFields}
					/>
					<ReviewerSection
						sectionName='Personal Information'
						editAction={editStep.bind(this, 'personal information_personal')}
						applicantCount={applicantCount}
						fieldModel={bioInfoModel}
						accordionTitle={accordionTitle}
					/>
					<ReviewerSection
						sectionName='Contact Information'
						editAction={editStep.bind(this, 'contact details_personal')}
						applicantCount={applicantCount}
						fieldModel={contactDetailsModel$Individual}
						accordionTitle={accordionTitle}
					/>
					<ReviewerSection
						sectionName='Employment Information'
						editAction={editStep.bind(this, 'employment information')}
						applicantCount={applicantCount}
						fieldModel={employmentModel}
						accordionTitle={accordionTitle}
					/>
					<ReviewerSection
						sectionName='Settlement Bank Account'
						editAction={editStep.bind(this, 'settlement bank account')}
						applicantCount={applicantCount}
						fieldModel={bankDetailsModel$Individual}
						accordionTitle={accordionTitle}
					/>
					<ReviewerSection
						sectionName='Proof of Identity'
						editAction={editStep.bind(this, 'proof of identity_personal')}
						applicantCount={applicantCount}
						fieldModel={proofOfIdentityModel$Individual}
						accordionTitle={accordionTitle}
					/>
					<ReviewerSection
						sectionName='Investment & Risk Profile'
						editAction={editStep.bind(this, 'investment & risk profile')}
						applicantCount={applicantCount}
						fieldModel={riskProfileModel$Individual}
						accordionTitle={accordionTitle}
					/>
				</div>
			</FormContent>
		</>
	);
};

import { useFormContext } from 'react-hook-form';
import type { IndividualFormSchema } from '@/types/forms/individual';
import {
	FormContent,
	FormHeader,
	FormSubHeader,
	FormTitle,
} from '@/components/UIcomponents/FormLayout';
// import { useMemo } from 'react';
import type { FormStep } from '@/types/Components/onboarding';
import { ReviewerSection } from '@/components/UIcomponents/FormReviewer/ReviewerComponents/ReviewerSection';
import { retailClientFields } from '../RetailClient/formbuilder/retailClientFormFields';
import { investmentCatergoryFields } from '../InvestmentCategory/formBuilder/InvestmentCategoryFormBuilder';
import { bioFieldsModel } from '../BiographicalInfo/formBuilder/bioFormFields';
import { contactFieldsModel } from '../Contacts/formBuilder/contactFormFields';
import { employmentFieldsModel } from '../EmploymentInfo/formBuilder/employmentFormField';
import { bankAccountModel } from '../BankAccountInfo/formBuilder/bankAccountFormFields';
import { proofOfIdentityFieldsModel } from '../IdentityProof/formBuild/proofOfIdentityFields';
import { riskProfileFieldModel } from '../RiskProfile/FormBuilder/riskProfileFields';
import type { Step } from '../../../../utils/formReducer';

export const Review: FormStep = ({ formAction }) => {
	const { getValues } = useFormContext<IndividualFormSchema>();

	const applicantCount = getValues(`_formMetadata.applicantCount`);

	const editStep = (step: Step) =>
		formAction({
			type: 'jump_to_form_location',
			toStage: 'personal',
			toStep: step,
        } );
    
    
    const accordionTitle = ( index:number ) => ( {
        firstName: `applicant.${ index }.firstName`,
        lastName: `applicant.${ index }.lastName`,
        titlePrefix: 'Applicant'
    } );


	return (
		<>
			<FormHeader>
				<FormTitle>Personal Information Summary</FormTitle>
				<FormSubHeader>
					Review your submissions for any inaccuracies
				</FormSubHeader>
			</FormHeader>
			<FormContent className='bg-white px-0 pt-0'>
				<div className='bg-neutral-50 space-y-[16px]'>
					<ReviewerSection
						sectionName='Retail Client'
						accordionTitle='Retail Client'
						editAction={editStep.bind(this, 'retail client')}
						fieldModel={retailClientFields}
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
                        fieldModel={ bioFieldsModel }
                        accordionTitle={accordionTitle}
					/>
					<ReviewerSection
						sectionName='Contact Information'
						editAction={editStep.bind(this, 'contact details_personal')}
						applicantCount={applicantCount}
                        fieldModel={ contactFieldsModel }
                        accordionTitle={accordionTitle}
					/>
					<ReviewerSection
						sectionName='Employment Information'
						editAction={editStep.bind(this, 'employment information')}
						applicantCount={applicantCount}
                        fieldModel={ employmentFieldsModel }
                        accordionTitle={ accordionTitle}
					/>
					<ReviewerSection
						sectionName='Settlement Bank Account'
						editAction={editStep.bind(this, 'settlement bank account')}
						applicantCount={applicantCount}
                        fieldModel={ bankAccountModel }
                        accordionTitle={accordionTitle}
					/>
					<ReviewerSection
						sectionName='Proof of Identity'
						editAction={editStep.bind(this, 'proof of identity_personal')}
						applicantCount={applicantCount}
                        fieldModel={ proofOfIdentityFieldsModel }
                        accordionTitle={accordionTitle}
					/>
					<ReviewerSection
						sectionName='Investment & Risk Profile'
						editAction={editStep.bind(this, 'investment & risk profile')}
						applicantCount={applicantCount}
                        fieldModel={ riskProfileFieldModel }
                        accordionTitle={ accordionTitle }
					/>
				</div>
			</FormContent>
		</>
	);
};

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

export const Review: FormStep = ({ formAction }) => {
	const { getValues } = useFormContext<IndividualFormSchema>();

	const applicantCount = getValues(`_formMetadata.applicantCount`);

	const editStep = (step: number) =>
		formAction({
			type: 'jump_to_form_location',
			toStage: 1,
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
						editAction={editStep.bind(this, 0)}
						fieldModel={retailClientFields}
					/>
					<ReviewerSection
						sectionName='Category of Investment'
						accordionTitle='Category of Investment'
						editAction={editStep.bind(this, 1)}
						fieldModel={investmentCatergoryFields}
					/>
					<ReviewerSection
						sectionName='Personal Information'
						editAction={editStep.bind(this, 2)}
						applicantCount={applicantCount}
                        fieldModel={ bioFieldsModel }
                        accordionTitle={accordionTitle}
					/>
					<ReviewerSection
						sectionName='Contact Information'
						editAction={editStep.bind(this, 3)}
						applicantCount={applicantCount}
                        fieldModel={ contactFieldsModel }
                        accordionTitle={accordionTitle}
					/>
					<ReviewerSection
						sectionName='Employment Information'
						editAction={editStep.bind(this, 4)}
						applicantCount={applicantCount}
                        fieldModel={ employmentFieldsModel }
                        accordionTitle={ accordionTitle}
					/>
					<ReviewerSection
						sectionName='Settlement Bank Account'
						editAction={editStep.bind(this, 5)}
						applicantCount={applicantCount}
                        fieldModel={ bankAccountModel }
                        accordionTitle={accordionTitle}
					/>
					<ReviewerSection
						sectionName='Proof of Identity'
						editAction={editStep.bind(this, 6)}
						applicantCount={applicantCount}
                        fieldModel={ proofOfIdentityFieldsModel }
                        accordionTitle={accordionTitle}
					/>
					<ReviewerSection
						sectionName='Investment & Risk Profile'
						editAction={editStep.bind(this, 7)}
						applicantCount={applicantCount}
                        fieldModel={ riskProfileFieldModel }
                        accordionTitle={ accordionTitle }
					/>
				</div>
			</FormContent>
		</>
	);
};

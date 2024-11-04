import type { FormStep } from '@/types/Components/onboarding';
import { useKYCFormContext } from '@/components/pages/onboarding/forms/utils/formController';
import { kestrelTermsModel$Corporate } from '../KestrelTerms$Corporate/model/kestrelTermModel$Corporate';
import { kestrelNomineeModel$Corporate } from '../KestrelNominee$Corporate/model/kestrelNomineeModel$Corporate';
import { databankIndemnityModel$Corporate } from '../DatabankIndemnity$Corporate/model/databankIndemnityModel$Corporate';
import { afrinvestIndemnityModel$Corporate } from '../AfrinvestIndemity$Corporate/model/afrinvestIndemnityModel$Corporate';
import { signatureMandateModel$Corporate } from '../SignatureMandate$Corporate/model/signatureMandateModel$Corporate';
import { declarationsModel$Corporate } from '../Declarations$Corporate/model/declarationsModel$Corporate';
import { fatcaModel$Corporate } from '../Fatca$Corporate/model/fatcaModel$Corporate';
import { ReviewerSection } from '@/components/UIcomponents/FormReviewer/ReviewerComponents/ReviewerSection';
import {
	FormHeader,
	FormContent,
	FormTitle,
	FormSubHeader,
} from '@/components/UIcomponents/FormLayout';
import type { CorporateStep } from '../../../../config/corporateFormConfigs';
import type { Signatory } from '@/types/forms/corporateSchema';

export const Review$Disclosures$Corporate: FormStep = () => {
	const { formAction, form } = useKYCFormContext();
	const { getValues } = form;

	const signatoriesCount = (
		(getValues('accountSignatories.signatories') as Signatory[]) || [{}]
	).length;

	const editStep = (step: CorporateStep) => {
		formAction({
			type: 'jump_to_form_location',
			toStage: 'disclosures',
			toStep: step,
		});
	};

	const accordionTitle = (index: number) => ({
		firstName: `accountSignatories.signatories.${index}.firstName`,
		lastName: `accountSignatories.signatories.${index}.lastName`,
		titlePrefix: 'Signatory',
	});

	return (
		<>
			<FormHeader>
				<FormTitle>Disclosures Summary</FormTitle>
				<FormSubHeader>Review your submissions for any inaccuracies</FormSubHeader>
			</FormHeader>
			<FormContent className='bg-white px-0 pt-0'>
				<div className='bg-neutral-50 space-y-[16px]'>
					<ReviewerSection
						sectionName='Terms and Conditions - Kestrel Capital'
						editAction={editStep.bind(this, 'kestrel - terms')}
						fieldModel={kestrelTermsModel$Corporate}
					/>
					<ReviewerSection
						sectionName='Nominee Agreement - Kestrel Capital Nominees Services LTD'
						applicantCount={signatoriesCount}
						editAction={editStep.bind(this, 'kestrel - nominee')}
						fieldModel={kestrelNomineeModel$Corporate}
						accordionTitle={accordionTitle}
					/>
					<ReviewerSection
						sectionName='Email Indemnity - Databank Brokerage Limited'
						applicantCount={signatoriesCount}
						editAction={editStep.bind(this, 'databank - indemnity')}
						fieldModel={databankIndemnityModel$Corporate}
						accordionTitle={accordionTitle}
					/>
					<ReviewerSection
						sectionName='Email Indemnity - Afrinvest'
						editAction={editStep.bind(this, 'afrinvest - indemnity')}
						fieldModel={afrinvestIndemnityModel$Corporate}
					/>
					<ReviewerSection
						sectionName='Signature Mandate'
						editAction={editStep.bind(this, 'signature mandate')}
						fieldModel={signatureMandateModel$Corporate}
					/>
					<ReviewerSection
						sectionName='Declaration'
						editAction={editStep.bind(this, 'declarations')}
						fieldModel={declarationsModel$Corporate}
					/>
					<ReviewerSection
						sectionName='Foreign Account Tax Compliance Act (FATCA)'
						editAction={editStep.bind(this, 'fatca')}
                        fieldModel={ fatcaModel$Corporate }
                        accordionTitle={accordionTitle}
					/>
				</div>
			</FormContent>
		</>
	);
};

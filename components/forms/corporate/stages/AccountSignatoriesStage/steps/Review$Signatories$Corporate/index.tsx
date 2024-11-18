import type { FormStep } from '@/types/Components/onboarding';
import { useKYCFormContext } from '@/components/forms/utils/formController';
import { signatoriesModel } from '../Signatories/model/signatoriesModel';
import { proofOfIdentityModel$Corporate } from '../ProofOfIdentity$Corporate/model/proofOfIdentityModel$Corporate';
import { pepModel$Corporate } from '../Pep$Corporate/model/pepModel$Corporate';
import { beneficialOwnersModel } from '../BeneficialOwner/model/beneficialOwnerModel';
import { directorsModel } from '../Directors/model/directorsModel';
import { affiliationsModel } from '../Affiliations/model/affiliationsModel';
import { ReviewerSection } from '@/components/FormReviewer/ReviewerComponents/ReviewerSection';
import {
	FormHeader,
	FormContent,
	FormTitle,
	FormSubHeader,
} from '@/components/FormLayout';
import type { CorporateStep } from '../../../../config/corporateFormConfigs';
import type {
	Signatory,
	Director,
	BeneficialOwner,
} from '@/types/forms/corporateSchema';

export const Review$Signatories$Corporate: FormStep = () => {
	const { formAction, form } = useKYCFormContext();
	const { getValues } = form;

	const signatoriesCount = (
		getValues('accountSignatories.signatories') as Signatory[]
	).length;
	const directorsCount = (
		getValues('accountSignatories.directors') as Director[]
	).length;
	const beneficialOwnersCount = (
		getValues('accountSignatories.beneficialOwners') as BeneficialOwner[]
	).length;

	const editStep = (step: CorporateStep) => {
		formAction({
			type: 'jump_to_form_location',
			toStage: 'account signatories',
			toStep: step,
		});
	};

	const signatoriesTitle = (index: number) => ({
		firstName: `accountSignatories.signatories.${index}.firstName`,
		lastName: `accountSignatories.signatories.${index}.lastName`,
		titlePrefix: 'Signatory',
	});
	const directorsTitle = (index: number) => ({
		firstName: `accountSignatories.directors.${index}.firstName`,
		lastName: `accountSignatories.directors.${index}.lastName`,
		titlePrefix: 'Individual',
	});
	const beneficialOwnersTitle = (index: number) => ({
		firstName: `accountSignatories.beneficialOwners.${index}.firstName`,
		lastName: `accountSignatories.beneficialOwners.${index}.lastName`,
		titlePrefix: 'Individual',
	});

	return (
		<>
			<FormHeader>
				<FormTitle>Account Signatories Summary</FormTitle>
				<FormSubHeader>Review your submissions for any inaccuracies</FormSubHeader>
			</FormHeader>
			<FormContent className='bg-white px-0 pt-0'>
				<div className='bg-neutral-50 space-y-[16px]'>
					<ReviewerSection
						sectionName='Account Signatories'
						applicantCount={signatoriesCount}
						editAction={editStep.bind(this, 'signatories')}
						fieldModel={signatoriesModel}
						accordionTitle={signatoriesTitle}
					/>
					<ReviewerSection
						sectionName='Proof of Identity'
						applicantCount={signatoriesCount}
						editAction={editStep.bind(this, 'proof of identity_account signatories')}
						fieldModel={proofOfIdentityModel$Corporate}
						accordionTitle={signatoriesTitle}
					/>
					<ReviewerSection
						sectionName='Politically Exposed Person (PEP) Self-certification'
						applicantCount={signatoriesCount}
						editAction={editStep.bind(this, 'pep')}
						fieldModel={pepModel$Corporate}
						accordionTitle={signatoriesTitle}
					/>
					<ReviewerSection
						sectionName='Directors'
						applicantCount={directorsCount}
						editAction={editStep.bind(this, 'directors')}
						fieldModel={directorsModel}
						accordionTitle={directorsTitle}
					/>
					<ReviewerSection
						sectionName='Beneficial Owners'
						applicantCount={beneficialOwnersCount}
						editAction={editStep.bind(this, 'beneficial owners')}
						fieldModel={beneficialOwnersModel}
						accordionTitle={beneficialOwnersTitle}
					/>
					<ReviewerSection
						sectionName='Affiliations'
						editAction={editStep.bind(this, 'affiliations')}
						fieldModel={affiliationsModel}
					/>
				</div>
			</FormContent>
		</>
	);
};

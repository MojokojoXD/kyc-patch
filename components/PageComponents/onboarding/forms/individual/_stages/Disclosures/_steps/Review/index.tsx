import { useFormContext } from 'react-hook-form';
import type { IndividualFormSchema } from '@/types/forms/individual';
import {
	ReviewBlock,
	ReviewHeader,
	ReviewContent,
} from '../../../../_components/ReviewParts';
import reviewMetadata from './stageReviewMetadata';
import {
	FormContent,
	FormHeader,
	FormSubHeader,
	FormTitle,
} from '@/components/UIcomponents/FormLayout';
import { useMemo } from 'react';
import { DisclosuresSteps } from '@/utils/vars/enums';

interface ReviewProps<TFormSteps> {
	jumpToStep: (step?: TFormSteps, returnStep?: TFormSteps) => void;
}

export default function Review({ jumpToStep }: ReviewProps<DisclosuresSteps>) {
	const { watch } = useFormContext<IndividualFormSchema>();

    const completedForm = useMemo( () => watch(), [ watch ] );
    
	return (
		<>
			<FormHeader>
				<FormTitle>Application Summary</FormTitle>
				<FormSubHeader>
					Review your submissions for any inaccuracies.
				</FormSubHeader>
			</FormHeader>
			<FormContent className='py-0 px-0 bg-neutral-50'>
				<div className='space-y-5'>
					{/* Disclosure signature Summary */}
					<ReviewBlock>
						<ReviewHeader
							title={reviewMetadata[0].header}
							editCallBack={jumpToStep.bind(
								this,
								reviewMetadata[0].step,
								DisclosuresSteps.REVIEW
							)}
						/>
						{completedForm.applicant.map((d, i) => (
							<ReviewContent
								key={d.id}
								triggerLabel={
									d.firstName + ' ' + d.middleName + ' ' + d.lastName
								}
								fields={reviewMetadata[0].field}
								formData={completedForm}
								index={i}
							/>
						))}
					</ReviewBlock>
					{/* Disclosure ratification Summary */}
					<ReviewBlock>
						<ReviewHeader
							title={reviewMetadata[1].header}
							editCallBack={jumpToStep.bind(
								this,
								reviewMetadata[1].step,
								DisclosuresSteps.REVIEW
							)}
						/>
						{completedForm.applicant.map((d, i) => (
							<ReviewContent
								key={d.id}
								triggerLabel={
									d.firstName + ' ' + d.middleName + ' ' + d.lastName
								}
								fields={reviewMetadata[1].field}
								formData={completedForm}
								index={i}
							/>
						))}
					</ReviewBlock>
					{/* Disclosure PEP Summary */}
					<ReviewBlock>
						<ReviewHeader
							title={reviewMetadata[2].header}
							editCallBack={jumpToStep.bind(
								this,
								reviewMetadata[2].step,
								DisclosuresSteps.REVIEW
							)}
						/>
						{completedForm.applicant.map((d, i) => (
							<ReviewContent
								key={d.id}
								triggerLabel={
									d.firstName + ' ' + d.middleName + ' ' + d.lastName
								}
								fields={reviewMetadata[2].field}
								formData={completedForm}
								index={i}
							/>
						))}
					</ReviewBlock>
					{/* Disclosure FATCA Summary */}
					<ReviewBlock>
						<ReviewHeader
							title={reviewMetadata[3].header}
							editCallBack={jumpToStep.bind(
								this,
								reviewMetadata[3].step,
								DisclosuresSteps.REVIEW
							)}
						/>
						{completedForm.applicant.map((d, i) => (
							<ReviewContent
								key={d.id}
								triggerLabel={
									d.firstName + ' ' + d.middleName + ' ' + d.lastName
								}
								fields={reviewMetadata[3].field}
								formData={completedForm}
								index={i}
							/>
						))}
					</ReviewBlock>
					{/* Kestrel Terms & Conditions Summary */}
					<ReviewBlock>
						<ReviewHeader
							title={reviewMetadata[4].header}
							editCallBack={jumpToStep.bind(
								this,
								reviewMetadata[4].step,
								DisclosuresSteps.REVIEW
							)}
						/>
						{completedForm.applicant.map((d, i) => (
							<ReviewContent
								key={d.id}
								triggerLabel={
									reviewMetadata[4].header
								}
								fields={reviewMetadata[4].field}
								formData={completedForm}
								index={i}
							/>
						))}
					</ReviewBlock>
					{/*Kestrel Nominee Agreement Summary */}
					<ReviewBlock>
						<ReviewHeader
							title={reviewMetadata[5].header}
							editCallBack={jumpToStep.bind(
								this,
								reviewMetadata[5].step,
								DisclosuresSteps.REVIEW
							)}
						/>
						{completedForm.applicant.map((d, i) => (
							<ReviewContent
								key={d.id}
								triggerLabel={
									d.firstName + ' ' + d.middleName + ' ' + d.lastName
								}
								fields={reviewMetadata[5].field}
								formData={completedForm}
								index={i}
							/>
						))}
					</ReviewBlock>
					{/*Afrinvest Email Indemnity Summary */}
					<ReviewBlock>
						<ReviewHeader
							title={reviewMetadata[6].header}
							editCallBack={jumpToStep.bind(
								this,
								reviewMetadata[6].step,
								DisclosuresSteps.REVIEW
							)}
						/>
						{completedForm.applicant.map((d, i) => (
							<ReviewContent
								key={d.id}
								triggerLabel={
									reviewMetadata[6].header
								}
								fields={reviewMetadata[6].field}
								formData={completedForm}
								index={i}
							/>
						))}
					</ReviewBlock>
					{/*Declaration Summary */}
					<ReviewBlock>
						<ReviewHeader
							title={reviewMetadata[7].header}
							editCallBack={jumpToStep.bind(
								this,
								reviewMetadata[7].step,
								DisclosuresSteps.REVIEW
							)}
						/>
						{completedForm.applicant.map((d, i) => (
							<ReviewContent
								key={d.id}
								triggerLabel={
									reviewMetadata[7].header
								}
								fields={reviewMetadata[7].field}
								formData={completedForm}
								index={i}
							/>
						))}
					</ReviewBlock>
					{/*Declaration Summary */}
					<ReviewBlock>
						<ReviewHeader
							title={reviewMetadata[8].header}
							editCallBack={jumpToStep.bind(
								this,
								reviewMetadata[8].step,
								DisclosuresSteps.REVIEW
							)}
						/>
						{completedForm.applicant.map((d, i) => (
							<ReviewContent
								key={d.id}
								triggerLabel={
									reviewMetadata[8].header
								}
								fields={reviewMetadata[8].field}
								formData={completedForm}
								index={i}
							/>
						))}
					</ReviewBlock>
				</div>
			</FormContent>
		</>
	);
}

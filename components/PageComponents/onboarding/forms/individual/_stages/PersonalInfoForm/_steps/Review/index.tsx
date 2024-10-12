import { useFormContext } from 'react-hook-form';
import type { IndividualFormSchema } from '@/types/forms/individual';
import {
	ReviewBlock,
	ReviewHeader,
	ReviewContent,
} from '../../../../_components/ReviewParts';
import { default as reviewMetadata } from './stageReviewMetaData';
import {
	FormContent,
	FormHeader,
	FormSubHeader,
	FormTitle,
} from '@/components/UIcomponents/FormLayout';
import { PersonalInformationSteps } from '@/utils/vars/enums';
import { useMemo } from 'react';
import type { FormStep } from '@/types/Components/onboarding';

export const Review: FormStep = () => {
	const { watch, getValues } = useFormContext<IndividualFormSchema>();

	const completedForm = useMemo(() => watch(), [watch]);

	console.log(getValues());

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
					{/* Retail Client Summary*/}
					<ReviewBlock>
						<ReviewHeader
							title={reviewMetadata[0].header}
							editCallBack={jumpToStep.bind(
								this,
								reviewMetadata[0].step,
								PersonalInformationSteps.REVIEW
							)}
						/>
						<ReviewContent
							triggerLabel={reviewMetadata[0].header}
							fields={reviewMetadata[0].field}
							formData={completedForm}
						/>
					</ReviewBlock>
					{/* Investment Category Summary*/}
					<ReviewBlock>
						<ReviewHeader
							title={reviewMetadata[1].header}
							editCallBack={jumpToStep.bind(
								this,
								reviewMetadata[1].step,
								PersonalInformationSteps.REVIEW
							)}
						/>
						<ReviewContent
							triggerLabel={reviewMetadata[1].header}
							fields={reviewMetadata[1].field}
							formData={completedForm}
						/>
					</ReviewBlock>
					{/* Bio Summary */}
					<ReviewBlock>
						<ReviewHeader
							title={reviewMetadata[2].header}
							editCallBack={jumpToStep.bind(
								this,
								reviewMetadata[2].step,
								PersonalInformationSteps.REVIEW
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
					{/* Contact Summary */}
					<ReviewBlock>
						<ReviewHeader
							title={reviewMetadata[3].header}
							editCallBack={jumpToStep.bind(
								this,
								reviewMetadata[3].step,
								PersonalInformationSteps.REVIEW
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
					{/* Employment Summary */}
					<ReviewBlock>
						<ReviewHeader
							title={reviewMetadata[5].header}
							editCallBack={jumpToStep.bind(
								this,
								reviewMetadata[5].step,
								PersonalInformationSteps.REVIEW
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
					{/* Proof of Identity Summary */}
					<ReviewBlock>
						<ReviewHeader
							title={reviewMetadata[6].header}
							editCallBack={jumpToStep.bind(
								this,
								reviewMetadata[6].step,
								PersonalInformationSteps.REVIEW
							)}
						/>
						{completedForm.applicant.map((d, i) => (
							<ReviewContent
								key={d.id}
								triggerLabel={
									d.firstName + ' ' + d.middleName + ' ' + d.lastName
								}
								fields={reviewMetadata[6].field}
								formData={completedForm}
								index={i}
							/>
						))}
					</ReviewBlock>
					{/* Risk Profile Summary */}
					<ReviewBlock>
						<ReviewHeader
							title={reviewMetadata[7].header}
							editCallBack={jumpToStep.bind(
								this,
								reviewMetadata[7].step,
								PersonalInformationSteps.REVIEW
							)}
						/>
						{completedForm.applicant.map((d, i) => (
							<ReviewContent
								key={d.id}
								triggerLabel={
									d.firstName + ' ' + d.middleName + ' ' + d.lastName
								}
								fields={reviewMetadata[7].field}
								formData={completedForm}
								index={i}
							/>
						))}
					</ReviewBlock>
				</div>
			</FormContent>
		</>
	);
};

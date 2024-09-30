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
import { NextOfKinSteps } from '@/utils/vars/enums';
import { useMemo } from 'react';

interface ReviewProps<TFormSteps> {
	jumpToStep: (step?: TFormSteps, returnStep?: TFormSteps) => void;
}

export default function Review({ jumpToStep }: ReviewProps<NextOfKinSteps>) {
	const { watch,getValues } = useFormContext<IndividualFormSchema>();

    const completedForm = useMemo( () => watch(), [ watch ] );
    
    console.log( getValues() );
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
					{/* Next of Kin Bio Summary */}
					<ReviewBlock>
						<ReviewHeader
							title={reviewMetadata[0].header}
							editCallBack={jumpToStep.bind(
								this,
								reviewMetadata[0].step,
								NextOfKinSteps.REVIEW
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
					{/* Next of Kin Contact Summary */}
					<ReviewBlock>
						<ReviewHeader
							title={reviewMetadata[1].header}
							editCallBack={jumpToStep.bind(
								this,
								reviewMetadata[1].step,
								NextOfKinSteps.REVIEW
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
					{/* Next of Kin Proof of Identity Summary */}
					<ReviewBlock>
						<ReviewHeader
							title={reviewMetadata[2].header}
							editCallBack={jumpToStep.bind(
								this,
								reviewMetadata[2].step,
								NextOfKinSteps.REVIEW
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
				</div>
			</FormContent>
		</>
	);
}

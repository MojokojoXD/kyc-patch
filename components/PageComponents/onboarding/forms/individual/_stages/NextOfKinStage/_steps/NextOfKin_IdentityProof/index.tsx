import { useFormContext } from 'react-hook-form';
import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/UIcomponents/ui/accordion';
import { useMemo } from 'react';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import { Button } from '@/components/UIcomponents/ui/button';
import type { IndividualFormSchema } from '@/types/forms/individual';
import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import { NOK_identifyProofFieldsModel } from './formBuilder/NOK_identityProofFieldModel';
import FormFactory from '@/components/UIcomponents/FormFactory';

export const NextOfKin_IdentityProof: FormStep = ({ formAction }) => {
	const { getValues } = useFormContext<IndividualFormSchema>();

	const nextOfKins = getValues(`nextOfKin`);

	return (
		<>
			<FormHeader>
				<div className='flex justify-between items-center'>
					<FormTitle>Next of Kin - Proof of Identity</FormTitle>
					<Button
						variant={'outline'}
						onClick={() => formAction({ type: 'next' })}>
						Skip
					</Button>
				</div>
				<FormSubHeader>
					Enter the ID information of your next of kin.
				</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-[8px] py-5'>
					{nextOfKins.map((n, i) => (
						<Accordion
							key={i}
							type='single'
							defaultValue='item-0'
							collapsible>
							<AccordionItem value={`item-${i}`}>
								<AccordionTrigger>
									Applicant #{i + 1}: {n.firstName} {n.lastName}
								</AccordionTrigger>
								<AccordionContent
									className='data-[state=closed]:hidden pb-16'
									forceMount>
									<NextOfKin_IdentityProofForm applicantId={i} />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</div>
			</FormContent>
		</>
	);
};

interface NextOfKin_IdentityProofFormProps
	extends SingleFormFieldsGeneratorProps {}

function NextOfKin_IdentityProofForm({
	applicantId,
}: NextOfKin_IdentityProofFormProps) {
	const fields = useMemo(
		() =>
			NOK_identifyProofFieldsModel({
				index: applicantId,
			}),
		[applicantId]
	);

	return (
		<>
			{fields.map((f) => (
				<FormFactory
					key={f.name}
					{...f}
				/>
			))}
		</>
	);
}

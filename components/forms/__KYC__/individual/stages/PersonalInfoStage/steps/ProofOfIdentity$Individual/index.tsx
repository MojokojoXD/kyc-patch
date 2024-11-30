import { useFormContext } from 'react-hook-form';
import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { useMemo } from 'react';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/forms/FormLayout';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import { proofOfIdentityModel$Individual } from './model/proofOfIdentityModel$Individual';
import FormFactory from '@/components/forms/FormFactory';

export const ProofOfIdentity$Individual: FormStep = () => {
	const { getValues } = useFormContext<IndividualFormSchema>();

	const applicants = getValues('applicant') || [{}];

	return (
		<>
			<FormHeader>
				<FormTitle>Proof of Identity</FormTitle>
				<FormSubHeader>Enter your ID information.</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-[8px] py-5'>
					{applicants.map((a, i) => (
						<Accordion
							key={a.id}
							type='single'
							defaultValue='item-0'
							collapsible>
							<AccordionItem value={`item-${i}`}>
								<AccordionTrigger>
									Applicant #{i + 1}: {a.firstName} {a.lastName}
								</AccordionTrigger>
								<AccordionContent
									className='data-[state=closed]:hidden pb-16 overflow-visible'
									forceMount>
									<IdentityForm applicantId={i} />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</div>
			</FormContent>
		</>
	);
};

interface IdentityFormProps extends SingleFormFieldsGeneratorProps {}

function IdentityForm({ applicantId }: IdentityFormProps) {
	const fields = useMemo(() => {
		return proofOfIdentityModel$Individual({
			index: applicantId,
		});
	}, [applicantId]);

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

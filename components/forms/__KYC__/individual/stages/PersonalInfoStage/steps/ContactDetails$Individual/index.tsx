import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/ui/accordion';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/forms/FormLayout';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import { useMemo } from 'react';
import FormFactory from '@/components/forms/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import { contactDetailsModel$Individual } from './model/contactDetailsModel$Individual';
import { FormFieldAggregator } from '@/components/forms/utils/FormFieldAggregator';
import { useKYCFormContext } from '@/components/forms/utils/formController';

export const ContactDetail$Individual: FormStep = () => {
	const {
		form: { getValues },
	} = useKYCFormContext<IndividualFormSchema>();

	const applicants = getValues('applicant') ?? [];

	return (
		<>
			<FormHeader>
				<FormTitle>Contact Details</FormTitle>
				<FormSubHeader>Enter your contact information.</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-[8px] py-5'>
					{applicants.map((a, i) => {
						return (
							<Accordion
								key={a.id}
								type='single'
								defaultValue={`item-0`}
								collapsible>
								<AccordionItem value={`item-${i}`}>
									<AccordionTrigger>
										Applicant #{i + 1}: {a.firstName} {a.lastName}
									</AccordionTrigger>
									<AccordionContent
										className='data-[state=closed]:hidden py-10'
										forceMount>
										<ContactForm
											applicantId={i}
										/>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						);
					})}
				</div>
			</FormContent>
		</>
	);
};

type ContactFormProps = SingleFormFieldsGeneratorProps & object;

function ContactForm({ applicantId}: ContactFormProps) {
	const aggregatorResult = useMemo(() => {
		const rawFields = contactDetailsModel$Individual({
			index: applicantId,
		});
		const aggregator = new FormFieldAggregator(rawFields);

		return aggregator.generate();
	}, [applicantId]);

	return (
		<>
			{aggregatorResult.map((f) => (
				<FormFactory
					key={f.name as string}
					{...f}
				/>
			))}
		</>
	);
}

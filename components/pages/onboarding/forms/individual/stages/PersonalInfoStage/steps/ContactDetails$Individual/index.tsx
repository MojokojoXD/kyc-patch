import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/UIcomponents/ui/accordion';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import { useMemo } from 'react';
import FormFactory from '@/components/UIcomponents/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import { contactDetailsModel$Individual } from './model/contactDetailsModel$Individual';
import { FormFieldAggregator } from '@/components/pages/onboarding/forms/utils/FormFieldAggregator';
import { useKYCFormContext } from '@/components/pages/onboarding/forms/utils/formController';

export const ContactDetail$Individual: FormStep = ({ countryList }) => {
    const { form: { getValues } } = useKYCFormContext<IndividualFormSchema>();

    const applicants = getValues( 'applicant' ) ?? [];

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
											countryList={countryList}
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

function ContactForm({ applicantId, countryList = [] }: ContactFormProps) {
	const aggregatorResult = useMemo(() => {
		const rawFields = contactDetailsModel$Individual({
			index: applicantId,
			countryList,
		});
		const aggregator = new FormFieldAggregator(rawFields);

		return aggregator.generate();
	}, [applicantId, countryList]);

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

import { useFormContext } from 'react-hook-form';
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
import type { IndividualFormSchema } from '@/types/forms/individual';
// import { FormHelpers } from '@/utils/clientActions/formHelpers';
import { useMemo } from 'react';
import FormFactory from '@/components/UIcomponents/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import { contactFieldsModel } from './formBuilder/contactFormFields';
import { FormFieldAggregator } from '@/components/PageComponents/onboarding/forms/individual/utils/FormFieldAggregator';

export const Contacts: FormStep = ({
	applicantCount,
	broker,
	countryList,
}) => {
	const { getValues } = useFormContext<IndividualFormSchema>();

	return (
		<>
			<FormHeader>
				<FormTitle>Contact Details</FormTitle>
				<FormSubHeader>Enter your contact information.</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-[8px] py-5'>
					{[...Array(applicantCount).keys()].map((c, i) => {
						const firstName = getValues(`applicant.${i}.firstName`);
						const lastName = getValues(`applicant.${i}.lastName`);

						return (
							<Accordion
								key={c}
								type='single'
								defaultValue={`item-0`}
								collapsible>
								<AccordionItem value={`item-${c}`}>
									<AccordionTrigger>
										Applicant #{c + 1}: {firstName} {lastName}
									</AccordionTrigger>
									<AccordionContent
										className='data-[state=closed]:hidden pb-16'
										forceMount>
										<ContactForm
											applicantId={i}
											broker={broker}
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

function ContactForm({
	applicantId,
	countryList = [],
}: ContactFormProps) {
	// const { getValues } = useFormContext<IndividualFormSchema>();

	// const currentClientResidence = getValues(
	// 	`applicant.${applicantId}.countryOfResidence`
	// );

	// const clientCountryCode = FormHelpers.getCodeFromFullCountryName(
	// 	currentClientResidence,
	// 	countryList
	// );

	const aggregatorResult = useMemo(() => {
		const rawFields = contactFieldsModel({
			index: applicantId,
			countryList,
		});
		const aggregator = new FormFieldAggregator(rawFields);

		return aggregator.generate();
	}, [applicantId, countryList]);

	return (
		<>
			{aggregatorResult.fields.map((f) => (
				<FormFactory
					key={f.name as string}
					{...f}
				/>
			))}
		</>
	);
}

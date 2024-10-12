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
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import { useMemo } from 'react';
import FormFactory from '@/components/UIcomponents/FormFactory';
import { generateContactFields } from './formBuilder/contactFormFields';
import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import { contactFieldsModel } from './formBuilder/contactFormFields';
import { FormFieldAggregator } from '@/components/PageComponents/onboarding/forms/utils/FormFieldAggregator';

export const Contacts: FormStep = ({
	applicantCount,
	passBrokerInfo,
	passCountryList,
}) => {
	const { getValues } = useFormContext<IndividualFormSchema>();

	const countryList = passCountryList?.call(this, true);
	const broker = passBrokerInfo?.call(this, true);

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
										className='data-[state=closed]:hidden'
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

type ContactFormProps = SingleFormFieldsGeneratorProps &
	Record<string, never>;

function ContactForm({
	applicantId,
	broker,
	countryList,
}: ContactFormProps )
{
	const { getValues } = useFormContext<IndividualFormSchema>();

	const currentClientResidence =
		getValues(`applicant.${applicantId}.countryOfResidence`);

	const clientCountryCode =
		FormHelpers.getCodeFromFullCountryName(
			currentClientResidence,
			countryList
		) ;

	const aggregatorResult = useMemo(() => {
		const aggregator = new FormFieldAggregator(contactFieldsModel).init(
			broker.org_code,
			{
				index: applicantId,
				countryList,
			}
        );
        
		aggregator.modifyFields('optional-contact', {
			required: broker?.org_code === 'DATAB',
		});

		aggregator.modifyFields('residence-contact', {
			remove: clientCountryCode !== 'GH' && broker?.org_code !== 'DATAB',
			required: broker.org_code !== 'DATAB',
		});

		return aggregator.generate();
	}, [clientCountryCode, applicantId, broker, countryList]);

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

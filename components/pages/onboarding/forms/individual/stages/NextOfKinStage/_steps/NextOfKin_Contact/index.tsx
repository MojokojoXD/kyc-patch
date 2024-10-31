import { useFormContext } from 'react-hook-form';
import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/UIcomponents/ui/accordion';
import { useMemo } from 'react';
import { NOK_contactFieldsModel } from './formBuilder/NOK_contactFieldModel';
import FormFactory from '@/components/UIcomponents/FormFactory';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import type { IndividualFormSchema } from '@/types/forms/individual';
import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';

export const NextOfKinContacts: FormStep = ({ countryList }) => {
	const { getValues } = useFormContext<IndividualFormSchema>();
	const nextOfKins = getValues(`nextOfKin`);

	return (
		<>
			<FormHeader>
				<FormTitle>Next of Kin - Contact Details</FormTitle>
				<FormSubHeader>
					Enter the contact information of your next of kin.
				</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-[8px] py-5'>
					{nextOfKins.map((c, i) => {
					
						return (
							<Accordion
								key={i}
                                type='single'
                                defaultValue='item-0'
								collapsible>
								<AccordionItem value={`item-${i}`}>
									<AccordionTrigger>
										Next of Kin #{i + 1}: {c.firstName} {c.lastName}
									</AccordionTrigger>
									<AccordionContent
										className='data-[state=closed]:hidden pb-16'
										forceMount>
										<NextOfKinContactForm
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

interface NextOfKinContactFormProps
	extends SingleFormFieldsGeneratorProps {}

function NextOfKinContactForm({
	applicantId,
	countryList,
}: NextOfKinContactFormProps) {
	const fields = useMemo(
		() =>
			NOK_contactFieldsModel({
				index: applicantId,
				countryList,
			}),
		[applicantId, countryList]
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

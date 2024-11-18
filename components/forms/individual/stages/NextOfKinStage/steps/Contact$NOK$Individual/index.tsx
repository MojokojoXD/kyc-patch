import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { useMemo } from 'react';
import { contactModel$NOK$Individual } from './model/contactModel$NOK$Individual';
import FormFactory from '@/components/FormFactory';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
	FormAutopopulate,
} from '@/components/FormLayout';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import { useKYCFormContext } from '@/components/forms/utils/formController';

export const Contact$NOK$Individual: FormStep = ({ countryList }) => {
	const {
		form: { getValues },
	} = useKYCFormContext<IndividualFormSchema>();

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
					{nextOfKins.map((n, i) => {
						return (
							<Accordion
								key={n.id}
								type='single'
								defaultValue='item-0'
								collapsible>
								<AccordionItem value={`item-${i}`}>
									<AccordionTrigger>
										Next of Kin #{i + 1}: {n.firstName} {n.lastName}
									</AccordionTrigger>
									<AccordionContent
										className='data-[state=closed]:hidden py-10'
										forceMount>
										<FormAutopopulate
											formIndex={i}
											srcFields={contactModel$NOK$Individual({ index: 0 })}
											srcPath='nextOfKin'
											render={(index) => (
												<NOKContactForm
													applicantId={index}
													countryList={countryList}
												/>
											)}
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

interface NOKContactFormProps extends SingleFormFieldsGeneratorProps {}

function NOKContactForm({ applicantId, countryList }: NOKContactFormProps) {
	const fields = useMemo(
		() =>
			contactModel$NOK$Individual({
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

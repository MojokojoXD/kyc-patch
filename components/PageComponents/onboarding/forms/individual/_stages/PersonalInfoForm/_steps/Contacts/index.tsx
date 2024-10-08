import { useFormContext } from 'react-hook-form';
import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/UIcomponents/ui/accordion';
import Image from 'next/image';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import type { IndividualFormSchema } from '@/types/forms/individual';
import type { Country } from '@/types/forms/universal';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import { useMemo, useContext } from 'react';
import { UserContext } from '@/Contexts/UserProfileProvider';
import type { BrokerDetails } from '@/types/forms/broker';
import FormFactory from '@/components/UIcomponents/FormFactory';
import { generateContactFields } from './formBuilder/contactFormFields';
import type { SingleCategoryForm } from '../BiographicalInfo';

export default function Contacts() {
	const form = useFormContext<IndividualFormSchema>();
	const { watch,getValues } = form;

    const applicantCount = watch( '_formMetadata.applicantCount' );

	const appWideData = useContext(UserContext);

	const facts = appWideData?.onboardingFacts;

	return (
		<>
			<FormHeader>
				<FormTitle>Contact Details</FormTitle>
				<FormSubHeader>Enter your contact information.</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-[8px]'>
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
											brokerInfo={facts?.broker}
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
}

type ContactFormProps = Omit<SingleCategoryForm, 'countryList'> & {
	brokerInfo?: BrokerDetails;
};

function ContactForm({ applicantId, brokerInfo }: ContactFormProps) {
	const { watch } = useFormContext<IndividualFormSchema>();

	const currentClientResidence = watch(
		`applicant.${applicantId}.countryOfResidence`
    );
    
    const clientCountryCode = FormHelpers.getCodeFromFullCountryName( currentClientResidence ) || '';

	const fields = useMemo(() =>
		generateContactFields(
			applicantId,
			brokerInfo?.org_code || '',
			clientCountryCode
		), [ clientCountryCode,applicantId,brokerInfo ]
	);

	return (
		<>
			{fields.map((f) => (
				<FormFactory
                    key={ f.name as string }
					{...f}
				/>
			))}
		</>
	);
}

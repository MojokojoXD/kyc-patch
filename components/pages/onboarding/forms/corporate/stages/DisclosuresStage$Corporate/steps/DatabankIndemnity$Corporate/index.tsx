import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/UIcomponents/ui/accordion';
import {
	FormHeader,
	FormTitle,
	FormContent,
	FormText,
} from '@/components/UIcomponents/FormLayout';
import type { CorporateFormSchema } from '@/types/forms/corporateSchema';
import FormFactory from '@/components/UIcomponents/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';
import Markdown from 'react-markdown';
import { useKYCFormContext } from '@/components/pages/onboarding/forms/utils/formController';
import { databankIndemnityModel$Corporate } from './model/databankIndemnityModel$Corporate';
import { useFetchMarkdown } from '@/components/pages/onboarding/forms/utils/customHooks/useFetchMarkdown';
import { Ellipsis } from 'lucide-react';

export const DatabankEmailIndemnity$Corporate: FormStep = () => {
	const {
		form: { getValues },
		clientID,
	} = useKYCFormContext<CorporateFormSchema>();

	const [termsText, isLoading, error] = useFetchMarkdown(
		'databankEmailIndemnity'
	);

	const signatories = getValues('accountSignatories.signatories') || [{}];

	if (error) {
		console.error(error);
		return (
			<p className='p-10'>Failed to load resource. Please try again later!</p>
		);
	}

	return (
		<>
			<FormHeader>
				<FormTitle>Email Indemnity - Databank Brokerage Limited</FormTitle>
			</FormHeader>
			<FormContent>
				{signatories.map((s, i) => {
					const signatoryFirstName = s.firstName ?? '';
					const signatoryLastName = s.lastName ?? '';

					return (
						<Accordion
							collapsible
							key={s.id}
							type={'single'}
							defaultValue='item-0'>
							<AccordionItem value={`item-${i}`}>
								<AccordionTrigger>
									Signatory #{i + 1} {signatoryFirstName} {signatoryLastName}
								</AccordionTrigger>
								<AccordionContent
									className='data-[state=closed]:hidden'
									forceMount>
									<>
										<FormText className=' [&_ol]:list-[decimal] [&_h2]:paragraph2Medium [&_h3]:paragraph2Medium space-y-[16px] [&_ol_ul]:space-y-[16px] [&_li>ul]:list-disc [&_li>ul]:list-outside'>
											{isLoading ? (
												<Ellipsis className='h-5 w-5 animate-pulse' />
											) : (
												<Markdown skipHtml>{termsText as string}</Markdown>
											)}
										</FormText>
										{databankIndemnityModel$Corporate({ index: i, clientID }).map((f) => (
											<FormFactory
												key={f.name}
												{...f}
											/>
										))}
									</>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					);
				})}
			</FormContent>
		</>
	);
};

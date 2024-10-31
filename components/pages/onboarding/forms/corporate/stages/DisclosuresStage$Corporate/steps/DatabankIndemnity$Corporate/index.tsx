import { useEffect, useState } from 'react';
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
import FormFactory from '@/components/UIcomponents/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';
import Markdown from 'react-markdown';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import { useKYCFormContext } from '@/components/pages/onboarding/forms/utils/formController';
import type { Signatory } from '@/types/forms/corporateSchema';
import { databankIndemnityModel$Corporate } from './model/databankIndemnityModel$Corporate';

export const DatabankEmailIndemnity$Corporate: FormStep = () => {
	const [termsText, setTermsText] = useState('');
	const [isFetching, setIsFetching] = useState(false);

	const { form, clientID } = useKYCFormContext();
	const { getValues } = form;

	const signatories = (getValues(
		'accountSignatories.signatories'
	) as Signatory[]) || [{ firstName: 'john', lastName: 'doe' }];

	useEffect(() => {
		const fetchText = async () => {
			setIsFetching(true);
			const result = await FormHelpers.fetchMarkdown('databankEmailIndemnity');
			result && setTermsText(result);
			setIsFetching(false);
		};

		fetchText();
	}, []);

	return (
		<>
			<FormHeader>
				<FormTitle>Email Indemnity - Databank Brokerage Limited</FormTitle>
			</FormHeader>
			<FormContent>
				{signatories.map((s, i) => {
					const signatoryFirstName = s.firstName ?? 'John';
					const signatoryLastName = s.lastName ?? 'Doe';

					return (
						<Accordion
							collapsible
							key={i}
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
											<Markdown skipHtml>{isFetching ? '...loading' : termsText}</Markdown>
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

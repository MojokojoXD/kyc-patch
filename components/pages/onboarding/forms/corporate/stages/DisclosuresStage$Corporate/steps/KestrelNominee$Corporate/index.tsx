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
import type { CorporateFormSchema } from '@/types/forms/corporateSchema';
import Markdown from 'react-markdown';
import { kestrelNomineeModel$Corporate } from './model/kestrelNomineeModel$Corporate';
import { useKYCFormContext } from '@/components/pages/onboarding/forms/utils/formController';
import { Ellipsis } from 'lucide-react';
import { useFetchMarkdown } from '@/components/pages/onboarding/forms/utils/customHooks/useFetchMarkdown';
import { format } from 'date-fns';

const today = format(new Date(), 'M/d/yy');

export const KestrelNorminee$Corporate: FormStep = () => {
	const { form, clientID } = useKYCFormContext<CorporateFormSchema>();
	const { getValues } = form;

	const [kestrelNomineeText, isLoading, error] =
		useFetchMarkdown('kestrelNominee');

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
				<FormTitle>
					Nominee Agreement - Kestrel Capital Nominees Services LTD
				</FormTitle>
			</FormHeader>
			<FormContent>
				{signatories.map((s, i) => {
					const signatoryFirstName = s.firstName ?? '';
					const signatoryLastName = s.lastName ?? '';
					const signatoryMiddleName = s.middleName ?? '';
					const signatoryIDNumber = s.proofOfIdentity?.idNumber ?? '';
					const signatoryAddress = s.address?.residentialAddress ?? '';
					const signatoryCity = s.address?.city ?? '';

					const signatoryGist = `
Name: ${signatoryFirstName} ${signatoryMiddleName} ${signatoryLastName}\\
IDNumber: ${signatoryIDNumber}\\
Address: ${signatoryAddress}\\
City: ${signatoryCity}
`;

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
										<FormText className=' [&_ol]:list-[decimal] [&_h2]:paragraph2Medium [&_h3]:paragraph2Medium space-y-[16px] [&_ol_ul]:space-y-[16px] max-h-[424px] overflow-auto [&_li>ul]:list-disc [&_li>ul]:list-outside'>
											{isLoading ? (
												<Ellipsis className='w-5 h-5 animate-pulse' />
											) : (
												<Markdown skipHtml>
													{(kestrelNomineeText as string)
														.replace('{{applicantGist}}', signatoryGist)
														.replace('{{date}}', today)}
												</Markdown>
											)}
										</FormText>
										{kestrelNomineeModel$Corporate({ index: i, clientID }).map((f) => (
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

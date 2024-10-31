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
import { kestrelNomineeModel$Corporate } from './model/kestrelNomineeModel$Corporate';
import { useKYCFormContext } from '@/components/pages/onboarding/forms/utils/formController';
import type { Signatory } from '@/types/forms/corporateSchema';

export const KestrelNorminee$Corporate: FormStep = () => {
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
			const result = await FormHelpers.fetchMarkdown('kestrelNominee');
			result && setTermsText(result);
			setIsFetching(false);
		};

		fetchText();
	}, []);

	return (
		<>
			<FormHeader>
				<FormTitle>
					Nominee Agreement - Kestrel Capital Nominees Services LTD
				</FormTitle>
			</FormHeader>
			<FormContent>
				{signatories.map((s, i) => {
					const signatoryFirstName = s.firstName ?? 'John';
					const signatoryLastName = s.lastName ?? 'Doe';
					const signatoryMiddleName = s.middleName ?? '';
					const signatoryIDNumber = s.proofOfIdentity?.idNumber ?? '';
					const signatoryAddress = s.address?.residentialAddress ?? 'some address';
					const signatoryCity = s.address?.city ?? 'some city';

					const signatoryGist = `
Name: ${signatoryFirstName} ${signatoryMiddleName} ${signatoryLastName}\\
IDNumber: ${signatoryIDNumber}\\
Address: ${signatoryAddress}\\
City: ${signatoryCity}
`;

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
										<FormText className=' [&_ol]:list-[decimal] [&_h2]:paragraph2Medium [&_h3]:paragraph2Medium space-y-[16px] [&_ol_ul]:space-y-[16px] max-h-[424px] overflow-auto [&_li>ul]:list-disc [&_li>ul]:list-outside'>
											<Markdown skipHtml>
												{isFetching
													? '...loading'
													: termsText.replace('{{signatoryGist}}', signatoryGist)}
											</Markdown>
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

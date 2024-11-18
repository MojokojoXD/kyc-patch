import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/ui/accordion';
import {
	FormHeader,
	FormTitle,
	FormContent,
	FormText,
} from '@/components/FormLayout';
import type { CorporateFormSchema } from '@/types/forms/corporateSchema';
import FormFactory from '@/components/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';
import Markdown from 'react-markdown';
import { useKYCFormContext } from '@/components/forms/utils/formController';
import { databankIndemnityModel$Corporate } from './model/databankIndemnityModel$Corporate';
import { useFetchMarkdown } from '@/components/forms/utils/customHooks/useFetchMarkdown';
import { Ellipsis } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FormLabel } from '@/components/ui/form';

export const DatabankEmailIndemnity$Corporate: FormStep = () => {
	const {
		form: { getValues },
		formVars: { clientID },
	} = useKYCFormContext<CorporateFormSchema>();

	const [termsText, isLoading, error] = useFetchMarkdown(
		'databankEmailIndemnity'
	);

	const companyName = getValues('businessInfo.details.name') ?? '';
	const signatories = getValues('accountSignatories.signatories') ?? [{}];

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
					const title =
						!s.title || !s.title.presets
							? ''
							: s.title?.presets === 'Other'
							? s.title?.other
							: s.title.presets;

					const address = `${s.address.residentialAddress}, ${s.address.city} ${s.countryOfResidence}`;

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
										<FormText>
											{isLoading ? (
												<Ellipsis className='h-5 w-5 animate-pulse' />
											) : (
												<Markdown skipHtml>
													{(termsText as string)
														.replaceAll('{{var1}}', companyName)
														.replaceAll('{{var2}}', title ?? '')}
												</Markdown>
											)}
										</FormText>
										<FormLabel
											htmlFor='indemnity__address'
											className='space-y-2.5'>
											<span>Your Home Address</span>
											<Input
												disabled
												value={address}
												className='capitalize'
												id='indemnity__address'
											/>
										</FormLabel>
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

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
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import FormFactory from '@/components/UIcomponents/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';
import Markdown from 'react-markdown';
import { useKYCFormContext } from '@/components/pages/onboarding/forms/utils/formController';
import { databankIndemnityModel$Individual } from './model/databankIndemnityModel$Individual';
import { useFetchMarkdown } from '@/components/pages/onboarding/forms/utils/customHooks/useFetchMarkdown';
import { Ellipsis } from 'lucide-react';
import { Input } from '@/components/UIcomponents/ui/input';
import { FormLabel } from '@/components/UIcomponents/ui/form';

export const DatabankEmailIndemnity$Individual: FormStep = () => {
	const {
		form: { getValues },
		formVars: { clientID },
	} = useKYCFormContext<IndividualFormSchema>();

	const [termsText, isLoading, error] = useFetchMarkdown(
		'databankEmailIndemnity'
	);

    const applicants = getValues( 'applicant' ) ?? [ {} ];
    const clientType = getValues( 'clientType' )

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
				{applicants.map((a, i) => {
					const clientFirstName = a.firstName ?? '';
					const clientLastName = a.lastName ?? '';
					const clientMiddleName = a.middleName ?? '';

					const fullName = `${clientFirstName} ${clientMiddleName} ${clientLastName}`;

					return (
						<Accordion
							collapsible
							key={a.id}
							type={'single'}
							defaultValue='item-0'>
							<AccordionItem value={`item-${i}`}>
								<AccordionTrigger>
									Applicant #{i + 1} {clientFirstName} {clientLastName}
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
														.replaceAll('{{var1}}', fullName)
														.replaceAll('{{var2}}', clientType === 'Individual' ? 'Myself' : 'Ourselves')}
												</Markdown>
											)}
										</FormText>
										<FormLabel
											htmlFor='indemnity__address'
											className='space-y-2.5'>
											<span>Your Home Address</span>
											<Input
												disabled
												value={a.contacts?.residentialAddress ?? ''}
												id='indemnity__address'
											/>
										</FormLabel>
										{databankIndemnityModel$Individual({ index: i, clientID }).map(
											(f) => (
												<FormFactory
													key={f.name}
													{...f}
												/>
											)
										)}
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

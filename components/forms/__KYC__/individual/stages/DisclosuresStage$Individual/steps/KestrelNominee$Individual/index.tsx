import Markdown from 'react-markdown';
import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Ellipsis } from 'lucide-react';
import {
	FormHeader,
	FormTitle,
	FormContent,
	FormText,
} from '@/components/forms/FormLayout';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import type { FormStep } from '@/types/Components/onboarding';
import { format } from 'date-fns';
import { kestrelNomineeModel$Individual } from './model/kestrelNomineeModel$Individual';
import FormFactory from '@/components/forms/FormFactory';
import { useKYCFormContext } from '@/components/forms/utils/formController';
import { useFetchMarkdown } from '@/components/forms/utils/customHooks/useFetchMarkdown';

export const KestrelNominee$Individual: FormStep = () => {
	const {
		form: { getValues },
		formVars: { clientID },
	} = useKYCFormContext<IndividualFormSchema>();

	const [kestrelNomineeText, isLoading, error] =
		useFetchMarkdown('kestrelNominee');

	const applicants = getValues('applicant') || [
		{
			firstName: '',
			lastName: '',
		},
	];

	if (error) {
		console.error(error);
		return <p>Failed to load resource. Try again later!</p>;
	}

	return (
		<>
			<FormHeader>
					<FormTitle>
						Nominee Agreement - Kestrel Capital Nominees Services LTD
					</FormTitle>
			</FormHeader>
			<FormContent>
				<div className='space-y-10 py-5'>
					{applicants.map((a, i) => (
						<Accordion
							key={a.id}
							type='single'
							defaultValue='item-0'
							collapsible>
							<AccordionItem value={`item-${i}`}>
								<AccordionTrigger>
									Applicant #{i + 1}: {a.firstName} {a.lastName}
								</AccordionTrigger>
								<AccordionContent
									className='data-[state=closed]:hidden pb-16'
									forceMount>
									<KestrelNomineeForm
										applicantId={i}
										clientID={clientID}
										kestrelNomineeText={kestrelNomineeText as string}
										isLoading={isLoading}
									/>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</div>
			</FormContent>
		</>
	);
};

interface KestrelNomineeFormProps extends SingleFormFieldsGeneratorProps {
	clientID?: string;
	kestrelNomineeText: string;
	isLoading: boolean;
}

function KestrelNomineeForm({
	applicantId,
	clientID,
	kestrelNomineeText = '',
	isLoading,
}: KestrelNomineeFormProps) {
	const {
		form: { getValues },
	} = useKYCFormContext<IndividualFormSchema>();

	const {
		firstName = '',
		middleName = '',
		lastName = '',
		countryOfResidence = '',
		proofOfIdentity,
		contacts,
	} = getValues(`applicant.${applicantId}`) || {
		firstName: '',
		middleName: '',
		lastName: '',
		countryOfResidence: '',
	};

	const { idNumber } = proofOfIdentity || { idNumber: '' };
	const { residentialAddress, city } = contacts || {
		residentialAddress: '',
		city: '',
	};

	const today = format(new Date(), 'M/d/yyyy');

	const applicantGist = `\\
    Name: ${firstName} ${middleName} ${lastName}\\
    ID Number: ${idNumber}\\
    Address: ${residentialAddress}
    ${city} ${countryOfResidence}
    

    `;
	const fields = kestrelNomineeModel$Individual({
		index: applicantId,
		clientID,
	});

	return (
		<div>
			<div className='space-y-10'>
				<FormText className='max-h-96 overflow-auto'>
					{isLoading ? (
						<Ellipsis className='w-5 h-5 animate-pulse' />
					) : (
						<Markdown skipHtml>
							{kestrelNomineeText
								.replace('{{date}}', today)
								.replace('{{applicantGist}}', applicantGist)}
						</Markdown>
					)}
				</FormText>
				<div>
					{fields.map((f) => (
						<FormFactory
							key={f.name}
							{...f}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

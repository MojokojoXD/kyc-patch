import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/UIcomponents/ui/accordion';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import { useMemo } from 'react';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import type { FormStep } from '@/types/Components/onboarding';
import { signatureUploadModel } from './model/signatureUploadModel';
import FormFactory from '@/components/UIcomponents/FormFactory';
import { useKYCFormContext } from '@/components/pages/onboarding/forms/utils/formController';

export const SignatureUpload: FormStep = () => {
	const {
		form: { getValues },
		clientID,
	} = useKYCFormContext<IndividualFormSchema>();

	const applicants = getValues(`applicant`) || [];

	return (
		<>
			<FormHeader>
				<FormTitle>Signature Upload</FormTitle>
				<FormSubHeader>Enter the required information below</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-[8px] py-5'>
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
									className='data-[state=closed]:hidden'
									forceMount>
									<SignatureUploadForm
										applicantId={i}
										clientID={clientID}
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

interface SignatureUploadFormProps extends SingleFormFieldsGeneratorProps {
	clientID?: string;
}

function SignatureUploadForm({
	applicantId,
	clientID = '',
}: SignatureUploadFormProps) {
	const fields = useMemo(
		() =>
			signatureUploadModel({
				index: applicantId,
				clientID,
			}),
		[applicantId, clientID]
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

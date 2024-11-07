import { useMemo } from 'react';
import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import {
	FormContent,
	FormHeader,
	FormSubHeader,
	FormTitle,
} from '@/components/UIcomponents/FormLayout';
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from '@/components/UIcomponents/ui/accordion';
import FormFactory from '@/components/UIcomponents/FormFactory';
import { fileUploadsModel$Individual } from './model/fileUploadsModel$Individual';
import { FormFieldAggregator } from '../../../../../utils/FormFieldAggregator';
import { useKYCFormContext } from '@/components/pages/onboarding/forms/utils/formController';

export const FileUploads$Individual: FormStep = () => {
	const {
		form: { getValues },
		formVars: { clientID },
	} = useKYCFormContext<IndividualFormSchema>();

	const applicants = getValues('applicant') || [{}];

	return (
		<>
			<FormHeader>
				<FormTitle>Document Checklist</FormTitle>
				<FormSubHeader>Upload all the required files</FormSubHeader>
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
									className='data-[state=closed]:hidden py-10'
									forceMount>
									<FileUploadForm
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

interface FileUploadFormProps extends SingleFormFieldsGeneratorProps {
	clientID?: string;
}

function FileUploadForm({ applicantId, clientID }: FileUploadFormProps) {
	const aggregatorResults = useMemo(() => {
		const rawFields = fileUploadsModel$Individual({
			index: applicantId,
			clientID,
		});

		const aggregator = new FormFieldAggregator(rawFields);

		return aggregator.generate();
	}, [applicantId, clientID]);
	return (
		<>
			{aggregatorResults.map((f) => (
				<FormFactory
					key={f.name}
					{...f}
				/>
			))}
		</>
	);
}

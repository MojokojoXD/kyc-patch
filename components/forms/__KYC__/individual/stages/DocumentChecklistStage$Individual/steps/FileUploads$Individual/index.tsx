import { useMemo } from 'react';
import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import {
	FormContent,
	FormHeader,
	FormSubHeader,
	FormTitle,
} from '@/components/forms/FormLayout';
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from '@/components/ui/accordion';
import FormFactory from '@/components/forms/FormFactory';
import { fileUploadsModel$Individual } from './model/fileUploadsModel$Individual';
import { FormFieldAggregator } from '../../../../../../utils/FormFieldAggregator';
import { useKYCFormContext } from '@/components/forms/utils/formController';

export const FileUploads$Individual: FormStep = () => {
	const {
		form: { getValues },
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

interface FileUploadFormProps extends SingleFormFieldsGeneratorProps {}

function FileUploadForm({ applicantId }: FileUploadFormProps) {
	const aggregatorResults = useMemo(() => {
		const rawFields = fileUploadsModel$Individual({
			index: applicantId,
		});

		const aggregator = new FormFieldAggregator(rawFields);

		return aggregator.generate();
	}, [applicantId]);
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

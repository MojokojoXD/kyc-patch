import { useMemo } from 'react';
import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
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
import { FormFieldAggregator } from '../../../../../../utils/FormFieldAggregator';
import { useKYCFormContext } from '@/components/forms/utils/formController';
import {
	generalFileUpload$Corporate,
	signatoryFileUploadsModel$Corporate,
} from './model/fileUploadsModel$Corporate';
import type { Signatory } from '@/types/forms/corporateSchema';

export const FileUploads$Corporate: FormStep = () => {
	const {
		form,
		formVars: { clientID },
	} = useKYCFormContext();
	const { getValues } = form;

	const signatories = (getValues(
		'accountSignatories.signatories'
	) as Signatory[]) || [{}];

	return (
		<>
			<FormHeader>
				<FormTitle>Document Checklist</FormTitle>
				<FormSubHeader>Upload all the required files</FormSubHeader>
			</FormHeader>
			<FormContent>
				<>
					<div className='space-y-[8px] py-5'>
						{signatories.map((s, i) => (
							<Accordion
								key={i}
								type='single'
								defaultValue='item-0'
								collapsible>
								<AccordionItem value={`item-${i}`}>
									<AccordionTrigger>
										Signatory #{i + 1}: {s.firstName} {s.lastName}
									</AccordionTrigger>
									<AccordionContent
										className='data-[state=closed]:hidden pb-16'
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

					{generalFileUpload$Corporate({ clientID }).map((f) => (
						<FormFactory
							key={f.name}
							{...f}
						/>
					))}
				</>
			</FormContent>
		</>
	);
};

interface FileUploadFormProps extends SingleFormFieldsGeneratorProps {
	clientID?: string;
}

function FileUploadForm({ applicantId, clientID }: FileUploadFormProps) {
	const aggregatorResults = useMemo(() => {
		const rawFields = signatoryFileUploadsModel$Corporate({
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

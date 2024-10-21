import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
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
import { fileUploadsFieldsModel } from './formBuilder/fileUploadsFieldsModel';
import { FormFieldAggregator } from '../../../../utils/FormFieldAggregator';

export const FileUploads: FormStep = ({
	applicantCount,
	clientID,
}) => {
	const { getValues } = useFormContext();

	return (
		<>
			<FormHeader>
				<FormTitle>Document Checklist</FormTitle>
				<FormSubHeader>Upload all the required files</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-[8px] py-5'>
					{[...Array(applicantCount).keys()].map((c) => {
						const firstName = getValues(`applicant.${c}.firstName`);
						const lastName = getValues(`applicant.${c}.lastName`);
						return (
							<Accordion
								key={c}
								type='single'
								defaultValue='item-0'
								collapsible>
								<AccordionItem value={`item-${c}`}>
									<AccordionTrigger>
										Applicant #{c + 1}: {firstName} {lastName}
									</AccordionTrigger>
									<AccordionContent
										className='data-[state=closed]:hidden pb-16'
										forceMount>
										<FileUploadForm
											applicantId={c}
											clientID={clientID}
										/>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						);
					})}
				</div>
			</FormContent>
		</>
	);
};

interface FileUploadFormProps extends SingleFormFieldsGeneratorProps {
	clientID?: string;
}

function FileUploadForm({
	applicantId,
	clientID,
}: FileUploadFormProps )
{
    const aggregatorResults = useMemo( () =>
    {
        const rawFields = fileUploadsFieldsModel( {
            index: applicantId,
            clientID,
        })
        
        const aggregator = new FormFieldAggregator( rawFields );


        return aggregator.generate()

    }, [ applicantId, clientID ])
    return (
        <>
            {
                aggregatorResults.fields.map( f => (
                    <FormFactory key={f.name} { ...f }/>
                ) )
            }
        </>
    )
}

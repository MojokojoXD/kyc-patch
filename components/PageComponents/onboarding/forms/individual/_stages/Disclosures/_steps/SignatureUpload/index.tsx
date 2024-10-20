import { useFormContext } from 'react-hook-form';
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
import type { IndividualFormSchema } from '@/types/forms/individual';
import { useMemo } from 'react';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import type { FormStep } from '@/types/Components/onboarding';
import { signatureUploadFieldModel } from './formBuilder/signatureUploadFieldModel';
import FormFactory from '@/components/UIcomponents/FormFactory';


export const SignatureUpload:FormStep = ({ applicantCount,clientID }) => {
	const { getValues } = useFormContext<IndividualFormSchema>();
    
	return (
		<>
			<FormHeader>
				<FormTitle>Signature</FormTitle>
				<FormSubHeader>Enter the required information below</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-[8px] py-5'>
                    { [ ...Array( applicantCount ).keys() ].map( ( c, i ) =>
                    {
                        const firstName = getValues( `applicant.${ c }.firstName` );
                        const lastName = getValues( `applicant.${ c }.lastName` );
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
									className='data-[state=closed]:hidden'
									forceMount>
									<SignatureUploadForm
										applicantId={i}
										clientID={clientID}
									/>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					)})}
				</div>
			</FormContent>
		</>
	);
}

interface SignatureUploadFormProps extends SingleFormFieldsGeneratorProps {
	clientID?: string;
};

function SignatureUploadForm({
	applicantId,
	clientID = '',
}: SignatureUploadFormProps) {
	
    const fields = useMemo( () => signatureUploadFieldModel( {
        index: applicantId,
        clientID,
    } ), [ applicantId, clientID ] );

	return (
		<>
            { fields.map( f => (
                <FormFactory key={f.name} { ...f }/>
            )) }
		</>
	);
}

import { useFormContext } from 'react-hook-form';
import {
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from '@/components/UIcomponents/ui/form';
import SignatureUploader from '@/components/UIcomponents/CompoundUI/SignatureUploader';
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
import { useMemo, useState, useEffect } from 'react';
import { SignatureProcessor } from '@/utils/clientActions/signatureHelpers';
import type { SingleCategoryForm } from '../../NextOfKin/_steps/NextOfKin_Bio';


interface SignatureUploadProps {}

export default function SignatureUpload({}: SignatureUploadProps) {
	const form = useFormContext<IndividualFormSchema>();
	const { watch } = form;

	const applicant = useMemo(() => watch('applicant'), [watch]);

	return (
		<>
			<FormHeader>
				<FormTitle>Signature</FormTitle>
				<FormSubHeader>Enter the required information below</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-10 py-5'>
					{applicant.map((c, i) => (
						<Accordion
							key={c.id}
                            type='single'
                            defaultValue='item-1'
							collapsible>
							<AccordionItem value={`item-${c.id}`}>
								<AccordionTrigger>
									Applicant #{c.id}: {c.firstName} {c.lastName}
								</AccordionTrigger>
								<AccordionContent className='data-[state=closed]:hidden' forceMount>
									<SignatureUploadForm applicantId={i} />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</div>
			</FormContent>
		</>
	);
}

type SignatureUploadFormProps = Pick<SingleCategoryForm,'applicantId'>

function SignatureUploadForm({ applicantId }: SignatureUploadFormProps) {
	const [isProcessingSignature, setIsProcessingSignature] =
        useState<boolean>( false );
    const [ signatureError, setSignatureError ] = useState<boolean>( false );
    const { control, setValue, getValues } = useFormContext<IndividualFormSchema>();
    

    const currentSignatureURL = getValues( `applicant.${ applicantId }.disclosures.signatureURL` );
    const currentNativeSignatureFileName = getValues( `_formMetadata.applicant.${ applicantId }.signatureFileName` );
    
    if ( signatureError )
    {
        return <p className='p-10'>Something went wrong! Please try again later</p>
    }

	return (
		<>
			{/* Signature Upload */}
			<div>
				<div>
					<FormField
						control={control}
                        name={ `applicant.${ applicantId }.disclosures.signatureURL` }
                        rules={ {
                            required: "You must upload your signature to continue"
                        }}
						render={({ field }) => (
							<FormItem className='space-y-2'>
								<FormControl>
									<SignatureUploader
										previewURL={currentSignatureURL}
                                        onFileUpload={ async( file ) =>
                                        {
                                            if ( !file ) return;
                                            setIsProcessingSignature( true );

                                            try {
                                                const base64ImgURL = await SignatureProcessor.fileToURL( file );

                                                console.log(base64ImgURL)
                                                field.onChange( base64ImgURL );

                                                setValue( `_formMetadata.applicant.${ applicantId }.signatureFileName`, file.name );
                                                
                                                setIsProcessingSignature( false );

                                            } catch ( error )
                                            {
                                                setIsProcessingSignature( false );
                                                setSignatureError(true)
                                                console.log(error)
                                            }
                                        } }
                                        name={ field.name }
                                        isLoading={ isProcessingSignature }
                                        fileName={currentNativeSignatureFileName}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</div>
		</>
	);
}

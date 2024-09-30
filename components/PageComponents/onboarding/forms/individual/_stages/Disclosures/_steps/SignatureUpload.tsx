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
								<AccordionContent className='space-y-8'>
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
    const [ previewURL, setPreviewURL ] = useState<string | null>( null );
    const [ signatureError, setSignatureError ] = useState<boolean>( false );
    const { control, setValue, getValues } = useFormContext<IndividualFormSchema>();
    

    const currentSignatureURL = getValues( `applicant.${ applicantId }.disclosures.signatureURL` );
    const currentNativeSignatureFileName = getValues( `_formMetadata.applicant.${ applicantId }.signatureFileName` );

	const handleSignatureUpload = async (file: File | null) => {

		const clientId = sessionStorage.getItem('clientId');

        if ( !file ) return;
        if ( !clientId )
        {
            setSignatureError( true );
			return;
        }
        
		try {
            const imageStorageURL = await SignatureProcessor.upload(file,clientId)
            
            return imageStorageURL
            
        } catch ( error )
        {
            
            console.log( error )
        
        }
	};

    useEffect( () =>
    {
        const getDownloadURL = async () =>
        {
            setIsProcessingSignature( true );

            const downloadURL = await SignatureProcessor.download( currentSignatureURL );

            if ( !downloadURL )
            {
                setSignatureError( true );
                setIsProcessingSignature( false );
                return;
            }

            setPreviewURL( downloadURL );
            setIsProcessingSignature( false );
        }

       currentSignatureURL && getDownloadURL();

        
    }, [ currentSignatureURL ] )
    
    if ( signatureError )
    {
        return <p className='p-10'>Something went wrong! Please try again later</p>
    }

	return (
		<>
			{/* title */}
			<div>
				<div className='space-y-4'>
					<FormField
						control={control}
						name={`applicant.${applicantId}.disclosures.signatureURL`}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<SignatureUploader
										previewURL={previewURL}
                                        onFileUpload={ async( file ) =>
                                        {
                                            setIsProcessingSignature( true );

                                            const signatureURL = await handleSignatureUpload( file );
                                            
                                            if ( !signatureURL )
                                            {
                                                setIsProcessingSignature( false );
                                                return;
                                            }

                                            field.onChange( signatureURL );
                                            setValue( `_formMetadata.applicant.${ applicantId }.signatureFileName`, file?.name || "" );
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

import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import { SignatureProcessor } from '@/utils/clientActions/signatureHelpers';
import type { FactoryComponentProps } from '@/types/Components/formFactory';
import SignatureUploader from '../../CompoundUI/SignatureUploader';
import { Controller } from 'react-hook-form';
import {
	FormItem,
	FormControl,
	FormMessage,
	FormLabel,
} from '../../ui/form';

interface FormFileUploadProps extends FactoryComponentProps {}

export default function FormFileUpload({
	name,
	componentProps = { clientID: '' },
	defaultValue = '',
	rules,
}: FormFileUploadProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [previewURL, setPreviewURL] = useState('');
	const { control, setError, setValue, getValues, resetField } =
        useFormContext();
    
	const metaFileName = getValues('_formMetadata' + name) || '';
	const currentDownloadURL = getValues(name);

	const handleFileUpload = async (file: File | null) => {
		if (!file || !componentProps.clientID) return;

		try {
			const formData = {
				file: file,
			};

			const cloudRes = await FormHelpers.statelessRequest<
				typeof formData,
				{ url: string }
			>('/api/onboarding/uploads?clientId=' + componentProps.clientID, {
				data: formData,
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			if (!cloudRes) {
				return;
			}
			const imageURL = await SignatureProcessor.download(cloudRes.url);

			if (!imageURL) {
				return;
			}

			return {
				cloudURL: cloudRes.url,
				previewURL: imageURL,
			};
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
	};

	useEffect(() => {
		const getPreviewURL = async () => {
			const res = await SignatureProcessor.download(currentDownloadURL);

			if (res) {
				setPreviewURL(res);
				return;
			}

			setError(name, {
				type: 'network',
				message: 'Something went wrong! Please try again later.',
			});
		};

		if (currentDownloadURL) {
			setIsLoading(true);
			getPreviewURL();
			setIsLoading(false);
		}
	}, [currentDownloadURL,name,setError]);

	return (
		<Controller
			control={control}
			name={name}
			defaultValue={defaultValue}
			rules={rules}
			render={({ field, fieldState }) => (
				<FormItem className='bg-neutral-50 p-[24px] rounded-lg border border-neutral-200 space-y-2.5 text-neutral-700'>
					<FormLabel>Upload Your Signature</FormLabel>
					<FormControl>
						<SignatureUploader
							ref={field.ref}
							isLoading={isLoading}
							id={name}
							previewURL={previewURL}
							fileName={metaFileName}
							onUploadError={(error) =>
								error &&
								setError(field.name, { type: 'validate', message: error })
							}
							onFileUpload={async (file) => {
								if (currentDownloadURL) {
									resetField(field.name, {
										defaultValue: '',
										keepError: true,
									});
									setPreviewURL('');
								}

								setIsLoading(true);

								const result = await handleFileUpload(file);

								setIsLoading(false);

								if (!result) {
									return;
								}

								field.onChange(result.cloudURL);
								setValue(`_formMetadata` + field.name, file!.name);
								setPreviewURL(result.previewURL);
							}}
						/>
					</FormControl>
					<FormMessage className='relative'>{fieldState.error?.message}</FormMessage>
				</FormItem>
			)}
		/>
	);
}

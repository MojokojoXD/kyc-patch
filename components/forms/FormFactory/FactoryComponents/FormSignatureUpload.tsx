import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FileHelpers } from '@/utils/clientActions/fileHelpers';
import type { FactoryComponentProps } from '@/types/Components/formFactory';
import SignatureUploader from '@/components/ui/CompoundUI/SignatureUploader';
import { Controller } from 'react-hook-form';
import {
	FormItem,
	FormControl,
	FormMessage,
	FormLabel,
} from '../../../ui/form';

interface FormSignatureUploadProps extends FactoryComponentProps {}

export default function FormSignatureUpload({
	name,
	componentProps = { clientID: '' },
	defaultValue = '',
	rules,
}: FormSignatureUploadProps) {
	const [isLoading, setIsLoading] = useState(false);
	const { control, setError, setValue, getValues, resetField } = useFormContext();

	const { filename, objectURL } = (getValues('_formMetadata.' + name) as {
		filename: string;
		objectURL: string;
	}) || {
		filename: '',
		objectURL: '',
	};

	const currentDownloadURL = getValues(name);

	return (
		<Controller
			control={control}
			name={name}
			defaultValue={defaultValue}
			rules={!rules ? {} : rules}
			render={({ field, fieldState }) => (
				<FormItem className='bg-neutral-50 p-[24px] rounded-lg border border-neutral-200 space-y-2.5 text-neutral-700'>
					<FormLabel>Upload Your Signature</FormLabel>
					<FormControl>
						<SignatureUploader
							ref={field.ref}
							isLoading={isLoading}
							id={name}
							previewURL={objectURL}
							fileName={filename}
							onUploadError={(error) =>
								error && setError(field.name, { type: 'validate', message: error })
							}
							onFileUpload={async (file) => {
								if (currentDownloadURL) {
									resetField(field.name, {
										defaultValue: '',
										keepError: true,
									});
									setValue(`_formMetadata.` + field.name + '.objectURL', '');
									setValue(`_formMetadata.` + field.name + '.filename', '');
								}

								if (!file) return;

								setIsLoading(true);

								const renamedFile = FileHelpers.modifyFileName(
									file,
									componentProps.clientID as string,
									{
										id: 0,
										fileType: 'signature',
									}
								);

								const result = await FileHelpers.uploadFileAndDownload(renamedFile);

								setIsLoading(false);

								if (!result) {
									return;
								}

								field.onChange(result.cloudURL);
								setValue(`_formMetadata.` + field.name, {
									filename: file.name,
									objectURL: result.previewURL,
								});
							}}
						/>
					</FormControl>
					<FormMessage className='relative'>{fieldState.error?.message}</FormMessage>
				</FormItem>
			)}
		/>
	);
}

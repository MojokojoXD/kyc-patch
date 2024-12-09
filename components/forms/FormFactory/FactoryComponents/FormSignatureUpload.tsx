import { useState } from 'react';
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
import { useKYCFormContext } from '../../utils/formController';
import { cn } from '@/lib/utils';

interface FormSignatureUploadProps extends FactoryComponentProps<'signature'> {}

export default function FormSignatureUpload({
	name,
	componentProps = { classNames: { errorPosition: 'relative' } },
	defaultValue = '',
	rules,
}: FormSignatureUploadProps) {
	const [isLoading, setIsLoading] = useState(false);
	const {
		form,
		formVars: { clientID },
	} = useKYCFormContext();
	const { control, setError, setValue, getValues, resetField } = form;

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
					<FormLabel
						className={cn(
							componentProps?.classNames?.labelStyles,
							fieldState.error && 'text-error-500'
						)}>
						Upload Your Signature
					</FormLabel>
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

								const renamedFile = FileHelpers.modifyFileName(file, clientID, {
									id: 0,
									fileType: 'signature',
								});

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
					<FormMessage position={componentProps?.classNames?.errorPosition}>
						{fieldState.error?.message}
					</FormMessage>
				</FormItem>
			)}
		/>
	);
}

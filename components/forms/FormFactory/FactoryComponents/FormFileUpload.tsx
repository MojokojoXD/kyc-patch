import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FactoryComponentProps } from '@/types/Components/formFactory';
import { Controller } from 'react-hook-form';
import {
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '../../../ui/form';
import { FileUploader } from '@/components/ui/CompoundUI/FileUploader';
import { FileHelpers } from '@/utils/clientActions/fileHelpers';

interface FormFileUploadProps extends FactoryComponentProps {}

export default function FormFileUpload({
	name,
	label,
	defaultValue = '',
	rules,
	componentProps = { clientID: '', fileFieldName: '' },
}: FormFileUploadProps) {
	const { control, getValues, setError, resetField, setValue } = useFormContext();
	const [isLoading, setIsLoading] = useState(false);

	const currentCloudURL = getValues(name) || '';
	const { filename, objectURL } = (getValues(`_formMetadata.` + name) as {
		filename: string;
		objectURL: string;
	}) || {
		filename: '',
		objectURL: '',
	};

	return (
		<Controller
			control={control}
			name={name}
			defaultValue={defaultValue}
			rules={!rules ? {} : rules}
			render={({ field, fieldState }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<FileUploader
							id={field.name}
							ref={field.ref}
							previewURL={objectURL}
							isLoading={isLoading}
							fileName={filename}
							onUploadError={(e) => setError(name, { type: 'upload-error', message: e })}
							onFileUpload={async (file) => {
								if (currentCloudURL) {
									resetField(name, { defaultValue: '', keepError: true });
									setValue('_formMetadata.' + field.name + '.filename', '');
									setValue('_formMetadata.' + field.name + '.objectURL', '');
								}

								if (!file) return;

								setIsLoading(true);

								const renamedFile = FileHelpers.modifyFileName(
									file,
									componentProps.clientID as string,
									{
										fileType: 'file',
										fieldName: componentProps?.fileFieldName,
									}
								);

								const result = await FileHelpers.uploadFileAndDownload(renamedFile);

								setIsLoading(false);

								if (result) {
									field.onChange(result.cloudURL);
									setValue('_formMetadata.' + field.name, {
										filename: file.name,
										objectURL: result.previewURL,
									});

									return;
								}

								setError(field.name, {
									type: 'upload-error',
									message: 'Something went wrong!, Please try again later.',
								});
							}}
						/>
					</FormControl>
					<FormMessage>{fieldState.error?.message}</FormMessage>
				</FormItem>
			)}
		/>
	);
}

import { Input, InputProps } from '../ui/input';
import { Label } from '../ui/label';
import { forwardRef, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { ImagePreviewer } from './ImagePreviewer';

interface FileUploader extends InputProps {
	id: string;
	isLoading: boolean;
	previewURL: string | undefined;
	fileSize?: number /* size in bytes */;
	fileName: string;
	onUploadError: (error?: string) => void;
	onFileUpload: (file: File | null) => void;
}

type SupportedFileTypes = 'jpg' | 'jpeg' | 'png' | 'pdf';

//File constants
const DEFAULT_MAX_FILE_SIZE = 5242880;
const SUPPORTED_FORMATS = ['jpg', 'jpeg', 'png', 'pdf'] as const;

const FileUploader = forwardRef<HTMLInputElement, FileUploader>(
	(
		{
			id,
			onFileUpload,
			fileSize = DEFAULT_MAX_FILE_SIZE,
			onUploadError,
			previewURL,
			isLoading = false,
			fileName = '',
			...props
		},
		ref
	) => {
		const [currentFileName, setCurrentFileName] = useState(fileName);

		const validateImgFile = (newFile: File) => {
			let isValid = true;

			if (newFile.size > fileSize) {
				onUploadError('Upload a file below ' + returnFileSize(fileSize));
				isValid = false;
			}

			const newFileFormat = newFile.name.split('.').pop();

			if (
				!SUPPORTED_FORMATS.includes(newFileFormat as SupportedFileTypes)
			) {
				onUploadError('Only .jpeg, .jpg and .png files can be uploaded');
				isValid = false;
			}

			return isValid;
		};

		return (
			<div className='space-y-3.5'>
				<div className='bg-white border border-neutral-200 rounded-lg overflow-hidden'>
					<div className='flex justify-between items-center'>
						<Label
							htmlFor={id}
							className='order-3 text-white text-sm cursor-pointer text-nowrap bg-primary-500 p-[16px] hover:opacity-90 transition-opacity ease-in-out duration-300 border-l border-neutral-200 grow-0'>
							Select File
                        </Label>
                        {isLoading && <LoaderCircle className='animate-spin order-2 grow-0 mr-3 text-neutral-500'/>}
						<Input
							{...props}
							type={'file'}
							id={id}
							className='hidden placeholder:text-neutral-100'
							accept='.png,.jpg,.jpeg,.pdf'
							size={fileSize}
							onChange={(e) => {
								const imgFile = e.target.files?.item(0);

								if (!imgFile) return;

								const isValidFile = validateImgFile(imgFile);
								setCurrentFileName(imgFile.name);
								onFileUpload(isValidFile ? imgFile : null);
							}}
							ref={ref}
						/>
						<p
							className={cn(
								'text-neutral-700 text-base ml-[16px] grow',
								!currentFileName && 'text-neutral-300'
							)}>
							{currentFileName ? currentFileName : 'Nothing selected'}
						</p>
					</div>
				</div>
				<div>
					<small className='text-neutral-700 block'>
						Accepted file types:{' '}
						{SUPPORTED_FORMATS.map((v, i) => (
							<span
								key={v}
								className='font-medium'>
								.{v} {i < SUPPORTED_FORMATS.length - 1 && ','}
							</span>
						))}
					</small>
					<ImagePreviewer imageURL={ previewURL }>
						<Button
							disabled={!previewURL}
							size={'sm'}
							variant={'link'}
							className='px-0 text-base font-normal text-primary-500'>
							Preview
						</Button>
					</ImagePreviewer>
				</div>
			</div>
		);
	}
);

FileUploader.displayName = 'FileUploader';

function returnFileSize(number: number) {
	if (number < 1e3) {
		return `${number} bytes`;
	} else if (number >= 1e3 && number < 1e6) {
		return `${(number / 1e3).toFixed(1)} KB`;
	} else {
		return `${(number / 1e6).toFixed(1)} MB`;
	}
}

export { FileUploader };

import { Input, InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { forwardRef, useState } from 'react';
import Image from 'next/image';
import { LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ImagePreviewer } from './ImagePreviewer';

interface SignatureUploaderProps extends InputProps {
	id: string;
	isLoading: boolean;
	previewURL: string | undefined;
	fileSize?: number /* size in bytes */;
	fileName: string;
	onUploadError: (error?: string) => void;
	onFileUpload: (file: File | null) => void;
}

type SupportedFileTypes = 'jpg' | 'jpeg' | 'png';

//File constants
const DEFAULT_MAX_FILE_SIZE = 1048576;
const SUPPORTED_FORMATS = ['jpg', 'jpeg', 'png'] as const;

const SignatureUploader = forwardRef<HTMLInputElement, SignatureUploaderProps>(
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

			if (!SUPPORTED_FORMATS.includes(newFileFormat as SupportedFileTypes)) {
				onUploadError('Only .jpeg, .jpg and .png files can be uploaded');
				isValid = false;
			}

			return isValid;
		};

		return (
			<div className='space-y-3.5'>
				<div className='bg-white border border-neutral-200 p-[16px] rounded-lg'>
					{(isLoading || previewURL) && (
						<ImagePreviewer imageURL={previewURL}>
							<div className='relative h-[130px] bg-neutral-50 rounded-lg mb-2 overflow-hidden'>
								<div
									className={cn(
										'absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm -z-10 transition-all',
										isLoading && 'z-0'
									)}>
									<LoaderCircle className='h-1/4 animate-spin text-primary-500' />
								</div>
								{previewURL && (
									<Image
										src={previewURL}
										width={200}
										height={150}
										className='h-full w-auto aspect-squart mx-auto'
										alt='signature preview'
									/>
								)}
							</div>
						</ImagePreviewer>
					)}

					<div className='flex justify-between items-center'>
						<Label
							htmlFor={id}
							className='order-2 text-primary-500 text-sm cursor-pointer text-nowrap'>
							Choose File
						</Label>
						<Input
							{...props}
							type={'file'}
							id={id}
							className='hidden placeholder:text-neutral-100'
							accept='.png,.jpg,.jpeg'
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
								'text-neutral-700 text-base',
								!currentFileName && 'text-neutral-300'
							)}>
							{currentFileName ? currentFileName : 'Nothing selected'}
						</p>
					</div>
				</div>
				<div>
					<small className='text-neutral-700'>
						Only <strong>JPGs,JPEGS and PNGs</strong> are allowed <br /> Maximum{' '}
						<strong>{returnFileSize(fileSize)}</strong>
					</small>
				</div>
			</div>
		);
	}
);

SignatureUploader.displayName = 'SignatureUploader';

function returnFileSize(number: number) {
	if (number < 1e3) {
		return `${number} bytes`;
	} else if (number >= 1e3 && number < 1e6) {
		return `${(number / 1e3).toFixed(1)} KB`;
	} else {
		return `${(number / 1e6).toFixed(1)} MB`;
	}
}

export default SignatureUploader;

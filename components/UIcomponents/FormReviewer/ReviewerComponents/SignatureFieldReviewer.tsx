import { useState, useEffect } from 'react';
import { useFormContext,Path } from 'react-hook-form';
import { SignatureProcessor } from '@/utils/clientActions/signatureHelpers';
import Image from 'next/image';
import type { IndividualFormSchema } from '@/types/forms/individual';

interface SignatureFieldReviewerProps {
	name: string;
	label: string;
}

export function SignatureFieldReviewer({
	name,
	label,
}: SignatureFieldReviewerProps) {
	const { getValues } = useFormContext<IndividualFormSchema>();
	const [imageURL, setImageURL] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const cloudURL = getValues(name as Path<IndividualFormSchema>) as string;

	useEffect(() => {
		const getImageURL = async () => {
			const res = await SignatureProcessor.download(cloudURL);

			if (res) setImageURL(res);
			setError('Failed to load resource');
		};

		if (cloudURL) {
			setIsLoading(true);
			getImageURL();
			setIsLoading(false);
		}
	}, [cloudURL]);

	return (
		<div className='space-y-[16px]'>
			{label && <h2 className='paragraph2Medium text-neutral-700'>{label}</h2>}
			{isLoading ? (
				<span>Loading...</span>
			) : imageURL ? (
				<Image
					src={imageURL}
					width={200}
                        height={ 133 }
                        alt='upload review image'
				/>
			) : (
				<span className='text-error-500'>{error}</span>
			)}
		</div>
	);
}

import { useFormContext } from 'react-hook-form';
import Image from 'next/image';

interface SignatureFieldReviewerProps {
	name: string;
	label: string;
}

export function SignatureFieldReviewer({
	name,
	label,
}: SignatureFieldReviewerProps) {
	const { getValues } = useFormContext();

	const cloudURL = getValues(
		`_formMetadata.` + name + '.objectURL'
	) as string;

	return (
		<div className='space-y-[16px]'>
			{label && (
				<h2 className='paragraph2Medium text-neutral-700'>{label}</h2>
			)}
			{cloudURL ? (
				<Image
					src={cloudURL}
					width={200}
					height={133}
					alt='upload review image'
				/>
			) : (
				<span className='text-error-500'>Resource is not available</span>
			)}
		</div>
	);
}

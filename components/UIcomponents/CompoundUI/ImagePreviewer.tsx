import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from '@/components/UIcomponents/ui/dialog';
import { ReactNode } from 'react';
import Image from 'next/image';

interface ImagePreviewerProps {
	children: ReactNode;
	imageURL?: string ;
}

export function ImagePreviewer({
	children,
	imageURL,
}: ImagePreviewerProps) {
	return (
		<Dialog>
			<DialogTrigger
				asChild
				className='cursor-pointer'>
				{children}
			</DialogTrigger>
            <DialogContent className='sm:max-w-lg bg-transparent border-none py-10 shadow-none'>
                <div className='hidden'>
                    <DialogTitle></DialogTitle>
                    <DialogDescription></DialogDescription>
                </div>
				<div className='relative w-full h-[300px] rounded overflow-hidden'>
					{ imageURL && <Image
						src={imageURL}
						fill
						className='object-fit'
						alt='signature/file preview'
					/>}
				</div>
			</DialogContent>
		</Dialog>
	);
}

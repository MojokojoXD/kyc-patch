import
  {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog';
import { ReactNode } from 'react';
import Image from 'next/image';

interface ImagePreviewerProps
{
  openPreview?: boolean;

  onOpenPreview?: ( open: boolean ) => void;
  children?: ReactNode;
  imageURL?: string;
}

export function ImagePreviewer( { openPreview, onOpenPreview, children, imageURL }: ImagePreviewerProps )
{

  if ( !children && typeof openPreview === 'undefined' ) throw new Error( 'open prop must be passed if component is used without children' );

  return (
    <Dialog open={ openPreview } onOpenChange={onOpenPreview}>
      { children && <DialogTrigger
        asChild
        className='cursor-pointer'>
        { children }
      </DialogTrigger> }
      <DialogContent className='sm:max-w-lg bg-transparent border-none py-10 shadow-none'>
        <div className='hidden'>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </div>
        <div className='relative w-full h-[300px] rounded overflow-hidden'>
          { imageURL && (
            <Image
              src={ imageURL }
              fill
              className='object-contain'
              alt='signature/file preview'
            />
          ) }
        </div>
      </DialogContent>
    </Dialog>
  );
}

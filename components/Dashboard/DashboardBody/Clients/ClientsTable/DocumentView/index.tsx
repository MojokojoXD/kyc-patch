import
{
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import Image from 'next/image';
import miniLogo from '/public/images/logo-mini.png';
import { X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useSession } from '@/components/Dashboard/hooks/useSession';
interface DocumentViewProps
{
  clientID: string | null | undefined;
  openDocView: boolean;
  onDocViewChange: ( open: boolean ) => void;
}


export function DocumentView( { clientID, openDocView, onDocViewChange }: DocumentViewProps )
{

  const { request } = useSession();
  const [ isLoading, setIsLoading ] = useState( false );

  useEffect( () =>
  {
    setIsLoading( true );
    request( {
      protectedEndpoint: `/kyc/broker/client/docs/${ clientID }`,
      onSuccess: async ( res ) =>
      {
        const data = await res.json();
        console.log( data );
        setIsLoading( false )
      },
      onError: ( err ) => console.log( err )
    } );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );


  return (
    <Dialog
      open={ openDocView }
      onOpenChange={ onDocViewChange }
      modal={ false }
    >
      <DialogContent
        className='h-full max-w-full rounded-none border-none p-0 shadow-none flex flex-col gap-0 bg-white/0' onInteractOutside={ e => e.preventDefault() }
        onPointerDownOutside={ e => e.preventDefault() }
        disableClose
      >
        <DialogHeader className='h-dashboard-header bg-white px-8 flex flex-row justify-between items-center border-b border-neutral-100'>
          <div className='hidden'>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </div>
          <div className='flex items-center space-x-2 text-neutral-700'>
            <Image src={ miniLogo } height={ 37 } width={ 46 } alt='document view logo' />
            <h1 className='paragraph2Medium'>Documents</h1>
          </div>
          <div className='space-x-2 flex items-center'>
            <Button
              size={ 'sm' }
              variant={ 'outline' }
            >
              <Download className='h-4 aspect-square' />
            </Button>
            <Button size={ 'sm' } className='text-base px-4'>Approve</Button>
            <Button variant={ 'outline' } size={ 'sm' } className='text-base px-4 text-error-500 border-error-500 hover:text-error-500'>Deny</Button>
            <Button
              size={ 'icon' }
              variant={ 'ghost' }
              onClick={ () => onDocViewChange( false ) }
            >
              <X />
            </Button>
          </div>
        </DialogHeader>
        <div className='bg-white h-full p-8'>
          files
        </div>
      </DialogContent>
    </Dialog>
  );
}
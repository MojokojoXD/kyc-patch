import
{
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import
{
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import Image from 'next/image';
import miniLogo from '/public/images/logo-mini.png';
import { X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useSession } from '@/components/Dashboard/hooks/useSession';
import { ClientTabData, ClientVerifications } from '../../clients';
import Loading from '@/components/ui/Loading';
import { useFilterSignatoryFiles } from './useFilterSignatoryFiles';
import { FileThumbnail } from './FileThumbnail';
import type { SignatoryFiles } from './useFilterSignatoryFiles';
interface DocumentViewProps
{
  client: ClientTabData;
  openDocView: boolean;
  onDocViewChange: ( open: boolean ) => void;
}

export function DocumentView( { client, openDocView, onDocViewChange }: DocumentViewProps )
{

  const { request } = useSession();
  const [ allFiles, setAllFiles ] = useState<SignatoryFiles[]>( [] );
  const [ isLoading, setIsLoading ] = useState( false );
  const [ verifiedSignatory, setVerifiedSignatory ] = useState<ClientVerifications | null>( null );

  const currentSignatoryFiles = useFilterSignatoryFiles(
    !verifiedSignatory ? null : { ...verifiedSignatory, clientID: client.client_id }, allFiles );

  useEffect( () =>
  {

    setIsLoading( true );

    request( {
      protectedEndpoint: `/kyc/broker/client/docs/${ client.client_id }`,
      onSuccess: async ( res ) =>
      {
        const data: { data: SignatoryFiles[]; } = await res.json();

        setAllFiles( data.data );

        setIsLoading( false );
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
        className='h-full max-w-full rounded-none border-none p-0 shadow-none flex flex-col gap-0 bg-white/0'
        onInteractOutside={ e => e.preventDefault() }
        onPointerDownOutside={ e => e.preventDefault() }
        disableClose
      >
        <DialogHeader className='h-dashboard-header bg-white px-8 flex flex-row justify-between items-center border-b border-neutral-100'>
          <div className='hidden'>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </div>
          <div className='flex items-center space-x-2 text-neutral-700 text-neutral-700'>
            <Image src={ miniLogo } height={ 37 } width={ 46 } alt='document view logo' />
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
        <Loading reveal={ isLoading } />
        <div className='bg-white h-full p-8 text-neutral-700 space-y-10'>
          <div className='flex justify-between items-end w-full pb-8 border-b border-neutral-100'>
            <h2 className='heading6Medium'>Files</h2>
            <div className='w-60'>
              <Select onValueChange={ v =>
              {
                const verifiedSignatory = client.verifications.find( vs => vs.signatory_id === v );

                setVerifiedSignatory( verifiedSignatory! );
              } }>
                <SelectTrigger>
                  <SelectValue placeholder='Signatory' />
                </SelectTrigger>
                <SelectContent>
                  {
                    client.verifications.map( v => (
                      <SelectItem
                        key={ v.signatory_id }
                        value={ v.signatory_id }
                      >
                        { v.signatory_name }
                      </SelectItem>
                    ) )
                  }
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='space-y-8'>
            <p className='captionBook text-neutral-500'>{ verifiedSignatory && `Signatory ID: ${ verifiedSignatory.signatory_id }` }</p>
            { !verifiedSignatory && <p className='paragraph2Regular text-neutral-700/50'>Select Signatory to view files</p> }
            <div className='grid grid-cols-5 gap-8 w-fit'>

              {
                currentSignatoryFiles.map( f => (
                  <FileThumbnail key={ f.upload_type } fileName={ f.file_name } />
                ) )
              }
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
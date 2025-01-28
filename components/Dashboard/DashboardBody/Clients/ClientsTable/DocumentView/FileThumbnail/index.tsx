import { useState } from 'react';
import { FileText, Loader2 } from 'lucide-react';
import { useSession } from '@/components/Dashboard/hooks/useSession';
import { ImagePreviewer } from '@/components/ui/CompoundUI/ImagePreviewer';

interface FileThumbnailProps
{
  fileName: string;
}

export function FileThumbnail( { fileName }: FileThumbnailProps )
{
  const { request } = useSession();
  const [ previewURL, setPreviewURL ] = useState<string | undefined>( undefined );
  const [ openPreview, setOpenPreview ] = useState<boolean>( false );
  const [ isFetching, setIsFetching ] = useState<boolean>( false );

  const fileLabel = fileName.split( '$' ).at( 0 );

  if ( !fileLabel ) throw new Error( 'improper file name format' );

  const handleDocumentDownload = async () =>
  {
    setIsFetching( true );

    request( {
      protectedEndpoint: '/download',
      method: 'POST',
      data: { fileName },
      onSuccess: async ( res ) =>
      {

        const doc = await res.blob();

        const previewURL = URL.createObjectURL( doc );

        setPreviewURL( previewURL );

        setOpenPreview( true );

        setIsFetching( false )
      },
      onError: ( err ) =>
      {
        setIsFetching( false );
        console.log( err );
      }
    } );
  };


  return (
    <>
      <ImagePreviewer
        imageURL={ previewURL }
        openPreview={ openPreview }
        onOpenPreview={ ( open ) =>
        {
          setOpenPreview( prevState =>
          {
            if ( !prevState && previewURL ) URL.revokeObjectURL( previewURL );

            return open;
          } );
        } } />
      <button
        onClick={ handleDocumentDownload }
        className='transition-all scale-100 active:scale-[0.98]'
      >
        <div className='group w-40 aspect-square border border-neutral-100 rounded-lg flex flex-col cursor-pointer hover:bg-neutral-500/10 hover:border-primary-200 shadow-sm transition-all ease-in-out'>
          <div className='relative basis-3/4 flex justify-center items-center'>
            { isFetching &&
              <Loader2
                className='absolute top-2 right-2 text-neutral-700/50 animate-spin' /> }
            <FileText className='w-16 h-16 stroke-[0.5] fill-primary-500 stroke-white' />
          </div>
          <hr className='border-neutral-100 group-hover:border-primary-200' />
          <div className='basis-1/4 flex items-center justify-center captionBook px-2 capitalize'>
            { fileLabel.split( '_' ).join( ' ' ) }
          </div>
        </div>
      </button>
    </>
  );
}
import { PanelButton } from '../PanelParts';
import { Download } from 'lucide-react';
import { useSession } from '@/components/Dashboard/hooks/useSession';
interface DownloadClientDocsProps
{
  clientID: string;

  disabled?: boolean;
}


export function DownloadClientDocs( { clientID, disabled }: DownloadClientDocsProps )
{
  const { request } = useSession();

  const downloadHandler = async() =>
  {
    request( {
      protectedEndpoint: `/kyc/broker/client/download/${ clientID }`,
      onSuccess: async( res ) =>
      {
        const data = await res.blob();
        
        const fileURL = URL.createObjectURL( data )
        const anchorTag = document.createElement( 'a' );

        anchorTag.href = fileURL;
        anchorTag.setAttribute( 'download', 'attachment.zip' )
        
        anchorTag.click();
        anchorTag.remove();

        URL.revokeObjectURL( fileURL );
      },
      onError: ( err ) => console.log( err )
      })
  };

  return (
    <>
      <PanelButton Icon={ Download } onClick={ downloadHandler } disabled={ disabled }/>
    </>
  );
}
import { PanelButton } from '../PanelParts';
import { Download } from 'lucide-react';
import { useSession } from '@/components/Dashboard/hooks/useSession';
import { saveAs } from 'file-saver';
import type { Feedback } from '@/components/Dashboard/lib/requestQuene';
import { BASE_URL } from '@/utils/vars/uri';
interface DownloadClientDocsProps
{
  clientID: string;
}


export function DownloadClientDocs( { clientID }: DownloadClientDocsProps )
{
  const { request } = useSession<Blob>();

  const downloadHandler = () =>
  {
    
  };

  return (
    <PanelButton Icon={ Download } onClick={ downloadHandler } />
  );
}
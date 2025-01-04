import { ViewClient } from './ViewClient';
import { DownloadClientDocs } from './DownloadClientDocs';
import type { DashboardClient } from '../../clients';
interface ClientReportPanelProps
{
  toggleClientSheet: () => void;
  client: DashboardClient;
}

export function ClientReportPanel( { toggleClientSheet, client }: ClientReportPanelProps )
{
  return (
    <div className='space-x-2'>
      <ViewClient onViewClient={ toggleClientSheet } />
      <DownloadClientDocs clientID={ client.client_id } />
    </div>
  );
}

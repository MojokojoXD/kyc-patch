import { ViewClient } from './ViewClient';
import { DownloadClientDocs } from './DownloadClientDocs';
import type { DashboardClient } from '../../clients';
interface ClientReportPanelProps
{
  toggleClientSheet: () => void;
  client: DashboardClient;
}

const CLIENT_STATUS_RANKING_ENUM: Record<string, number> =
{
  'UNKNOWN': 1,
  'STARTED': 2,
  'SUBMITTED': 3,
  'COMPLETED': 4
};

export function ClientReportPanel( { toggleClientSheet, client }: ClientReportPanelProps )
{
  const { status } = client;

  return (
    <div className='space-x-2'>
      <ViewClient onViewClient={ toggleClientSheet } />
      {
        CLIENT_STATUS_RANKING_ENUM[ status.toUpperCase() ] >= 3 &&
        <DownloadClientDocs clientID={ client.client_id } />
      }
    </div>
  );
}

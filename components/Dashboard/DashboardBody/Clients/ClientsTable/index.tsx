import type { DashboardClient } from '../clients';
import { useState, useCallback } from 'react';
import {
	Table,
	TableBody,
	TableHeader,
	TableRow,
	TableData,
	TableHead,
} from '@/components/ui/table';
import { SSXStatusBadge } from '@/components/ui/SSXStatusBadge';
import type { ClientLogsResponse, ClientTabData } from '../clients';
import { ClientSheet } from './ClientSheet';
import { clientStatusMapping } from './utils/mappings';
import { ChevronRight } from 'lucide-react';
import { useSession } from '@/components/Dashboard/hooks/useSession';

interface ClientsTableProps {
	data: DashboardClient[];
	headerLabels: string[];
}
export function ClientsTable({ data, headerLabels }: ClientsTableProps) {
	const { request, isRequesting } = useSession<ClientLogsResponse | null>();

	const [openSheet, setOpenSheet] = useState(false);
	const [client, setClient] = useState<ClientTabData | undefined>();

	const handleSheetToggle = useCallback(
		(toggle: boolean) => setOpenSheet(toggle),
		[]
	);

	const clientLogsRequest = (clientID?: string) =>
		new Promise<ClientLogsResponse | null>((resolve, reject) => {
			if (!clientID) resolve(null);
			request(
				{ url: `/kyc/dashboard/${clientID}`, method: 'GET' },
				function (res, error, status) {
					if (status === 'COMPLETED') {
						resolve(res);
					}

					status === 'FAILED' && reject(error);
				}
			);
		});

	const handleClientRowClick = useCallback(async (cl: DashboardClient) => {
		if (!cl) return;

		const result = await clientLogsRequest(cl?.client_id);

		setOpenSheet(true);

		setClient({
			...cl,
			logs: result?.data ?? [],
			verifications: result?.verifications ?? [],
		});
	}, []);

	return (
		<>
			<ClientSheet
				open={openSheet}
				onSheetChange={handleSheetToggle}
				client={client}
			/>
			<Table>
				<TableHeader>
					<TableRow>
						{headerLabels.map((h) => (
							<TableHead
								key={h}
								data={h}
							/>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.length === 0 && (
						<TableRow>
							<TableData className='text-neutral-700/50'>
								{isRequesting ? 'loading...' : 'No match'}
							</TableData>
							<TableData></TableData>
							<TableData></TableData>
							<TableData></TableData>
							<TableData></TableData>
						</TableRow>
					)}
					{data.map((d) => {
						if (!d.client_first_name || !d.client_first_name || !d.broker)
							return <></>;
						return (
							<TableRow
								key={d.client_id}
								className='cursor-pointer  scale-100 transition-transform duration-150 ease-in-out active:scale-[0.99]'
								onClick={() => handleClientRowClick(d)}>
								{/* full name */}
								<TableData className='capitalize'>
									{d.client_first_name} {d.client_last_name}
								</TableData>
								{/* client type */}
								<TableData>{d.type_of_client}</TableData>
								{/* email address */}
								<TableData>{d.client_email}</TableData>
								{/* broker */}
								<TableData className=' capitalize'>{d.broker.toLowerCase()}</TableData>
								{/* status */}
								<TableData>
									<span className='flex justify-between items-center'>
										<SSXStatusBadge
											label={d.status.toLowerCase()}
											status={clientStatusMapping[d.status.toUpperCase()]}
										/>
										<ChevronRight className='h-4 opacity-40 group-hover:text-primary-7 transition-opacity duration-150 ease-in-out00' />
									</span>
								</TableData>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</>
	);
}

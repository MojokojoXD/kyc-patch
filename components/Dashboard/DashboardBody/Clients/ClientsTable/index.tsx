import type { DashboardClient } from '../client';
import { useState, useCallback } from 'react';
import {
	Table,
	TableBody,
	TableHeader,
	TableRow,
	TableData,
	TableHead,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
	SSXStatusBadge,
	type BadgeStatus,
} from '@/components/ui/SSXStatusBadge';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTitle,
	SheetDescription,
	SheetFooter,
	SheetHeader,
} from '@/components/ui/sheet';
import { ChevronRight, Dot } from 'lucide-react';

const applicationStatusMapping: Record<string, BadgeStatus> = {
	STARTED: 'initiated',
	SUBMITTED: 'in-progress',
	COMPLETED: 'completed',
	UNKNOWN: 'unknown',
};

interface ClientsTableProps {
	data: DashboardClient[];
	headerLabels: string[];
}
export function ClientsTable( { data, headerLabels }: ClientsTableProps )
{
    const [ openSheet, setOpenSheet ] = useState( false );
    const [ client, setClient ] = useState<DashboardClient | undefined>();

    const handleSheetToggle = useCallback((toggle:boolean) => setOpenSheet( toggle ),[])
    const handleClientRowClick = useCallback( ( cl?: DashboardClient ) =>
    {
        setClient( () => cl );
        setOpenSheet( true );
    }, [] )

    return (
        <>
            <ClientsTableSheet open={ openSheet } onSheetChange={ setOpenSheet } client={ client }/>
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
                            <TableData className='text-neutral-700/50'>No match</TableData>
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
                                            status={applicationStatusMapping[d.status.toUpperCase()]}
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

interface ClientsTableSheetProps {
	open: boolean;
    client: DashboardClient | undefined;
    
    onSheetChange: ( open: boolean ) => void;
}

function ClientsTableSheet( { open, client, onSheetChange }: ClientsTableSheetProps )
{
    console.log( client )
    if ( !client ) return null;

	const {
		client_first_name: firstName,
		client_last_name: lastName,
		type_of_client,
		status,
	} = client;

	return (
		<Sheet open={open} onOpenChange={onSheetChange}>
			<SheetContent side={'right'} className='w-[300px]'>
				<SheetHeader>
					<SheetTitle>
						{`${firstName} ${lastName}`} <Dot /> {type_of_client}
					</SheetTitle>
					<SheetDescription></SheetDescription>
				</SheetHeader>
				<div>
					<div>
						<SSXStatusBadge
							label={status}
							size={'lg'}
							status={applicationStatusMapping[status]?.toUpperCase() as BadgeStatus}
						/>
					</div>
				</div>
				<SheetFooter></SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetDescription,
	SheetHeader,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ClientTabs } from './ClientTabs';
import {
	SSXStatusBadge,
	type BadgeStatus,
} from '@/components/ui/SSXStatusBadge';
import { X } from 'lucide-react';
import { clientStatusMapping } from '../utils/mappings';
import type { ClientTabData } from '../../clients';

interface ClientSheetProps {
	open: boolean;
	client: ClientTabData | undefined;

	onSheetChange: (open: boolean) => void;
}

export function ClientSheet({ open, client, onSheetChange }: ClientSheetProps) {
	if (!client) return null;
	const {
		status,
	} = client;

	return (
		<Sheet
			open={open}
			onOpenChange={onSheetChange}>
			<SheetContent
				side={'right'}
				disableClose
				className='p-0 pb-24'>
				<SheetHeader className='relative h-dashboard-header p-[32px] border-b border-neutral-100 flex items-center'>
					<SheetTitle className='hidden'>
					</SheetTitle>
					<SheetDescription className='hidden'></SheetDescription>
						<Button
							variant={'ghost'}
							size={'icon'}
							className='absolute right-[2rem] bottom-[1.5rem]'
							onClick={() => onSheetChange(false)}>
							<X />
						</Button>
				</SheetHeader>
				<div
					className='p-[32px] space-y-[24px] h-full overflow-auto'
					style={{
						scrollbarWidth: 'thin',
					}}>
					<SSXStatusBadge
						label={status.toLowerCase()}
						size={'lg'}
						status={clientStatusMapping[status.toUpperCase()] as BadgeStatus}
					/>
					<ClientTabs client={client} />
				</div>
			</SheetContent>
		</Sheet>
	);
}

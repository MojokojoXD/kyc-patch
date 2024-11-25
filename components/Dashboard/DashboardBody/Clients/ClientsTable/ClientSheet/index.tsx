import { useState, useCallback } from 'react';
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
import { Dot, X, ArrowLeft } from 'lucide-react';
import { clientStatusMapping } from '../utils/mappings';
import type { ClientTabData } from '../../clients';
import { cn } from '@/lib/utils';

interface ClientSheetProps {
	open: boolean;
	client: ClientTabData | undefined;

	onSheetChange: (open: boolean) => void;
}

export function ClientSheet({ open, client, onSheetChange }: ClientSheetProps) {
	const [showBackBtn, setShowBackBtn] = useState(false);
	const toggleBackButton = useCallback((open: boolean) => {
		if (!open) setShowBackBtn(false);
		setShowBackBtn(open);
	}, []);
	if (!client) return null;
	const {
		client_first_name: firstName,
		client_last_name: lastName,
		type_of_client,
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
				<SheetHeader className='h-dashboard-header p-[32px] border-b border-neutral-100'>
					<SheetTitle className='relative flex items-center text-neutral-700 h-full w-full'>
						<Button
							variant={'ghost'}
							size={'icon'}
							className='absolute right-0'
							onClick={() => onSheetChange(false)}>
							<X />
						</Button>
					</SheetTitle>
					<SheetDescription className='hidden'></SheetDescription>
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

import { JSX, ReactNode } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
export interface DashboardDialogProps {
	header: JSX.Element | string;

	children: ReactNode;

	open: boolean;

	hideCancelBtn?: boolean;
	onDialogOpen: (open: boolean) => void;
	onContinue: () => void;
}

export function DashboardDialog({
	header,
	children,
	onDialogOpen,
	open,
	onContinue,
	hideCancelBtn = false,
}: DashboardDialogProps) {
	return (
		<Dialog
			open={open}
			onOpenChange={onDialogOpen}>
			<DialogContent className='space-y-6'>
				<DialogHeader>
					<DialogTitle className='capitalize'>{header}</DialogTitle>
					<DialogDescription className='hidden'></DialogDescription>
				</DialogHeader>
				<div className='flex items-center'>{children}</div>
				<DialogFooter className='grid grid-cols-2'>
					<div>
						<Button
							onClick={() => onDialogOpen(false)}
							className={hideCancelBtn ? 'hidden' : 'w-full'}
							variant={'outline'}>
							Cancel
						</Button>
					</div>
					<div>
						<Button
							onClick={() => onContinue()}
							className='w-full'>
							Continue
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

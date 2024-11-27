import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetHeader,
} from '@/components/ui/sheet';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SessionProfileDetails } from './SessionProfileDetails';

interface SessionProfileSheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}
export function SessionProfileSheet({
	open,
	onOpenChange,
}: SessionProfileSheetProps) {
	return (
		<Sheet
			open={open}
			onOpenChange={onOpenChange}>
			<SheetContent
				className='p-0 text-neutral-700'
        disableClose
      >
				<SheetHeader className='relative h-dashboard-header p-8 border-b border-neutral-100'>
					<SheetTitle className=''>User Profile</SheetTitle>
					<SheetDescription className='hidden'></SheetDescription>
					<Button
						variant={'ghost'}
						size={'icon'}
						className='absolute right-[2rem] bottom-[1.5rem]'
						onClick={() => onOpenChange(false)}>
						<X />
					</Button>
        </SheetHeader>
        <div className='p-8'>
          <SessionProfileDetails/>
        </div>
			</SheetContent>
		</Sheet>
	);
}

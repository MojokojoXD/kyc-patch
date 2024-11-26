import { useCallback, useState } from 'react';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { NewClientForm } from './NewClientForm';
import { PlusCircle,X } from 'lucide-react';

interface AddNewClientSheetProps {}

export function AddNewClientSheet({}: AddNewClientSheetProps) {
	const [open, setOpen] = useState(false);

	const toggleSheet = useCallback(() => setOpen((prevOpen) => !prevOpen), []);

	return (
		<Sheet
			onOpenChange={setOpen}
			open={open}>
			<SheetTrigger asChild>
				<Button>
					<PlusCircle className='h-[1.15rem] aspect-square' />
					<span>Add a Client</span>
				</Button>
			</SheetTrigger>
			<SheetContent
				disableClose
				className='p-0 pb-24'>
				<SheetHeader className='relative h-dashboard-header border-b border-neutral-100'>
					<SheetTitle className='hidden'></SheetTitle>
					<SheetDescription className='hidden'></SheetDescription>
					<Button
						variant={'ghost'}
						size={'icon'}
						className='absolute right-[2rem] bottom-[1.5rem]'
						onClick={() => toggleSheet()}>
						<X />
					</Button>
				</SheetHeader>
				<div className='p-[32px] overflow-auto h-full'>
					<NewClientForm toggleSheet={toggleSheet} />
				</div>
			</SheetContent>
		</Sheet>
	);
}

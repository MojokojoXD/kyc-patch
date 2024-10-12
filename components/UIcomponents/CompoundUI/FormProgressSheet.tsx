import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from '@/components/UIcomponents/ui/sheet';
import { ReactNode } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import type { ButtonProps } from '../ui/button';

interface FormProgressSheetProps<TSteps extends object> {
	reveal: boolean;
	renderProgressListing: (step: TSteps) => ReactNode;
	keyExtractor: (step: TSteps) => number;
	stepsCollection: TSteps[];
}

export default function FormProgressSheet<T extends object>({
	reveal,
	renderProgressListing,
	stepsCollection,
	keyExtractor,
}: FormProgressSheetProps<T>) {
	return (
		<Sheet
			modal={false}
			open={reveal}>
			<SheetContent
				side={'left'}
				onInteractOutside={(e) => e.preventDefault()}
				onEscapeKeyDown={(e) => e.preventDefault()}
				onOpenAutoFocus={(e) => e.preventDefault()}
				className='py-20 px-0'
				>
                <SheetHeader className='px-14'>
                    <SheetTitle></SheetTitle>
					<SheetDescription></SheetDescription>
				</SheetHeader>
				<div className='py-8 w-full'>
					<ol className='list-decimal font-normal text-neutral-700/95 list-inside'>
						{stepsCollection.map((s) => (
							<div key={keyExtractor(s)}>{renderProgressListing(s)}</div>
						))}
					</ol>
				</div>
			</SheetContent>
		</Sheet>
	);
}

type FormProgressSheetButtonProps = ButtonProps & {
	active: boolean;
};

const FormProgressSheetButton = ({
	children,
	active,
	...props
}: FormProgressSheetButtonProps) => {
	return (
		<Button
			{...props}
			variant={'link'}
			className={cn(
				'px-8 w-full outline-none justify-start focus-visible:outline-none py-8 focus-visible-ring-none hover:no-underline heading1Regular',
				active &&
					'bg-neutral-100 text-neutral-500 rounded-none hover:bg-neutral-100 shadow-inner'
			)}>
			<li>{children}</li>
		</Button>
	);
};

export { FormProgressSheetButton };

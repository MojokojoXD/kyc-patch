import * as React from 'react';
import { CalendarDays as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/UIcomponents/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/UIcomponents/ui/popover';
import { DayPicker, PropsBase } from 'react-day-picker';
import 'react-day-picker/style.css';

type DatePickerProps = PropsBase & {
	currentDate: string;
	onDateChange: ( date: string ) => void;
};

export default function DatePicker({
	currentDate,
	onDateChange,
	...props
}: DatePickerProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'secondary'}
					size={'lg'}
					className={cn(
						'w-full justify-between text-left text-base px-4 py-6',
						!currentDate && 'text-neutral-300'
					)}>
					{currentDate ? currentDate : <span>Select date</span>}
					<CalendarIcon className='h-5 w-5 text-neutral-700' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-4'>
                <DayPicker
                    {...props}
					showOutsideDays={false}
					required
					classNames={{
						selected: 'bg-neutral-700 text-neutral-100 rounded-full',
						today: 'text-primary-500',
						caption_label: 'text-sm justify-between',
						hidden: 'text-neutral-300',
						disabled: 'text-neutral-300',
					}}
					components={{
						DayButton: ({ children, ...props }) => (
							<Button
								variant={'link'}
								size={'sm'}
								{...props}>
								{children}
							</Button>
						),
					}}
					captionLayout={'dropdown'}
                    mode='single'
					selected={new Date(currentDate)}
					onSelect={(date) =>
						onDateChange(
							date.toLocaleDateString('en-GB', {
								dateStyle: 'medium',
							})
						)
					}
				/>
			</PopoverContent>
		</Popover>
	);
}

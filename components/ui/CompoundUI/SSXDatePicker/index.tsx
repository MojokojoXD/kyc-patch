import { useEffect, useRef, useState } from 'react';
import * as CalendarLayout from './structure';
import type {
	SSXDatePickerProps,
	SSXCalendarProps,
	CalendarActions,
} from './date-picker';
import { Input } from '../../input';
import { add, sub, setYear, format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarDays } from 'lucide-react';
export const SSXDatePicker = ({
	onDateChange,
	label = '',
	subText = '',
	placeholder = 'Select date',
  value = '',
  readonly = false,
	...props
}: SSXDatePickerProps) => {
	const currentDateValue = Date.parse(value);
	const dateValue = !Number.isNaN(currentDateValue)
		? new Date(currentDateValue)
		: undefined;

	const [selectedDate, setSelectedDate] = useState<Date | undefined>(dateValue);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [popoverPosition, setPopoverPosition] = useState<'top' | 'bottom'>(
		'bottom'
	);

	const calendarRef = useRef<HTMLDivElement | null>(null);
	const calendarPopoverRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
    const observableNode = calendarPopoverRef.current! as Element;
    
		const observer = new IntersectionObserver(
			(intersectionData) => {
				const [entry] = intersectionData;

				entry.boundingClientRect.bottom >= entry.rootBounds!.bottom
					? setPopoverPosition('top')
					: entry.boundingClientRect.top <= entry.rootBounds!.top
					? setPopoverPosition('bottom')
					: null;
			},
			{ root: null, threshold: 0.7, rootMargin: '0px' }
		);

		observer.observe(observableNode);

		return () => observer.unobserve(observableNode);
	}, [calendarPopoverRef]);

	useEffect(() => {
		const clickOutside = function (e: MouseEvent) {
			const calendarNode = calendarRef.current!;

			if (e.target instanceof Node) {
				const isDescendant = calendarNode.contains(e.target);

				if (!isDescendant) {
					setIsCalendarOpen(false);
				}
			}
		};

		document.addEventListener('click', clickOutside);

		return () => {
			document.removeEventListener('click', clickOutside);
		};
	}, []);

	const handleDateChange = (date: Date) => {
		setSelectedDate(date);
		onDateChange(date);
		setIsCalendarOpen(false);
	};

	return (
		<div className='relative flex flex-col gap-[12px] w-full'>
			<div>
				<label className='block text-[#020224] font-[500]'>{label}</label>
				<p className='text-neutral-600 text-[14px] leading-[17px] font-[400]'>
					{subText}
				</p>
			</div>
			<div
				ref={calendarRef}
				className={cn('relative flex flex-col rounded-lg bg-white transition-all duration-300 ease-out text-neutral-700')}>
				<div className='relative w-full flex items-center overflow-hidden'>
					<Input
						type='text'
						value={selectedDate ? format(selectedDate, 'd MMM yyyy') : ''}
            readOnly
            disabled={ readonly }
						placeholder={placeholder}
						className='text-4 font-[400] w-full cursor-pointer placeholder:text-neutral-200 py-6 h-12'
						onClick={() => setIsCalendarOpen((prevState) => !prevState)}
					/>
					{/*calendar icon*/}
					<div className='absolute right-4 h-fit'>
						<CalendarDays className={cn('h-6 aspect-square', readonly && 'opacity-60')}/>
					</div>
				</div>
				<div
					ref={calendarPopoverRef}
					className={cn(
						'absolute z-[100] transition-all delay-100',
						isCalendarOpen && 'scale-100 opacity-100',
						!isCalendarOpen && 'delay-150 scale-0 opacity-0',
						popoverPosition === 'top' ? 'bottom-[55px]' : 'top-[55px]'
					)}>
					<Calendar
						onDateChange={handleDateChange}
						selected={selectedDate}
						{...props}
					/>
				</div>
			</div>
		</div>
	);
};

const today = new Date();

const Calendar = ({
	onDateChange,
	minYear = 0,
	...props
}: Omit<
	SSXCalendarProps,
	'currentDate' | 'calendarView' | 'calendarAction'
>) => {
	const [currentDate, setCurrentDate] = useState(
		minYear > 0 ? sub(today, { years: minYear }) : today
	);
	const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
	const [calendarView, setCalendarView] = useState(false);

	const calendarAction = (modifySegment: CalendarActions) => {
		let newDate: Date;

		switch (modifySegment.type) {
			case 'prev-month':
				newDate = sub(currentDate, { months: 1 });
				setCurrentDate(newDate);
				break;

			case 'next-month':
				newDate = add(currentDate, { months: 1 });
				setCurrentDate(newDate);
				break;
			case 'next-year':
				setCurrentYear((prevYear) => prevYear + 20);
				break;
			case 'prev-year':
				setCurrentYear((prevYear) => prevYear - 20);
				break;
			case 'set-year':
				newDate = setYear(currentDate, modifySegment.year);
				setCurrentDate(newDate);
				setCalendarView((prevView) => !prevView);
				break;
			case 'toggle-calendar':
				setCalendarView((prevView) => !prevView);
				break;
			default:
				throw new Error('Segment modification not allowed or supported');
		}
	};

	const handleDateClick = (clickedDate: Date) => onDateChange(clickedDate);

	return (
		<CalendarLayout.Container
			calendarView={calendarView}
			currentDate={currentDate}
			calendarAction={calendarAction}
			onDateChange={handleDateClick}
			minYear={minYear}
			{...props}>
			<CalendarLayout.Header />
			<CalendarLayout.View />
			<CalendarLayout.YearPicker currentYear={currentYear} />
		</CalendarLayout.Container>
	);
};

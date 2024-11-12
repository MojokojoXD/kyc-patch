import { useEffect, useRef, useState } from 'react';
import * as CalendarLayout from './structure';
import type {
	SSXDatePickerProps,
	SSXCalendarProps,
	CalendarActions,
} from './date-picker';
import { add, sub, setYear, format } from 'date-fns';
import { cn } from '@/lib/utils';
export const SSXDatePicker = ({
	onDateChange,
	label = '',
	subText = '',
	placeholder = 'Select date',
	value,
	...props
}: SSXDatePickerProps) => {
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [popoverPosition, setPopoverPosition] = useState<'top' | 'bottom'>(
		'bottom'
	);

	const calendarRef = useRef<HTMLDivElement | null>(null);
	const calendarPopover = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (value) {
			const currentDateValue = Date.parse(value);

			if (Number.isNaN(currentDateValue)) {
				console.error('Invalid current date value');
				setSelectedDate(undefined);
				return;
			}
			setSelectedDate(new Date(currentDateValue));
		} else setSelectedDate(undefined);
	}, [value]);

	useEffect(() => {
		const clickOutside = function (e: MouseEvent) {
			const calendarNode = calendarRef.current!;

			if (e.target instanceof Node) {
				const isDescendant = calendarNode.contains(e.target);

				if (!isDescendant) setIsCalendarOpen(false);
			}
		};

		document.addEventListener('click', clickOutside);

		return () => document.removeEventListener('click', clickOutside);
	}, []);

	useEffect(() => {
		const elementNode = calendarPopover.current!;

		const trackDocumentScroll = function (e: Event) {
			if (!isCalendarOpen) return;
			const body = (e.target as Document).body;
			const calendarPopoverDimensions = elementNode.getBoundingClientRect();

			const switchThreshold = (calendarPopoverDimensions.height / 2) * -1;

			if (body.clientHeight - calendarPopoverDimensions.bottom < switchThreshold) {
				setPopoverPosition('top');
				return;
			}

			if (calendarPopoverDimensions.top < switchThreshold) {
				setPopoverPosition('bottom');
			}
		};

		document.addEventListener('scroll', trackDocumentScroll);

		return () => document.removeEventListener('scroll', trackDocumentScroll);
	}, [isCalendarOpen]);

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
				className='relative px-4 flex flex-col rounded-lg bg-white transition-all duration-300 ease-out border border-neutral-200 hover:border-primary-300 text-neutral-700'>
				<div className='relative w-full flex items-center overflow-hidden'>
					<input
						type='text'
						value={
							selectedDate
								? format( selectedDate, 'd MMM yyyy' )
								: ''
						}
						readOnly
						placeholder={placeholder}
						className='border-none text-neutral-900 text-[16px] font-[400] w-full bg-transparent cursor-pointer outline-none placeholder:text-neutral-200 py-6 h-12'
						onClick={() => setIsCalendarOpen((prevState) => !prevState)}
					/>
					{/*calendar icon*/}
					<div className='absolute right-0 h-fit'>
						<svg
							width='21'
							height='22'
							viewBox='0 0 21 22'
							fill='#1B2D49'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M10.5 18C10.6978 18 10.8911 17.9414 11.0556 17.8315C11.22 17.7216 11.3482 17.5654 11.4239 17.3827C11.4996 17.2 11.5194 16.9989 11.4808 16.8049C11.4422 16.6109 11.347 16.4327 11.2071 16.2929C11.0673 16.153 10.8891 16.0578 10.6951 16.0192C10.5011 15.9806 10.3 16.0004 10.1173 16.0761C9.93459 16.1518 9.77841 16.28 9.66853 16.4444C9.55865 16.6089 9.5 16.8022 9.5 17C9.5 17.2652 9.60536 17.5196 9.79289 17.7071C9.98043 17.8946 10.2348 18 10.5 18ZM15.5 18C15.6978 18 15.8911 17.9414 16.0556 17.8315C16.22 17.7216 16.3482 17.5654 16.4239 17.3827C16.4996 17.2 16.5194 16.9989 16.4808 16.8049C16.4422 16.6109 16.347 16.4327 16.2071 16.2929C16.0673 16.153 15.8891 16.0578 15.6951 16.0192C15.5011 15.9806 15.3 16.0004 15.1173 16.0761C14.9346 16.1518 14.7784 16.28 14.6685 16.4444C14.5586 16.6089 14.5 16.8022 14.5 17C14.5 17.2652 14.6054 17.5196 14.7929 17.7071C14.9804 17.8946 15.2348 18 15.5 18ZM15.5 14C15.6978 14 15.8911 13.9414 16.0556 13.8315C16.22 13.7216 16.3482 13.5654 16.4239 13.3827C16.4996 13.2 16.5194 12.9989 16.4808 12.8049C16.4422 12.6109 16.347 12.4327 16.2071 12.2929C16.0673 12.153 15.8891 12.0578 15.6951 12.0192C15.5011 11.9806 15.3 12.0004 15.1173 12.0761C14.9346 12.1518 14.7784 12.28 14.6685 12.4444C14.5586 12.6089 14.5 12.8022 14.5 13C14.5 13.2652 14.6054 13.5196 14.7929 13.7071C14.9804 13.8946 15.2348 14 15.5 14ZM10.5 14C10.6978 14 10.8911 13.9414 11.0556 13.8315C11.22 13.7216 11.3482 13.5654 11.4239 13.3827C11.4996 13.2 11.5194 12.9989 11.4808 12.8049C11.4422 12.6109 11.347 12.4327 11.2071 12.2929C11.0673 12.153 10.8891 12.0578 10.6951 12.0192C10.5011 11.9806 10.3 12.0004 10.1173 12.0761C9.93459 12.1518 9.77841 12.28 9.66853 12.4444C9.55865 12.6089 9.5 12.8022 9.5 13C9.5 13.2652 9.60536 13.5196 9.79289 13.7071C9.98043 13.8946 10.2348 14 10.5 14ZM17.5 2H16.5V1C16.5 0.734784 16.3946 0.48043 16.2071 0.292893C16.0196 0.105357 15.7652 0 15.5 0C15.2348 0 14.9804 0.105357 14.7929 0.292893C14.6054 0.48043 14.5 0.734784 14.5 1V2H6.5V1C6.5 0.734784 6.39464 0.48043 6.20711 0.292893C6.01957 0.105357 5.76522 0 5.5 0C5.23478 0 4.98043 0.105357 4.79289 0.292893C4.60536 0.48043 4.5 0.734784 4.5 1V2H3.5C2.70435 2 1.94129 2.31607 1.37868 2.87868C0.816071 3.44129 0.5 4.20435 0.5 5V19C0.5 19.7956 0.816071 20.5587 1.37868 21.1213C1.94129 21.6839 2.70435 22 3.5 22H17.5C18.2956 22 19.0587 21.6839 19.6213 21.1213C20.1839 20.5587 20.5 19.7956 20.5 19V5C20.5 4.20435 20.1839 3.44129 19.6213 2.87868C19.0587 2.31607 18.2956 2 17.5 2ZM18.5 19C18.5 19.2652 18.3946 19.5196 18.2071 19.7071C18.0196 19.8946 17.7652 20 17.5 20H3.5C3.23478 20 2.98043 19.8946 2.79289 19.7071C2.60536 19.5196 2.5 19.2652 2.5 19V10H18.5V19ZM18.5 8H2.5V5C2.5 4.73478 2.60536 4.48043 2.79289 4.29289C2.98043 4.10536 3.23478 4 3.5 4H4.5V5C4.5 5.26522 4.60536 5.51957 4.79289 5.70711C4.98043 5.89464 5.23478 6 5.5 6C5.76522 6 6.01957 5.89464 6.20711 5.70711C6.39464 5.51957 6.5 5.26522 6.5 5V4H14.5V5C14.5 5.26522 14.6054 5.51957 14.7929 5.70711C14.9804 5.89464 15.2348 6 15.5 6C15.7652 6 16.0196 5.89464 16.2071 5.70711C16.3946 5.51957 16.5 5.26522 16.5 5V4H17.5C17.7652 4 18.0196 4.10536 18.2071 4.29289C18.3946 4.48043 18.5 4.73478 18.5 5V8ZM5.5 14C5.69778 14 5.89112 13.9414 6.05557 13.8315C6.22002 13.7216 6.34819 13.5654 6.42388 13.3827C6.49957 13.2 6.51937 12.9989 6.48079 12.8049C6.4422 12.6109 6.34696 12.4327 6.20711 12.2929C6.06725 12.153 5.88907 12.0578 5.69509 12.0192C5.50111 11.9806 5.30004 12.0004 5.11732 12.0761C4.93459 12.1518 4.77841 12.28 4.66853 12.4444C4.55865 12.6089 4.5 12.8022 4.5 13C4.5 13.2652 4.60536 13.5196 4.79289 13.7071C4.98043 13.8946 5.23478 14 5.5 14ZM5.5 18C5.69778 18 5.89112 17.9414 6.05557 17.8315C6.22002 17.7216 6.34819 17.5654 6.42388 17.3827C6.49957 17.2 6.51937 16.9989 6.48079 16.8049C6.4422 16.6109 6.34696 16.4327 6.20711 16.2929C6.06725 16.153 5.88907 16.0578 5.69509 16.0192C5.50111 15.9806 5.30004 16.0004 5.11732 16.0761C4.93459 16.1518 4.77841 16.28 4.66853 16.4444C4.55865 16.6089 4.5 16.8022 4.5 17C4.5 17.2652 4.60536 17.5196 4.79289 17.7071C4.98043 17.8946 5.23478 18 5.5 18Z'
								fill='#070B12'
							/>
						</svg>
					</div>
				</div>

				<div
					ref={calendarPopover}
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

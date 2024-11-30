import {
	forwardRef,
	HTMLAttributes,
	createContext,
	useContext,
	JSX,
} from 'react';
import { cn } from '@/lib/utils';
import { getDaysInMonth, sub, isBefore, isAfter, isSameDay,format } from 'date-fns';
import type { SSXCalendarProps } from '../date-picker';

const CalendarContext = createContext<SSXCalendarProps>({
	selected: undefined,
	disableFutureDays: false,
	disablePastDays: false,
	minYear: 0,
	calendarView: false,
	currentDate: new Date(),
	onDateChange: (date) => {
		console.log(date);
	},
	calendarAction: (_action) => {},
});

type CalenderContainerProps = HTMLAttributes<HTMLDivElement> & SSXCalendarProps;

const Container = forwardRef<HTMLDivElement, CalenderContainerProps>(
	(
		{
			children,
			className,
			calendarView,
			currentDate,
			selected,
			disableFutureDays,
			disablePastDays,
			minYear,
			onDateChange,
			calendarAction,
			...props
		},
		ref
	) => (
		<CalendarContext.Provider
			value={{
				calendarView,
				currentDate,
				selected,
				disableFutureDays,
				disablePastDays,
				minYear,
				onDateChange,
				calendarAction,
			}}>
			<div
				ref={ref}
				className={cn(
					'bg-white p-[16px] z-[100] rounded-lg w-[446px] shadow border border-neutral-100 origin-top',
					className
				)}
				{...props}>
				{children}
			</div>
		</CalendarContext.Provider>
	)
);

Container.displayName = 'CalendarContainer';

const Header = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const { calendarView, calendarAction, currentDate } =
			useContext(CalendarContext);

		const headerBtnClx =
			'aspect-square h-[24px] flex justify-center items-center disabled:opacity-20';

		return (
			<div
				ref={ref}
				className={cn('flex justify-between items-center mb-[10px]', className)}
				{...props}>
				{calendarView && (
					<button
						type='button'
						className={cn(headerBtnClx)}
						onClick={() => calendarAction({ type: 'prev-year' })}>
						{/*circle arrow left*/}
						<svg
							width='20'
							height='20'
							viewBox='0 0 20 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M6.29 9.29C6.19896 9.3851 6.12759 9.49725 6.08 9.62C5.97998 9.86346 5.97998 10.1365 6.08 10.38C6.12759 10.5028 6.19896 10.6149 6.29 10.71L9.29 13.71C9.4783 13.8983 9.7337 14.0041 10 14.0041C10.2663 14.0041 10.5217 13.8983 10.71 13.71C10.8983 13.5217 11.0041 13.2663 11.0041 13C11.0041 12.7337 10.8983 12.4783 10.71 12.29L9.41 11H13C13.2652 11 13.5196 10.8946 13.7071 10.7071C13.8946 10.5196 14 10.2652 14 10C14 9.73478 13.8946 9.48043 13.7071 9.29289C13.5196 9.10536 13.2652 9 13 9H9.41L10.71 7.71C10.8037 7.61704 10.8781 7.50644 10.9289 7.38458C10.9797 7.26272 11.0058 7.13201 11.0058 7C11.0058 6.86799 10.9797 6.73728 10.9289 6.61542C10.8781 6.49356 10.8037 6.38296 10.71 6.29C10.617 6.19627 10.5064 6.12188 10.3846 6.07111C10.2627 6.02034 10.132 5.9942 10 5.9942C9.86799 5.9942 9.73728 6.02034 9.61542 6.07111C9.49356 6.12188 9.38296 6.19627 9.29 6.29L6.29 9.29ZM0 10C0 11.9778 0.58649 13.9112 1.6853 15.5557C2.78412 17.2002 4.3459 18.4819 6.17317 19.2388C8.00043 19.9957 10.0111 20.1937 11.9509 19.8079C13.8907 19.422 15.6725 18.4696 17.0711 17.0711C18.4696 15.6725 19.422 13.8907 19.8079 11.9509C20.1937 10.0111 19.9957 8.00043 19.2388 6.17317C18.4819 4.3459 17.2002 2.78412 15.5557 1.6853C13.9112 0.58649 11.9778 0 10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10ZM18 10C18 11.5823 17.5308 13.129 16.6518 14.4446C15.7727 15.7602 14.5233 16.7855 13.0615 17.391C11.5997 17.9965 9.99113 18.155 8.43928 17.8463C6.88743 17.5376 5.46197 16.7757 4.34315 15.6569C3.22433 14.538 2.4624 13.1126 2.15372 11.5607C1.84504 10.0089 2.00346 8.40034 2.60896 6.93853C3.21447 5.47672 4.23984 4.22729 5.55544 3.34824C6.87103 2.46919 8.41775 2 10 2C12.1217 2 14.1566 2.84285 15.6569 4.34315C17.1571 5.84344 18 7.87827 18 10Z'
								fill='#070B12'
							/>
						</svg>
					</button>
				)}
				{!calendarView && (
					<button
						type='button'
						className={cn(headerBtnClx)}
						onClick={() => calendarAction({ type: 'prev-month' })}>
						{/*left angle*/}
						<svg
							width='8'
							height='12'
							viewBox='0 0 8 12'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M3.28982 5.99995L6.82982 2.45995C7.01607 2.27259 7.12061 2.01913 7.12061 1.75495C7.12061 1.49076 7.01607 1.23731 6.82982 1.04995C6.73686 0.95622 6.62626 0.881826 6.5044 0.831057C6.38254 0.780288 6.25183 0.75415 6.11982 0.75415C5.98781 0.75415 5.8571 0.780288 5.73524 0.831057C5.61339 0.881826 5.50278 0.95622 5.40982 1.04995L1.16982 5.28995C1.07609 5.38291 1.0017 5.49351 0.950931 5.61537C0.900162 5.73723 0.874023 5.86794 0.874023 5.99995C0.874023 6.13196 0.900162 6.26267 0.950931 6.38453C1.0017 6.50638 1.07609 6.61699 1.16982 6.70995L5.40982 10.9999C5.50326 11.0926 5.61408 11.166 5.73592 11.2157C5.85775 11.2655 5.98821 11.2907 6.11982 11.2899C6.25143 11.2907 6.38189 11.2655 6.50373 11.2157C6.62557 11.166 6.73638 11.0926 6.82982 10.9999C7.01607 10.8126 7.12061 10.5591 7.12061 10.2949C7.12061 10.0308 7.01607 9.77731 6.82982 9.58995L3.28982 5.99995Z'
								fill='#070B12'
							/>
						</svg>
					</button>
				)}
				<button
					type='button'
					className='flex items-center justify-center w-[154px] text-center paragraph2Medium cursor-pointer rounded-[50px] py-[4px] gap-[4px] hover:bg-neutral-100 [&>svg]:transition-all [&>svg]:duration-300'
					onClick={() => calendarAction({ type: 'toggle-calendar' })}>
					{ format( currentDate, 'MMMM yyyy' ) }
					<svg
						className={cn(calendarView && 'rotate-180')}
						width='12'
						height='8'
						viewBox='0 0 12 8'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M11 1.17C10.8126 0.983753 10.5592 0.879211 10.295 0.879211C10.0308 0.879211 9.77737 0.983753 9.59001 1.17L6.00001 4.71L2.46001 1.17C2.27265 0.983753 2.0192 0.879211 1.75501 0.879211C1.49082 0.879211 1.23737 0.983753 1.05001 1.17C0.956281 1.26297 0.881887 1.37357 0.831118 1.49543C0.780349 1.61729 0.754211 1.74799 0.754211 1.88C0.754211 2.01202 0.780349 2.14272 0.831118 2.26458C0.881887 2.38644 0.956281 2.49704 1.05001 2.59L5.29001 6.83C5.38297 6.92373 5.49357 6.99813 5.61543 7.04889C5.73729 7.09966 5.868 7.1258 6.00001 7.1258C6.13202 7.1258 6.26273 7.09966 6.38459 7.04889C6.50645 6.99813 6.61705 6.92373 6.71001 6.83L11 2.59C11.0937 2.49704 11.1681 2.38644 11.2189 2.26458C11.2697 2.14272 11.2958 2.01202 11.2958 1.88C11.2958 1.74799 11.2697 1.61729 11.2189 1.49543C11.1681 1.37357 11.0937 1.26297 11 1.17Z'
							fill='#070B12'
						/>
					</svg>
				</button>
				{!calendarView && (
					<button
						type='button'
						className={cn(headerBtnClx)}
						onClick={() => calendarAction({ type: 'next-month' })}>
						{/*right angle*/}
						<svg
							width='8'
							height='12'
							viewBox='0 0 8 12'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M6.83019 5.28995L2.59019 1.04995C2.49722 0.95622 2.38662 0.881826 2.26476 0.831057C2.1429 0.780288 2.0122 0.75415 1.88019 0.75415C1.74818 0.75415 1.61747 0.780288 1.49561 0.831057C1.37375 0.881826 1.26315 0.95622 1.17019 1.04995C0.983936 1.23731 0.879395 1.49076 0.879395 1.75495C0.879395 2.01913 0.983936 2.27259 1.17019 2.45995L4.71019 5.99995L1.17019 9.53995C0.983936 9.72731 0.879395 9.98076 0.879395 10.2449C0.879395 10.5091 0.983936 10.7626 1.17019 10.9499C1.26363 11.0426 1.37444 11.116 1.49628 11.1657C1.61812 11.2155 1.74858 11.2407 1.88019 11.2399C2.01179 11.2407 2.14226 11.2155 2.26409 11.1657C2.38593 11.116 2.49675 11.0426 2.59019 10.9499L6.83019 6.70995C6.92392 6.61699 6.99831 6.50638 7.04908 6.38453C7.09985 6.26267 7.12599 6.13196 7.12599 5.99995C7.12599 5.86794 7.09985 5.73723 7.04908 5.61537C6.99831 5.49351 6.92392 5.38291 6.83019 5.28995Z'
								fill='#070B12'
							/>
						</svg>
					</button>
				)}
				{calendarView && (
					<button
						type='button'
						className={cn(headerBtnClx)}
						onClick={() => calendarAction({ type: 'next-year' })}>
						{/*circle arrow right*/}
						<svg
							width='20'
							height='20'
							viewBox='0 0 20 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M13.71 10.71C13.801 10.6149 13.8724 10.5028 13.92 10.38C14.02 10.1365 14.02 9.86347 13.92 9.62C13.8724 9.49725 13.801 9.38511 13.71 9.29L10.71 6.29C10.5217 6.1017 10.2663 5.99591 10 5.99591C9.7337 5.99591 9.47831 6.1017 9.29 6.29C9.1017 6.47831 8.99591 6.7337 8.99591 7C8.99591 7.26631 9.1017 7.5217 9.29 7.71L10.59 9H7C6.73479 9 6.48043 9.10536 6.2929 9.2929C6.10536 9.48043 6 9.73479 6 10C6 10.2652 6.10536 10.5196 6.2929 10.7071C6.48043 10.8946 6.73479 11 7 11H10.59L9.29 12.29C9.19628 12.383 9.12188 12.4936 9.07111 12.6154C9.02034 12.7373 8.99421 12.868 8.99421 13C8.99421 13.132 9.02034 13.2627 9.07111 13.3846C9.12188 13.5064 9.19628 13.617 9.29 13.71C9.38297 13.8037 9.49357 13.8781 9.61543 13.9289C9.73729 13.9797 9.86799 14.0058 10 14.0058C10.132 14.0058 10.2627 13.9797 10.3846 13.9289C10.5064 13.8781 10.617 13.8037 10.71 13.71L13.71 10.71ZM20 10C20 8.02219 19.4135 6.08879 18.3147 4.4443C17.2159 2.79981 15.6541 1.51809 13.8268 0.761209C11.9996 0.00433284 9.98891 -0.193701 8.0491 0.192152C6.10929 0.578004 4.32746 1.53041 2.92894 2.92894C1.53041 4.32746 0.578004 6.10929 0.192152 8.0491C-0.193701 9.98891 0.00433284 11.9996 0.761209 13.8268C1.51809 15.6541 2.79981 17.2159 4.4443 18.3147C6.08879 19.4135 8.02219 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10ZM2 10C2 8.41775 2.4692 6.87104 3.34825 5.55544C4.2273 4.23985 5.47673 3.21447 6.93854 2.60897C8.40035 2.00347 10.0089 1.84504 11.5607 2.15372C13.1126 2.4624 14.538 3.22433 15.6569 4.34315C16.7757 5.46197 17.5376 6.88743 17.8463 8.43928C18.155 9.99113 17.9965 11.5997 17.391 13.0615C16.7855 14.5233 15.7602 15.7727 14.4446 16.6518C13.129 17.5308 11.5823 18 10 18C7.87827 18 5.84344 17.1572 4.34315 15.6569C2.84286 14.1566 2 12.1217 2 10Z'
								fill='#070B12'
							/>
						</svg>
					</button>
				)}
			</div>
		);
	}
);

Header.displayName = 'CalendarHeader';

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const calendarBtnBaseClx =
	'text-center cursor-pointer w-[35px] h-[35px] flex justify-center items-center rounded-full paragraph2Regular hover:bg-neutral-100 text-neutral-700';

const disabled = 'text-neutral-200 cursor-default hover:bg-transparent';

const renderCalendar = (config: {
	selected: Date | undefined;
	minYear?: number;
	disableFutureDays?: boolean;
	disablePastDays?: boolean;
	onDateChange: (clickedDate: Date) => void;
	currentDate?: Date;
}) => {
	const {
		selected,
		minYear = 0,
		disableFutureDays,
		disablePastDays,
		onDateChange,
		currentDate,
	} = config;
	if (!currentDate) return [];

	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const firstDay = new Date(year, month, 1).getDay();
	const previousMonthDate = sub(currentDate, { months: 1 });
	const previousMonth = previousMonthDate.getMonth();
	const daysInPreviousMonth = getDaysInMonth(previousMonth);
	const days: JSX.Element[] = [];

	// Add last days from the previous month
	for (let i = firstDay - 1; i >= 0; i--) {
		const day = daysInPreviousMonth - i;
		days.push(
			<div
				key={`previous-day-${day}`}
				className={cn(calendarBtnBaseClx, disabled)}>
				{day}
			</div>
		);
	}

	// Add days of the current month

	const today = new Date();
	const offsetDate = sub(today, { years: minYear });

	for (let day = 1; day <= daysInMonth; day++) {
		const iterationDate = new Date(year, month, day);

		const isSelected = selected && isSameDay(selected, iterationDate);
		const isCurrentDay = isSameDay(today, iterationDate);
		const isPastDay =
			disablePastDays && isBefore(iterationDate, sub(offsetDate, { days: 1 }));
		const isFutureDay = disableFutureDays && isAfter(iterationDate, offsetDate);

		const dayClassName = cn(
			isSelected &&
				'bg-neutral-900 text-white hover:bg-neutral-900 hover:text-white',
			isCurrentDay && 'font-[500] border border-primary-500 text-primary-500',
			isCurrentDay &&
				isSelected &&
				'bg-primary-500 hover:bg-primary-500 text-white',
			(isPastDay || isFutureDay) && disabled
		);

		const handleClick = isPastDay || isFutureDay ? undefined : onDateChange;

		days.push(
			<button
				key={`current-day-${day}`}
				type='button'
				className={cn(calendarBtnBaseClx, dayClassName)}
				onClick={() => handleClick?.call(this, iterationDate)}>
				{day}
			</button>
		);
	}

	// Add first days of the next month
	const remainingDays = (7 - (days.length % 7)) % 7;
	for (let day = 1; day <= remainingDays; day++) {
		days.push(
			<div
				key={`next-day-${day}`}
				className={cn(calendarBtnBaseClx, disabled)}>
				{day}
			</div>
		);
	}
	return days;
};

const View = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const { calendarView, calendarAction, ...others } =
			useContext(CalendarContext);
		return (
			<div
				ref={ref}
				className={cn(!calendarView ? 'block' : 'hidden', className)}
				{...props}>
				<div className='grid grid-cols-7 gap-[16px] mb-[16px]'>
					{daysOfWeek.map((d) => (
						<div
							key={d}
							className='flex-[1_1_0] text-center paragraph2Medium aspect-square h-[35px]'>
							{d}
						</div>
					))}
				</div>
				<div className='grid grid-cols-7 gap-[16px]'>
					{renderCalendar({ ...others })}
				</div>
			</div>
		);
	}
);

View.displayName = 'CalendarView';

type YearPickerProps = HTMLAttributes<HTMLDivElement> & {
	currentYear: number;
};

const YearPicker = forwardRef<HTMLDivElement, YearPickerProps>(
	({ currentYear, className, ...props }, ref) => {
		const {
			currentDate,
			calendarView,
			calendarAction,
			disableFutureDays,
			disablePastDays,
			minYear,
		} = useContext(CalendarContext);

		const selectedClx =
			'bg-neutral-900 text-white hover:bg-neutral-900 hover:text-white';

		const renderYearPicker = () => {
			if (!currentDate) return [];

			const defaultYear = sub(new Date(), { years: minYear }).getFullYear();

			const years: JSX.Element[] = [];
			for (let year = currentYear - 7; year <= currentYear + 7; year++) {
				years.push(
					<button
						disabled={
							(disablePastDays && year < defaultYear) ||
							(disableFutureDays && year > defaultYear)
						}
						key={year}
						type='button'
						onClick={() => calendarAction({ type: 'set-year', year })}
						className={cn(
							'text-center rounded-[50px] h-[35px] flex justify-center items-center cursor-pointer hover:bg-neutral-100 disabled:opacity-20 disabled:cursor-default paragraph2Regular',
							year === currentDate.getFullYear() && selectedClx
						)}>
						{year}
					</button>
				);
			}

			return (
				<div className='year-picker'>
					<div className='grid grid-cols-3 gap-[16px]'>{years}</div>
				</div>
			);
		};

		return (
			<div
				className={cn(calendarView ? 'block' : 'hidden', className)}
				ref={ref}
				{...props}>
				{renderYearPicker()}
			</div>
		);
	}
);

YearPicker.displayName = 'CalendarYearPicker';

export { Container, Header, View, YearPicker };

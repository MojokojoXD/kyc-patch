export type CalendarActions =
	| { type: 'prev-month' }
	| { type: 'next-month' }
	| { type: 'prev-year' }
	| { type: 'next-year' }
	| { type: 'set-year'; year: number }
	| { type: 'toggle-calendar' };

export interface SSXDatePickerProps {
	onDateChange: (date: Date) => void;
	label?: string;
	subText?: string;
	disablePastDays?: boolean;
	disableFutureDays?: boolean;
	placeholder?: string;
	value?: string;
	minYear?: number;
}
export interface SSXCalendarProps {
	onDateChange: (date: Date) => void;
	selected: Date | undefined;
	calendarView: boolean;
	currentDate: Date;
    calendarAction: ( action: CalendarActions ) => void;
    
    disableFutureDays?: boolean;

    disablePastDays?: boolean;

    minYear?: number
}

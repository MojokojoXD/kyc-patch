import type { DayPickerProps } from "react-day-picker";
import type { Country, Bank } from "../universal";
import type { InputProps } from "@/components/UIcomponents/ui/input";

export interface FormFactoryProps<TOption>
	extends FactoryComponentProps<TOption> {
	fieldType: FactoryFieldType;
}

type FactoryFieldType =
	| 'text'
	| 'date'
	| 'radio'
	| 'checkbox'
	| 'dropdown'
	| 'phone';

type ComponentPropsRecord = 'phoneMode' | 'className';

export type FactoryComponentProps<TOption> = {
	label: string;
	inline?: boolean;
	name: string;
	componentProps?: Partial<
		Omit<InputProps, 'disabled'> &
			DayPickerProps & {
				phoneMode?: 'single' | 'multi';
			}
	>;
	rules?: RegisterOptions;
	placeholder?: string;
	defaultValue?: string;
	options?: {
		keySelector: (key: TOption) => string;
		keys: TOption[];
		priorityKeys?: (keys: TOption[]) => TOption[];
	};
};
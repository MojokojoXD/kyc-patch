import type { DayPickerProps } from 'react-day-picker';
import type { Country, Bank } from '../forms/universal';
import type { InputProps } from '@/components/UIcomponents/ui/input';
import type { RegisterOptions } from 'react-hook-form';
import type { BrokerCode } from '../forms/broker';

type DropdownOption = Country | Bank | string;

type Tag =
	| BrokerCode
	| 'local'
	| 'foreign'
	| 'optional-contact'
    | 'residence-contact'
    | 'remove-all-except'
    | 'control-employment'

type FactoryFieldType =
	| 'text'
	| 'date'
	| 'radio'
	| 'checkbox'
	| 'dropdown'
	| 'phone';

export interface FormFactoryProps extends FactoryComponentProps {
	fieldType: FactoryFieldType;
}

type ComponentPropsRecord = 'phoneMode' | 'className';

export type FactoryComponentProps = {
	label: string;
	inline?: boolean;
	readonly name: string;
	componentProps?: Partial<
		Omit<InputProps, 'disabled'> &
			DayPickerProps & {
				phoneMode?: 'single' | 'multi';
            maxPhoneCount?: number;
            toggleStyles?: string;
			}
	>;
	rules?: RegisterOptions;
	placeholder?: string;
	defaultValue?: string;
	options?: {
		keySelector: <TOption = string>(key: TOption) => string;
		keys: string[] | object[];
		priorityKeys?: <TOption = string>(keys: TOption[]) => TOption[];
	};
	tags?: Tag[];
};

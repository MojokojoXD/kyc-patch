import type { PropsBase } from 'react-day-picker';
import type { Country, BankList } from '../forms/universal';
import type { InputProps } from '@/components/UIcomponents/ui/input';
import type { RegisterOptions } from 'react-hook-form';
import type { BrokerCode } from '../forms/broker';

type DropdownOption = Country | BankList | string;

type Tag =
	| BrokerCode
	| 'NG'
	| 'GH'
	| 'KE'
	| 'local'
	| 'foreign'
	| 'optional-contact'
	| 'residence-contact'
	| 'remove-all-except'
	| 'control-employment';

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
			PropsBase & {
				phoneMode?: 'single' | 'multi';
				maxPhoneCount?: number;
				toggleStyles?: string;
			}
	>;
	rules?: RegisterOptions;
	placeholder?: string;
	defaultValue?: string;
	options?: {
		keySelector(key: DropdownOption): string;
		keys: DropdownOption[];
		priorityKeys?: (keys: DropdownOption[]) => DropdownOption[];
	};
	tags?: Tag[];
};

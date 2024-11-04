import type { PropsBase } from 'react-day-picker';
import type { Country, BankList } from '../forms/common';
import type { InputProps } from '@/components/UIcomponents/ui/input';
import type { RegisterOptions } from 'react-hook-form';
import type { BrokerCode } from '../forms/broker';
import type { Path } from 'react-hook-form';
import type { IndividualFormSchema } from '../forms/individualSchema';

type DropdownOption = Country | BankList | string;

type Tag =
	| BrokerCode
	| 'NG'
	| 'GH'
    | 'KE'
    | 'read-only'
    | 'remove'
	| 'optional-contact'
	| 'residence-contact'
	| 'remove-all-except'
	| 'control-employment'
	| 'deps';

type FactoryFieldType =
	| 'text'
	| 'date'
	| 'radio'
	| 'checkbox'
	| 'dropdown'
	| 'phone'
	| 'signature'
	| 'agreement'
	| 'file-upload';


export interface FormFactoryProps extends FactoryComponentProps {
	fieldType: FactoryFieldType;
}

export type FactoryComponentProps = {
	label: string;
	inline?: boolean;
    readonly name: Path<IndividualFormSchema> | string;
    readonly?: boolean;
	componentProps?: Partial<
		Omit<InputProps, 'disabled'> &
			PropsBase & {
				phoneMode?: 'single' | 'multi';
				maxPhoneCount?: number;
				toggleStyles?: string;
				clientID?: string;
				agreementVersion?: string;
				fileFieldName?: string;
				isCurrency?: boolean;
				otherProps?: {
					label: string;
					placeholder: string;
				};
			}
	>;
	rules?: RegisterOptions;
	placeholder?: string;
	defaultValue?: string | boolean;
	options?: {
		keySelector(key: DropdownOption): string;
		keys: DropdownOption[] | undefined;
		priorityKeys?: DropdownOption[];
	};
    tags?: Tag[];
    reviewerOverride?: {
        name?: string;
        type?: FactoryFieldType;
        label?: string;
    };
};

import type { Country, BankList } from '../forms/common';
import type { RegisterOptions } from 'react-hook-form';
import type { BrokerCode } from '../forms/broker';
import type { Path } from 'react-hook-form';
import type { FormComponentProps } from './formComponentProps';

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



export type FormFieldModel<TFormField extends FactoryFieldType = FactoryFieldType> = {
	fieldType: TFormField;
	label: string;
	inline?: boolean;
	readonly name: Path<object> | string;
	readonly?: boolean;
	componentProps?: FormComponentProps<TFormField>;
	rules?: RegisterOptions | null;
	placeholder?: string;
	defaultValue?: string | boolean;
	options?: {
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

export type FormFactoryProps =
	| FormFieldModel<'agreement'>
	| FormFieldModel<'checkbox'>
	| FormFieldModel<'date'>
	| FormFieldModel<'dropdown'>
	| FormFieldModel<'file-upload'>
	| FormFieldModel<'phone'>
	| FormFieldModel<'radio'>
	| FormFieldModel<'signature'>
	| FormFieldModel<'text'>;

export type FactoryComponentProps<TFieldType extends FactoryFieldType> = Omit<FormFieldModel<TFieldType>, 'reviewerOverride' | 'tags' | 'fieldType' | 'inline'>;
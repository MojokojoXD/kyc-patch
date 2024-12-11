import type { HTMLAttributes } from 'react';
import type { FactoryFieldType } from './formFactory';
import type { SSXDatePickerProps } from '@/components/ui/CompoundUI/SSXDatePicker/date-picker';

type ClassName = string | undefined;
interface ComponentClasses {
	labelStyles?: ClassName;
	errorPosition?: 'relative' | 'absolute';
}

interface FormInputComponentProps extends HTMLAttributes<'input'> {
	isCurrency?: boolean;
	classNames?: ComponentClasses & { inputStyles?: ClassName };
}
interface FormDropdownComponentProps {
	isCountryList?: boolean;
	classNames?: ComponentClasses & {
		selectTriggerStyles?: ClassName;
		selectPopoverStyles?: ClassName;
	};
}

interface FormAgreementComponentProps {
	classNames?: Omit<ComponentClasses, 'labelStyles'> & {
		toggleStyles?: ClassName;
	};
	agreementVersion?: string;
}

interface FormFileUploadComponentProps {
	fileFieldName?: string;
	classNames?: ComponentClasses;
}

interface FormSignatureUploadComponentProps {
  classNames?: ComponentClasses;
  indexer?: number;
}

interface FormCheckboxComponentProps {
	classNames?: ComponentClasses & {
		toggleStyles?: ClassName;
		boxGroupStyles?: ClassName;
	};
}

interface FormDateComponentProps
	extends Pick<
		SSXDatePickerProps,
		'disableFutureDays' | 'disablePastDays' | 'minYear' | 'placeholder'
	> {
	classNames?: ComponentClasses;
}

interface FormPhoneComponentProps {
	classNames?: ComponentClasses;
	phoneMode?: 'multi' | 'single';

	maxPhoneCount?: number;
}
interface FormRadioComponentProps {
	classNames?: ComponentClasses & {
    toggleStyles?: ClassName;
    radioGroupStyles?: ClassName;
	};
	otherInputProps?: {
		label?: string;
		placeholder?: string;
		classNames?: ComponentClasses & {
			inputStyles?: ClassName;
		};
	};
}

type FormField<A extends FactoryFieldType, B> = { A: A; B: B };

type FieldComponentUnion =
	| FormField<'radio', FormRadioComponentProps>
	| FormField<'checkbox', FormCheckboxComponentProps>
	| FormField<'text', FormInputComponentProps>
	| FormField<'date', FormDateComponentProps>
	| FormField<'dropdown', FormDropdownComponentProps>
	| FormField<'phone', FormPhoneComponentProps>
	| FormField<'signature', FormSignatureUploadComponentProps>
	| FormField<'agreement', FormAgreementComponentProps>
	| FormField<'file-upload', FormFileUploadComponentProps>;


export type FormComponentProps<TField extends FactoryFieldType> = Extract<FieldComponentUnion, FormField<TField, unknown>>[ 'B' ];


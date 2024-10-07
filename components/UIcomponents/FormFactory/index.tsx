import type { UseFormRegister,Path,RegisterOptions } from 'react-hook-form';
import type { InputProps } from '../ui/input';
import FormInput from './FactoryComponents/FormInput';
import FormDate from './FactoryComponents/FormDate';
import FormRadio from './FactoryComponents/FormRadio';
import FormCheckBox from './FactoryComponents/FormCheckBox';
import FormDropdown from './FactoryComponents/FormDropdown';
import FormPhone from './FactoryComponents/FormPhone';
import type { DayPickerProps } from 'react-day-picker';



export interface FormFactoryProps extends FactoryComponentProps{
	fieldType: FactoryFieldType;
}

type FactoryFieldType = 'text' | 'date' | 'radio' | 'checkbox' | 'dropdown' | 'phone';

export type FactoryComponentProps = {
    label: string;
    inline?: boolean;
    name: string;
    componentProps?: InputProps | DayPickerProps | Record<string,any>;
    rules?: RegisterOptions;
    placeholder?: string;
    defaultValue?: string;
    options?: {
        keySelector: ( key: any) => string;
        keys: any[];
    };
};

export default function FormFactory({ fieldType,inline, ...fieldProps }: FormFactoryProps) {

	const renderFormField = () => {
		switch (fieldType) {
			case 'text':
                return <FormInput { ...fieldProps } />;
            case 'date':
                return <FormDate { ...fieldProps } />;
            case 'radio':
                return <FormRadio { ...fieldProps } />;
            case 'checkbox':
                return <FormCheckBox { ...fieldProps } />;
            case 'dropdown':
                return <FormDropdown { ...fieldProps } />;
            case 'phone':
                return <FormPhone { ...fieldProps }/>
			default:
				return null; // if component is not supported
		}
	};

    return (
        <div className={ inline ? 'inline-block w-1/3' : 'block'}>
           { renderFormField() }
        </div>
    );
}

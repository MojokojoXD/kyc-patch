import type { UseFormRegister, Path, RegisterOptions } from 'react-hook-form';
import FormInput from './FactoryComponents/FormInput';
import FormDate from './FactoryComponents/FormDate';
import FormRadio from './FactoryComponents/FormRadio';
import FormCheckBox from './FactoryComponents/FormCheckBox';
import FormDropdown from './FactoryComponents/FormDropdown';
import FormPhone from './FactoryComponents/FormPhone';
import type { FormFactoryProps } from '@/types/forms/Components/FormFactory';

export default function FormFactory<TOptions>({
	fieldType,
	inline,
	...fieldProps
}: FormFactoryProps<TOptions>) {
	const renderFormField = () => {
		switch (fieldType) {
			case 'text':
				return <FormInput {...fieldProps} />;
			case 'date':
				return <FormDate {...fieldProps} />;
			case 'radio':
				return <FormRadio {...fieldProps} />;
			case 'checkbox':
				return <FormCheckBox {...fieldProps} />;
			case 'dropdown':
				return <FormDropdown {...fieldProps} />;
			case 'phone':
				return <FormPhone {...fieldProps} />;
			default:
				return null; // if component is not supported
		}
	};

	return (
		<div className={inline ? 'inline-block w-1/3' : 'block'}>
			{renderFormField()}
		</div>
	);
}

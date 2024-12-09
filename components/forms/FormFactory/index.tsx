import FormInput from './FactoryComponents/FormInput';
import FormDate from './FactoryComponents/FormDate';
import FormRadio from './FactoryComponents/FormRadio';
import FormCheckbox from './FactoryComponents/FormCheckBox';
import FormDropdown from './FactoryComponents/FormDropdown';
import FormPhone from './FactoryComponents/FormPhone';
import FormSignatureUpload from './FactoryComponents/FormSignatureUpload';
import FormAgreement from './FactoryComponents/FormAgreement';
import FormFileUpload from './FactoryComponents/FormFileUpload';
import type { FormFieldModel } from '@/types/Components/formFactory';
export default function FormFactory({
	fieldType,
  inline,
  reviewerOverride,
	...fieldProps
}: FormFieldModel) {
	const renderFormField = () => {
		switch (fieldType) {
			case 'text':
				return <FormInput {...fieldProps} />;
			case 'date':
				return <FormDate {...fieldProps} />;
			case 'radio':
				return <FormRadio {...fieldProps} />;
			case 'checkbox':
				return <FormCheckbox {...fieldProps} />;
			case 'dropdown':
				return <FormDropdown {...fieldProps} />;
			case 'phone':
				return <FormPhone {...fieldProps} />;
			case 'signature':
				return <FormSignatureUpload {...fieldProps} />;
			case 'agreement':
				return <FormAgreement {...fieldProps} />;
			case 'file-upload':
				return <FormFileUpload {...fieldProps} />;
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

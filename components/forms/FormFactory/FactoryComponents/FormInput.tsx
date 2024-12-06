import type { FactoryComponentProps } from '@/types/Components/formFactory';
import { Input } from '@/components/ui/input';
import { FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { useFormContext, Controller } from 'react-hook-form';
import { FormHelpers } from '@/utils/clientActions/formHelpers';

interface FormInputProps extends FactoryComponentProps {}

export default function FormInput({
	label,
	name,
	placeholder,
	defaultValue = '',
	readonly = false,
	rules,
	componentProps = { isCurrency: false, errorPosition: 'absolute' },
}: FormInputProps) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			rules={!rules ? {} : rules}
			render={({ field, fieldState }) => (
				<FormItem className='space-y-2 mr-1'>
					<FormLabel className={fieldState.error ? 'text-error-500' : undefined}>
						{label}
					</FormLabel>
					<FormControl>
						<Input
							{...field}
							disabled={readonly}
							onChange={(e) => {
								let inputValue = e.target.value;

								if (componentProps.isCurrency && !Number.isNaN(parseInt(inputValue))) {
									inputValue = inputValue.replace(/,/g, '');

									inputValue = FormHelpers.currencyInputFormatter(inputValue);

									field.onChange(inputValue);
								}

								field.onChange(inputValue);
							}}
							placeholder={placeholder}
						/>
					</FormControl>
					<FormMessage position={componentProps.errorPosition}>
						{fieldState.error?.message}
					</FormMessage>
				</FormItem>
			)}
		/>
	);
}

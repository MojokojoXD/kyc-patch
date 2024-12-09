import type { FactoryComponentProps } from '@/types/Components/formFactory';
import { Input } from '@/components/ui/input';
import {
	FormItem,
	FormControl,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useFormContext, Controller } from 'react-hook-form';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import { cn } from '@/lib/utils';

interface FormInputProps extends FactoryComponentProps<'text'> {}

export default function FormInput({
	label,
	name,
	placeholder,
	defaultValue = '',
	readonly = false,
	rules,
	componentProps = {
		isCurrency: false,
	},
}: FormInputProps) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			rules={!rules ? {} : rules}
			render={({ field, fieldState }) => (
				<FormItem className='mr-1'>
					<FormLabel
						className={cn(
							componentProps?.classNames?.labelStyles,
							fieldState.error ? 'text-error-500' : undefined
						)}>
						{label}
					</FormLabel>
					<FormControl>
						<Input
              { ...field }
              value={ field.value ?? '' }
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
					<FormMessage position={componentProps?.classNames?.errorPosition}>
						{fieldState.error?.message}
					</FormMessage>
				</FormItem>
			)}
		/>
	);
}

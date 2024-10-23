import type { FactoryComponentProps } from '@/types/Components/formFactory';
import { Input } from '../../ui/input';
import {
	FormItem,
	FormControl,
	FormLabel,
	FormMessage,
} from '../../ui/form';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { FormHelpers } from '@/utils/clientActions/formHelpers';

interface FormInputProps extends FactoryComponentProps {}

export default function FormInput({
	label,
	name,
	placeholder,
	defaultValue = '',
	rules,
	componentProps = { isCurrency: false },
}: FormInputProps) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			rules={rules}
			render={({ field, fieldState }) => (
				<FormItem className='space-y-2 mr-1'>
					<FormLabel
						className={fieldState.error ? 'text-error-500' : undefined}>
						{label}
					</FormLabel>
					<FormControl>
						<Input
							{...field}
							onChange={(e) => {
								let inputValue = e.target.value;

								if (
									componentProps.isCurrency &&
									!Number.isNaN(parseInt(inputValue))
								) {
									inputValue = inputValue.replace(/,/g, '');

									inputValue = FormHelpers.currencyInputFormatter(inputValue);

									field.onChange(inputValue);
								}

								field.onChange(inputValue);
							}}
							className={cn(
								'focus-visible:border-primary-500',
								!fieldState.invalid &&
									fieldState.isDirty &&
									'border-success-500 focus-visible:border-success-500 hover:border-success-500'
							)}
							placeholder={placeholder}
						/>
					</FormControl>
					<FormMessage>{fieldState.error?.message}</FormMessage>
				</FormItem>
			)}
		/>
	);
}

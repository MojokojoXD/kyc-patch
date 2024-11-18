import { useState } from 'react';
import type { FactoryComponentProps } from '@/types/Components/formFactory';
import { Input } from '../../ui/input';
import { FormItem, FormControl, FormLabel, FormMessage } from '../../ui/form';
import { useFormContext, Controller } from 'react-hook-form';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import { Button } from '../../ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface FormPwdInputProps extends FactoryComponentProps {}

export default function FormPasswordInput({
	label,
	name,
	placeholder,
	defaultValue = '',
	readonly = false,
	rules,
	componentProps = { isCurrency: false, errorPosition: 'absolute' },
}: FormPwdInputProps) {
	const { control } = useFormContext();
	const [revealPwd, setRevealPwd] = useState(false);

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
						<div className='relative flex items-center'>
							<Input
								{...field}
								type={revealPwd ? 'text' : 'password'}
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
								className='disabled:hover:border-neutral-200'
							/>
							<Button
								size={'sm'}
								type='button'
								variant={'ghost'}
								className='absolute right-2 text-neutral-400'
								onClick={() => setRevealPwd((prevState) => !prevState)}>
								{revealPwd ? <EyeOff /> : <Eye />}
							</Button>
						</div>
					</FormControl>
					<FormMessage position={componentProps.errorPosition}>
						{fieldState.error?.message}
					</FormMessage>
				</FormItem>
			)}
		/>
	);
}

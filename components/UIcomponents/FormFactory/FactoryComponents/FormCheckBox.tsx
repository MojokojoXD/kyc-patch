import type { FactoryComponentProps } from '@/types/Components/formFactory';
import {
	FormItem,
	FormControl,
	FormLabel,
	FormMessage,
} from '../../ui/form';
import { useFormContext } from 'react-hook-form';
import { CustomToggle } from '../../CompoundUI/CustomToggle';
import { cn } from '@/lib/utils';
import { Controller } from 'react-hook-form';

interface FormCheckBoxProps extends FactoryComponentProps {}

export default function FormCheckBox({
	label,
	name,
	options,
	rules,
	componentProps = { className: '', toggleStyles: '' },
}: FormCheckBoxProps) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			defaultValue={[]}
			render={({ field, fieldState }) => (
				<FormItem className='space-y-2'>
					<FormLabel
						className={fieldState.error ? 'text-error-500' : undefined}>
						{label}
					</FormLabel>
					<FormControl>
						<div className={cn('grid gap-[4px]', componentProps.className)}>
							{options &&
								options.keys.map((o) => (
									<CustomToggle
										key={options.keySelector(o)}
										{...field}
										onChange={(e) => {
											let temp = [];

											if (e.target.checked) {
												temp = [...field.value, e.target.value];
												field.onChange(temp);
												return;
											}

											temp = (field.value as string[]).filter((v) => v !== e.target.value);

											field.onChange(temp);
										}}
										className={componentProps.toggleStyles}
										value={options.keySelector(o)}
										type={'checkbox'}
										label={options.keySelector(o)}
										selected={field.value.includes(options.keySelector(o))}
									/>
								))}
						</div>
					</FormControl>
					<FormMessage>{fieldState.error?.message}</FormMessage>
				</FormItem>
			)}
		/>
	);
}

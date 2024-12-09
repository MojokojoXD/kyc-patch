import type { FactoryComponentProps } from '@/types/Components/formFactory';
import {
	FormItem,
	FormControl,
	FormLabel,
	FormMessage,
} from '../../../ui/form';
import { useFormContext } from 'react-hook-form';
import { CustomToggle } from '@/components/ui/CompoundUI/CustomToggle';
import { cn } from '@/lib/utils';
import { Controller } from 'react-hook-form';

interface FormCheckBoxProps extends FactoryComponentProps<'checkbox'> {}

export default function FormCheckbox({
	label,
	name,
	options,
	readonly,
	rules,
	componentProps,
}: FormCheckBoxProps) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			rules={!rules ? {} : rules}
			defaultValue={[]}
			render={({ field, fieldState }) => (
				<FormItem className='space-y-2'>
					<FormLabel
						className={cn(
							componentProps?.classNames?.labelStyles,
							fieldState.error && 'text-error-500'
						)}>
						{label + ' (one or more)'}
					</FormLabel>
					<FormControl>
						<div
							className={cn('grid gap-[4px]', componentProps?.classNames?.boxGroupStyles)}>
							{options?.keys &&
								options.keys.map((o) => {
									if (typeof o !== 'string') return <></>;
									return (
										<CustomToggle
											key={o}
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
											className={componentProps?.classNames?.toggleStyles}
											value={o}
											type={'checkbox'}
											readonly={readonly}
											label={o}
											selected={field.value.includes(o)}
										/>
									);
								})}
						</div>
					</FormControl>
					<FormMessage position={componentProps?.classNames?.errorPosition}>
						{fieldState.error?.message}
					</FormMessage>
				</FormItem>
			)}
		/>
	);
}

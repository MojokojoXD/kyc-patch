import type { FactoryComponentProps } from '@/types/Components/formFactory';
import { FormItem, FormLabel, FormMessage, FormControl } from '../../ui/form';
import { useFormContext } from 'react-hook-form';
import { CustomToggle } from '../../CompoundUI/CustomToggle';
import { cn } from '@/lib/utils';
import { Controller } from 'react-hook-form';
import { Input } from '../../ui/input';
import { useEffect, useRef } from 'react';

interface FormRadioProps extends FactoryComponentProps {}

export default function FormRadio({
	label,
	name,
	rules,
	options,
    defaultValue = '',
    readonly,
	componentProps = {
		toggleStyles: 'text-nowrap truncate',
		className: '',
		otherProps: {
			label: 'Other? Specify',
			placeholder: 'Specify',
		},
	},
}: FormRadioProps) {
	const { control, watch, resetField } = useFormContext();

	const otherFieldName = useRef<string>('');

	const currentValue = watch(name);

	const isOther = currentValue === 'Other' || currentValue === 'other';

	if (isOther) {
		const modifiedBaseName = name.split('.').slice(0, -1);

		modifiedBaseName.push('other');

		otherFieldName.current = modifiedBaseName.join('.');
	}

	useEffect(() => {
		if (!isOther && otherFieldName.current) {
			resetField(otherFieldName.current, { defaultValue: '' });
			otherFieldName.current = '';
		}
	}, [currentValue, otherFieldName, resetField, isOther]);

	return (
		<div className='space-y-[16px]'>
			<Controller
				control={control}
				name={name}
				defaultValue={defaultValue}
				rules={{ ...rules }}
				render={({ field, fieldState }) => (
					<FormItem className='space-y-2'>
						<FormLabel className={fieldState.error ? 'text-error-500' : undefined}>
							{label}
						</FormLabel>
						<div className={cn('grid gap-[4px]', componentProps.className)}>
							{options &&
								options.keys.map((o) => (
									<CustomToggle
                                        key={ options.keySelector( o ) }
                                        readonly={ readonly }
										{...field}
										value={options.keySelector(o)}
										className={componentProps.toggleStyles}
										label={options.keySelector(o)}
										selected={field.value === options.keySelector(o)}
									/>
								))}
						</div>
						<FormMessage>{fieldState.error?.message}</FormMessage>
					</FormItem>
				)}
			/>
			{(currentValue === 'Other' || currentValue === 'other') && (
				<Controller
					control={control}
					name={otherFieldName.current}
					defaultValue={''}
					rules={{
						required: 'Please enter other ' + label.toLocaleLowerCase(),
					}}
					render={({ field, fieldState }) => (
						<FormItem>
							<FormLabel>{componentProps.otherProps?.label}</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder={componentProps.otherProps?.placeholder}
								/>
							</FormControl>
							<FormMessage>{fieldState.error?.message}</FormMessage>
						</FormItem>
					)}
				/>
			)}
		</div>
	);
}

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

interface FormCheckBoxProps extends FactoryComponentProps {}

export default function FormCheckBox({
	label,
	name,
	options,
	readonly,
	rules,
	componentProps = { className: '', toggleStyles: '' },
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
					<FormLabel className={fieldState.error ? 'text-error-500' : undefined}>
						{label + ' (one or more)'}
					</FormLabel>
					<FormControl>
						<div className={cn('grid gap-[4px]', componentProps.className)}>
							{options?.keys &&
                options.keys.map( ( o ) =>
                {
                  if( typeof o !== 'string' ) return <></>
                  return(
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
										className={componentProps.toggleStyles}
										value={o}
										type={'checkbox'}
										readonly={readonly}
										label={o}
										selected={field.value.includes(o)}
									/>
								)})}
						</div>
					</FormControl>
					<FormMessage>{fieldState.error?.message}</FormMessage>
				</FormItem>
			)}
		/>
	);
}

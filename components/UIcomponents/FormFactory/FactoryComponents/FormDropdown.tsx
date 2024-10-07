import type { FactoryComponentProps } from '..';
import { FormItem, FormControl, FormError, FormLabel,FormMessage } from '../../ui/form';
import { useFormContext } from 'react-hook-form';
import { CustomToggle } from '../../CompoundUI/CustomToggle';
import { cn } from '@/lib/utils';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../ui/select';
import { Controller } from 'react-hook-form';

interface FormDropdownProps extends FactoryComponentProps {}

export default function FormDropdown({
	label,
	name,
	placeholder,
	rules,
    options,
    defaultValue = '',
	componentProps = {},
}: FormDropdownProps) {
	const { register, control, trigger } = useFormContext();


	return (
		<Controller
			control={control}
            name={ name }
            defaultValue={defaultValue}
			rules={{
				...rules,
			}}
			render={({ field,fieldState }) => (
				<FormItem className='space-y-2'>
					<FormLabel className={fieldState.error ? 'text-error-500' : undefined}>
						{label}
					</FormLabel>
					<FormControl>
						<Select
							onValueChange={(v) => field.onChange(v)}
							defaultValue={field.value}>
							<SelectTrigger ref={field.ref}>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
							<SelectContent >
								{options && options.keys.map((o) => (
									<SelectItem
										key={options.keySelector(o)}
										value={options.keySelector(o)}>
										{options.keySelector(o)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FormControl>
                    <FormMessage>
                        {fieldState.error?.message}
                    </FormMessage>
				</FormItem>
			)}
		/>
	);
}

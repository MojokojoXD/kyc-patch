import type { FactoryComponentProps } from '..';
import {
	FormItem,
	FormControl,
	FormError,
	FormLabel,
	FormMessage,
} from '../../ui/form';
import { useFormContext,useFormState } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { CustomToggle } from '../../CompoundUI/CustomToggle';
import { cn } from '@/lib/utils';
import type { IndividualFormSchema } from '@/types/forms/individual';
import { Controller } from 'react-hook-form';

interface FormRadioProps extends FactoryComponentProps {}

export default function FormRadio({
	label,
	name,
	placeholder,
	rules,
	options,
	defaultValue = '',
	componentProps = {},
}: FormRadioProps) {
	const { control } = useFormContext();

	const gridStyles =
		componentProps && componentProps.className
			? (componentProps.className as string)
			: '';

    return (
        <Controller
            control={control}
            name={ name }
            defaultValue={defaultValue}
            rules={rules}
            render={({ field,fieldState })=> (
                <FormItem className='space-y-2'>
                    <FormLabel className={fieldState.error ? 'text-error-500' : undefined}>
                        {label}
                    </FormLabel>
                    <div className={cn('grid gap-[4px]', gridStyles)}>
                        {options &&
                            options.keys.map((o: string) => (
                                <CustomToggle
                                    key={options.keySelector(o)}
                                    { ...field}
                                    value={options.keySelector(o)}
                                    label={options.keySelector(o)}
                                    selected={field.value === options.keySelector(o)}
                                />
                            ))}
                    </div>
                    <FormMessage>
                        {fieldState.error?.message}
                    </FormMessage>
                </FormItem>
            ) }
        />
	);
}

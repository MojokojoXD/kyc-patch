import type { FactoryComponentProps } from '..';
import { FormItem, FormControl, FormError, FormLabel,FormMessage } from '../../ui/form';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useFormState } from 'react-hook-form';
import { CustomToggle } from '../../CompoundUI/CustomToggle';
import { cn } from '@/lib/utils';
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
	const { errors } = useFormState({ control, name });

    const gridStyles = ( componentProps && componentProps.className ) ? componentProps.className as string : "";

    return (
        <Controller 
            name={name}
            control={ control }
            defaultValue={defaultValue}
            rules={rules}
            render={({field, fieldState}) => (
                <FormItem className='space-y-2'>
                    <FormLabel className={fieldState.error ? 'text-error-500' : undefined}>
                        {label}
                    </FormLabel>
                    <FormControl>
                        <div className={cn('grid gap-[4px]', gridStyles)}>
                            {options && options.keys.map((o: string) => (
                                <CustomToggle
                                    key={o}
                                    {...field}
                                    value={o}
                                    label={o}
                                    selected={field.value === o}
                                />
                            ))}
                        </div>
                    </FormControl>
                    <FormMessage>
                        {fieldState.error?.message}
                    </FormMessage>
                </FormItem>
            )}
        />
	);
}

import type { FactoryComponentProps } from '@/types/Components/formFactory';
import {
	FormItem,
	FormLabel,
	FormMessage,
} from '../../ui/form';
import { useFormContext } from 'react-hook-form';
import { CustomToggle } from '../../CompoundUI/CustomToggle';
import { cn } from '@/lib/utils';
import { Controller } from 'react-hook-form';

interface FormRadioProps extends FactoryComponentProps {}

export default function FormRadio({
	label,
	name,
	rules,
	options,
	defaultValue = '',
	componentProps = { toggleStyles: 'text-nowrap truncate', className: "" },
}: FormRadioProps) {
	const { control } = useFormContext();


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
                    <div className={cn('grid gap-[4px]', componentProps.className)}>
                        {options &&
                            options.keys.map((o) => (
                                <CustomToggle
                                    key={options.keySelector(o)}
                                    { ...field }
                                    value={ options.keySelector( o ) }
                                    className={ componentProps.toggleStyles }
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

import DatePicker from '../../CompoundUI/DatePicker';
import type { FactoryComponentProps } from '@/types/Components/formFactory';
import {
	FormItem,
	FormControl,
    FormLabel,
    FormMessage
} from '../../ui/form';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';

export interface FormDateProps extends FactoryComponentProps {}

export default function FormDate({
    label,
	name,
    defaultValue = '',
    readonly,
	rules,
	componentProps = {},
}: FormDateProps) {
	const {
		control,
	} = useFormContext();

    return (
        <Controller
            control={ control }
            name={ name }
            rules={!rules ? {} : rules}
            defaultValue={defaultValue}
            render={({ field,fieldState }) => (
                <FormItem className='space-y-2'>
                    <FormLabel
                        className={ fieldState.error ? 'text-error-500' : undefined}>
                        {label}
                    </FormLabel>
                    <FormControl>
                        <div ref={ field.ref }>
                            <DatePicker
                                { ...componentProps }
                                readonly={readonly}
                                mode={ 'single' }
                                onDateChange={ d => field.onChange( d ) }
                                currentDate={ field.value }
                            />
                        </div>
                    </FormControl>
                    <FormMessage>
                        { fieldState.error?.message }
                    </FormMessage>
                </FormItem>
            )}
        />
	);
}

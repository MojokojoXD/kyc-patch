import type { FactoryComponentProps } from '@/types/Components/formFactory';
import { Input } from '../../ui/input';
import { FormItem, FormControl, FormLabel,FormMessage } from '../../ui/form';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface FormInputProps extends FactoryComponentProps {}

export default function FormInput({
	label,
	name,
    placeholder,
    defaultValue = '',
    rules,
}: FormInputProps) {
    const { control } = useFormContext();

    return (
        <Controller 
            name={ name }
            control={ control }
            defaultValue={defaultValue}
            rules={rules}
            render={ ({field,fieldState}) => (
                <FormItem className='space-y-2 mr-1'>
                    <FormLabel className={fieldState.error ? 'text-error-500' : undefined}>
                        {label}
                    </FormLabel>
                    <FormControl>
                        <Input
                            {...field}
                            placeholder={placeholder}
                        />
                    </FormControl>
                    <FormMessage>
                        { fieldState.error?.message }
                    </FormMessage>
                </FormItem>
            ) }
        />
	);
}

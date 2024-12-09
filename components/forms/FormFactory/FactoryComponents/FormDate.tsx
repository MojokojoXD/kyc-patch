// import DatePicker from '../../CompoundUI/DatePicker';
import { SSXDatePicker } from '../../../ui/CompoundUI/SSXDatePicker';
import type { FactoryComponentProps } from '@/types/Components/formFactory';
import {
	FormItem,
	FormControl,
	FormLabel,
	FormMessage,
} from '../../../ui/form';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';

export interface FormDateProps extends FactoryComponentProps<'date'> {}

export default function FormDate({
	label,
	name,
	defaultValue = '',
	readonly,
	rules,
  componentProps ,
}: FormDateProps) {
  const { control } = useFormContext();
  
  const { classNames, ...others } = componentProps ? componentProps : {
		disableFutureDays: false,
		disablePastDays: false,
		minYear: 0,
	}

	return (
		<Controller
			control={control}
			name={name}
			rules={!rules ? {} : rules}
			defaultValue={defaultValue}
			render={({ field, fieldState }) => (
				<FormItem className='space-y-2'>
					<FormLabel className={fieldState.error ? 'text-error-500' : undefined}>
						{label}
					</FormLabel>
					<FormControl>
						<div ref={field.ref}>
							<SSXDatePicker
								onDateChange={(date) => field.onChange(date.toISOString())}
								value={field.value}
								placeholder={'Select Date'}
                { ...others }
                readonly={ readonly }
							/>
						</div>
					</FormControl>
					<FormMessage position={ classNames?.errorPosition }>{fieldState.error?.message}</FormMessage>
				</FormItem>
			)}
		/>
	);
}

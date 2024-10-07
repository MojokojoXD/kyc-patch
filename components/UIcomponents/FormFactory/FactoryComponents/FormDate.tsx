import * as React from 'react';
import { CalendarDays as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/UIcomponents/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/UIcomponents/ui/popover';
import { DayPicker } from 'react-day-picker';
import { ComponentProps } from 'react';
import type { FactoryComponentProps } from '..';
import { Input } from '../../ui/input';
import { FormItem, FormControl, FormError, FormLabel } from '../../ui/form';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useFormState } from 'react-hook-form';

export interface FormDateProps extends FactoryComponentProps {}

export default function FormDate({
	label,
	name,
    placeholder,
    defaultValue = '',
	rules,
	componentProps = {},
}: FormDateProps) {
	const { register, getValues, setValue, control,trigger,clearErrors } = useFormContext();
	const { errors } = useFormState({ control, name });

    const currentDate = getValues( name ) as string || defaultValue;

	const {
		name: fieldName,
        ref,
	} = register(name, {
        ...rules,
	});

	return (
		<FormItem className='space-y-2'>
			<FormLabel className={errors[fieldName] ? 'text-error-500' : undefined}>
				{label}
			</FormLabel>
			<FormControl>
				<>
					<Popover>
						<PopoverTrigger asChild>
							<Button
                                ref={ ref }
								variant={'secondary'}
								size={'lg'}
								className={cn(
									'w-full justify-between text-left text-base px-4 py-6',
									!currentDate && 'text-neutral-300'
								)}>
								{currentDate ? currentDate : <span>{placeholder}</span>}
								<CalendarIcon className='h-5 w-5 text-neutral-700' />
							</Button>
						</PopoverTrigger>
						<PopoverContent className='w-auto p-4' onCloseAutoFocus={ e => trigger(fieldName) }>
							<DayPicker
								{...componentProps}
                                showOutsideDays={ false }
								required
								classNames={{
									selected: 'bg-neutral-700 text-neutral-100 rounded-full',
									today: 'text-primary-500',
									caption_label: 'text-sm justify-between',
									hidden: 'text-neutral-300',
									disabled: 'text-neutral-300',
								}}
								components={{
									DayButton: ({ children, ...props }) => (
										<Button
											variant={'link'}
											size={'sm'}
											{...props}>
											{children}
										</Button>
									),
								}}
								captionLayout={'dropdown'}
								mode='single'
                                selected={ new Date( currentDate ) }
                                onSelect={ async ( date ) =>
                                {
                                    clearErrors( fieldName );
									setValue(
                                        fieldName,
										date.toLocaleDateString('en-GB', {
                                            dateStyle: 'medium',
										})
                                    );
                                    
								}}
							/>
						</PopoverContent>
					</Popover>
				</>
			</FormControl>
			<ErrorMessage
				name={fieldName}
				as={<FormError />}
				errors={errors}
			/>
		</FormItem>
	);
}

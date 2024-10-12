import type { FactoryComponentProps } from '@/types/Components/formFactory';
import { FormItem, FormControl, FormError, FormLabel } from '../../ui/form';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useFormState } from 'react-hook-form';
import { CustomToggle } from '../../CompoundUI/CustomToggle';
import { cn } from '@/lib/utils';

interface FormCheckBoxProps extends FactoryComponentProps {}

export default function FormCheckBox({
	label,
	name,
    options,
    rules,
	componentProps = {},
}: FormCheckBoxProps) {
	const { register, control, getValues } = useFormContext();
	const { errors } = useFormState({ control, name });

	const currentValue = getValues(name) as string[];

	const gridStyles =
		componentProps && componentProps.className
			? (componentProps.className as string)
			: '';

	return (
		<FormItem className='space-y-2'>
			<FormLabel className={errors[name] ? 'text-error-500' : undefined}>
				{label}
			</FormLabel>
			<FormControl>
				<div className={cn('grid gap-[4px]', gridStyles)}>
					{options && (options.keys as string[]).map((o) => (
						<CustomToggle
							key={options.}
							{...register(name,{...rules})}
							type={'checkbox'}
							value={o}
							label={o}
							selected={
								currentValue
									? currentValue.includes(o)
									: false
							}
						/>
					))}
				</div>
			</FormControl>
			<ErrorMessage
				name={name}
				as={<FormError />}
				errors={errors}
			/>
		</FormItem>
	);
}

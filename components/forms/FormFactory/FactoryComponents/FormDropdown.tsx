import type { FactoryComponentProps } from '@/types/Components/formFactory';
import {
	FormItem,
	FormControl,
	FormLabel,
	FormMessage,
} from '../../../ui/form';
import { useFormContext } from 'react-hook-form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectGroup,
} from '../../../ui/select';
import { Controller } from 'react-hook-form';

interface FormDropdownProps extends FactoryComponentProps {}

export default function FormDropdown({
	label,
	name,
	placeholder,
	readonly = false,
	rules,
	options = { keySelector: () => '', keys: [], priorityKeys: [] },
	defaultValue = '',
}: FormDropdownProps) {
	const { control } = useFormContext();

	return (
		<Controller
			control={control}
			name={name}
			defaultValue={defaultValue}
			rules={{
				...rules,
			}}
			render={({ field, fieldState }) => (
				<FormItem className='space-y-2'>
					<FormLabel className={fieldState.error ? 'text-error-500' : undefined}>
						{label}
					</FormLabel>
					<FormControl>
						<div ref={field.ref}>
							<Select
								onValueChange={(v) => field.onChange(v)}
								defaultValue={field.value}>
								<SelectTrigger disabled={readonly} className='capitalize'>
									<SelectValue placeholder={placeholder}/>
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{options.priorityKeys &&
											options.priorityKeys.map((o) => (
												<SelectItem
													key={options!.keySelector(o)}
													value={options!.keySelector(o)}>
													{options!.keySelector(o).toLowerCase()}
												</SelectItem>
											))}
									</SelectGroup>
									{options.priorityKeys && options.priorityKeys?.length > 0 && (
										<hr className='my-2 border-neutral-200' />
									)}
									<SelectGroup>
										{options.keys &&
											options.keys.map((o) => (
												<SelectItem
													key={options.keySelector(o)}
													value={options.keySelector(o)}>
													{options.keySelector(o).toLowerCase()}
												</SelectItem>
											))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</FormControl>
					<FormMessage>{fieldState.error?.message}</FormMessage>
				</FormItem>
			)}
		/>
	);
}

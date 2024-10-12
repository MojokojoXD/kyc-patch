import type { FactoryComponentProps } from '@/types/Components/formFactory';
import {
	FormItem,
	FormControl,
	FormLabel,
	FormMessage,
} from '../../ui/form';
import { useFormContext } from 'react-hook-form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectGroup,
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
}: FormDropdownProps) {
	const { control } = useFormContext();

	let priorityList = [];
	let mainList = options!.keys;

	if (options && options.priorityKeys) {
		priorityList = options.priorityKeys(options.keys);
	}

	if (options && options.keys && priorityList.length > 0) {
		const priorityListKeys = priorityList.map((p) =>
			options.keySelector(p)
		);
		mainList = options.keys.filter(
			(k) => !priorityListKeys.includes(options.keySelector(k))
		);
	}
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
					<FormLabel
						className={fieldState.error ? 'text-error-500' : undefined}>
						{label}
					</FormLabel>
					<FormControl>
						<Select
							onValueChange={(v) => field.onChange(v)}
							defaultValue={field.value}>
							<SelectTrigger ref={field.ref}>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{priorityList.map((o) => (
										<SelectItem
											key={options!.keySelector(o)}
											value={options!.keySelector(o)}>
											{options!.keySelector(o)}
										</SelectItem>
									))}
								</SelectGroup>
								{priorityList.length > 0 && (
									<hr className='my-2 border-neutral-200' />
								)}
								<SelectGroup>
									{mainList.map((o) => (
										<SelectItem
											key={options.keySelector(o)}
											value={options.keySelector(o)}>
											{options.keySelector(o)}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</FormControl>
					<FormMessage>{fieldState.error?.message}</FormMessage>
				</FormItem>
			)}
		/>
	);
}

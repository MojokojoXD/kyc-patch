import type {
	DropdownOption,
	FactoryComponentProps,
} from '@/types/Components/formFactory';
import {
	FormItem,
	FormControl,
	FormLabel,
	FormMessage,
} from '../../../ui/form';
import { useKYCFormContext } from '../../utils/formController';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectGroup,
} from '../../../ui/select';
import { cn } from '@/lib/utils';
import { Controller } from 'react-hook-form';

interface FormDropdownProps extends FactoryComponentProps<'dropdown'> {}

export default function FormDropdown({
	label,
	name,
	placeholder,
	readonly = false,
	rules,
	options = { keys: [], priorityKeys: [] },
	defaultValue = '',
	componentProps = { isCountryList: false },
}: FormDropdownProps) {
	const {
		form: { control },
		formVars: { countryList },
	} = useKYCFormContext();

	const dropdownItems = { ...options };

	if (componentProps.isCountryList) {
		dropdownItems.keys = countryList[1];
		dropdownItems.priorityKeys = countryList[0];
	}

	const dropdownItemValueGetter = (value: DropdownOption) => {
		if (typeof value === 'object') {
			if ('cty_name' in value) return value.cty_name;
			if ('bank_name' in value) return value.bank_name;
		}

		return value;
	};

	return (
		<Controller
			control={control}
			name={name}
			defaultValue={defaultValue}
			rules={{
				...rules,
			}}
      render={ ( { field, fieldState } ) =>
      {
        return(
				<FormItem className='space-y-2'>
					<FormLabel
						className={cn(
							componentProps.classNames?.labelStyles,
							fieldState.error ? 'text-error-500' : undefined
						)}>
						{label}
					</FormLabel>
					<FormControl>
						<div ref={field.ref}>
							<Select
								onValueChange={(v) => field.onChange(v)}
								defaultValue={field.value}>
								<SelectTrigger
									disabled={readonly}
									className={cn('capitalize', componentProps.classNames?.selectTriggerStyles)}>
									<SelectValue placeholder={placeholder} />
								</SelectTrigger>
								<SelectContent className={componentProps.classNames?.selectPopoverStyles}>
									<SelectGroup>
										{dropdownItems.priorityKeys &&
											dropdownItems.priorityKeys.map((o) => {
												const value = dropdownItemValueGetter(o);

												return (
													<SelectItem
														key={value}
														value={value}>
														{value.toLowerCase()}
													</SelectItem>
												);
											})}
									</SelectGroup>
									{dropdownItems.priorityKeys && dropdownItems.priorityKeys?.length > 0 && (
										<hr className='my-2 border-neutral-200' />
									)}
									<SelectGroup>
										{dropdownItems.keys &&
											dropdownItems.keys.map((o) => {
												const value = dropdownItemValueGetter(o);
												return (
													<SelectItem
														key={value}
														value={value}>
														{value.toLowerCase()}
													</SelectItem>
												);
											})}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</FormControl>
					<FormMessage position={componentProps.classNames?.errorPosition}>
						{fieldState.error?.message}
					</FormMessage>
				</FormItem>
			)}}
		/>
	);
}

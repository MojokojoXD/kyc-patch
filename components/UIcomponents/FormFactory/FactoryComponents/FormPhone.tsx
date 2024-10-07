import type { FactoryComponentProps } from '..';
import { FormItem, FormControl, FormError, FormLabel } from '../../ui/form';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useFormState } from 'react-hook-form';
import { CustomToggle } from '../../CompoundUI/CustomToggle';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Input } from '../../ui/input';
import PhoneInput from 'react-phone-number-input/input';
import en from 'react-phone-number-input/flags';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectSeparator,
} from '../../ui/select';
import type { SelectProps } from '@radix-ui/react-select';
import COUNTRIES from '@/utils/vars/_formDefaults/countries.json';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import type { CountryCode } from '@/types/forms/universal';
import Image from 'next/image';

interface FormPhoneProps extends FactoryComponentProps { }


export default function FormPhone({
	label,
	name,
	placeholder,
	rules,
	componentProps = {},
}: FormPhoneProps) {
	const [country, setCountry] = useState<CountryCode>('GH');
	const { control, getValues, resetField } = useFormContext();
	const { errors } = useFormState({ control, name });

	return (
		<Controller
			control={control}
			name={name}
			defaultValue={''}
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
						<div
							className={
								'flex has-[:focus]:border-primary-500 rounded-lg border border-neutral-200 text-neutral-700 bg-white paragraph2Regular'
							}>
							<CustomCountrySelect
								labels={{}}
								onValueChange={(v: CountryCode) => {
									resetField(field.name, { defaultValue: '' });
									setCountry(v);
								}}
								defaultValue={country}
							/>
							<PhoneInput
								country={country}
								international
								withCountryCallingCode
								className='border-none'
								placeholder={placeholder}
								{...field}
								inputComponent={Input}
							/>
						</div>
					</FormControl>
					<ErrorMessage
						name={field.name}
						as={<FormError />}
						errors={errors}
					/>
				</FormItem>
			)}
		/>
	);
}

interface CustomCountrySelectProps extends SelectProps {
	labels: any;
}

const PRIORITY_COUNTRIES = ['GH', 'NG', 'KE'];

function CustomCountrySelect({
	onValueChange,
	labels,
	defaultValue,
}: CustomCountrySelectProps) {
	const priorityCountries = COUNTRIES.data.filter((c) =>
		PRIORITY_COUNTRIES.includes(c.cty_code)
	);
	const otherCountries = COUNTRIES.data.filter(
		(c) => !PRIORITY_COUNTRIES.includes(c.cty_code)
	);

	const flagURL = FormHelpers.getFlagURL(defaultValue as string, COUNTRIES.data);

	return (
		<Select
			onValueChange={onValueChange}
			defaultValue={defaultValue}>
			<SelectTrigger className='w-fit space-x-2 border-none'>
				<div className='h-[24px] w-[24px] relative'>
					{flagURL && (
						<Image
							src={flagURL}
							fill
							alt={`${defaultValue} flag`}
						/>
					)}
				</div>
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{priorityCountries.map((c) => (
						<SelectItem
							value={c.cty_code}
							key={c.cty_code}>
							{c.cty_name}
						</SelectItem>
					))}
				</SelectGroup>
				<hr className='my-2 border-neutral-200' />
				<SelectGroup>
					{otherCountries.map((c) => (
						<SelectItem
							value={c.cty_code}
							key={c.cty_code}>
							{c.cty_name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

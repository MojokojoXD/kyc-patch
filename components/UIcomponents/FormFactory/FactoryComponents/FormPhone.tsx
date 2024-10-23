import type {
	FactoryComponentProps,
	DropdownOption,
} from '@/types/Components/formFactory';
import {
	FormItem,
	FormControl,
	FormLabel,
	FormMessage,
} from '../../ui/form';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { Input } from '../../ui/input';
import PhoneInput from 'react-phone-number-input/input';
import { X, CirclePlus } from 'lucide-react';
import { Button } from '../../ui/button';
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectGroup,
	SelectItem,
} from '../../ui/select';
import type { SelectProps } from '@radix-ui/react-select';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import type { CountryCode } from '@/types/forms/universal';
import Image from 'next/image';
import type { Country } from '@/types/forms/universal';
import { cn } from '@/lib/utils';

interface FormPhoneProps extends FactoryComponentProps {}

export default function FormPhone({
	label,
	name,
	placeholder,
	rules,
	defaultValue = 'GH',
	componentProps = { phoneMode: 'multi', maxPhoneCount: 2 },
	options,
}: FormPhoneProps) {
	const { control, resetField, setValue, getValues } =
		useFormContext();

	const metaDataPath = (`_formMetadata.` as const) + name;

	const countryListMetadata = getValues(metaDataPath) as CountryCode[];

	const [country, setCountry] = useState<CountryCode[]>(
		countryListMetadata || []
	);

	const { fields, append, remove } = useFieldArray({
		control,
		name: name,
	});

	const handleCountryChange = (v: CountryCode, index: number) => {
		const temp: CountryCode[] = [...country];

		temp[index] = v;
		setCountry(temp);
	};

	const handleRemovePhoneNumber = (index: number) => {
		remove(index);
		setCountry((prevCountryList) => [
			...prevCountryList.filter((c, i) => i !== index),
		]);
	};

	useEffect(() => {
		if (fields.length === 0) {
			setValue(name, [{ value: '' }]);
		}
		setValue(metaDataPath, country);
	}, [country, fields, metaDataPath, name, setValue]);

	return (
		<>
			<FormItem>
				<FormLabel>{label}</FormLabel>
				<div className='space-y-[8px]'>
					{fields.map((field, i) => (
						<Controller
							key={field.id}
							control={control}
							name={`${name}.${i}.value`}
							defaultValue={defaultValue}
							rules={{
								...rules,
							}}
							render={({ field, fieldState }) => (
								<div>
									<FormControl>
										<div
											className={cn(
												'focus:border-primary-500 flex has-[:focus]:border-primary-500 rounded-lg border border-neutral-200 text-neutral-700 bg-white paragraph2Regular grow relative items-center overflow-hidden',
												!fieldState.invalid &&
													fieldState.isDirty &&
													'border-success-500 focus:border-success-500 hover:border-success-500'
											)}>
											<CustomCountrySelect
												options={options}
												onValueChange={(v: CountryCode) => {
													resetField(field.name, { defaultValue: '' });
													handleCountryChange(v, i);
												}}
												defaultValue={country[i] || defaultValue}
											/>
											<PhoneInput
												country={country[i] || defaultValue}
												international
												className='border-none'
												placeholder={placeholder}
												{...field}
												inputComponent={Input}
											/>
											{i !== 0 && (
												<Button
													type='button'
													size={'icon'}
													variant={'ghost'}
													className='absolute right-1 text-primary-500'
													onClick={() => handleRemovePhoneNumber(i)}>
													<X className='h-[24px] w-[24px]' />
												</Button>
											)}
										</div>
									</FormControl>
									<FormMessage className='relative mt-2'>
										{fieldState.error?.message}
									</FormMessage>
								</div>
							)}
						/>
					))}
				</div>
				{componentProps.phoneMode === 'multi' && (
					<Button
						variant={'link'}
						type='button'
						disabled={fields.length === componentProps.maxPhoneCount}
						className='text-primary-500 hover:bg-none hover:no-underline px-0 py-2 h-fit '
						onClick={() => {
							setCountry((prevCountryList) => [
								...prevCountryList,
								defaultValue as CountryCode,
							]);
							append({ value: '' });
						}}>
						<CirclePlus className='h-[20px] w-[20px] mr-1' />
						Add another number
					</Button>
				)}
			</FormItem>
		</>
	);
}

type Options = Pick<FactoryComponentProps, 'options'>;

type CustomCountrySelectProps = Options & SelectProps & object;

function CustomCountrySelect({
	onValueChange,
	defaultValue,
	options,
}: CustomCountrySelectProps) {
	let priorityList: DropdownOption[] = [];
	let mainList = options?.keys || [];

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

	const flagURL = FormHelpers.getFlagURL(
		defaultValue as string,
		options?.keys as Country[]
	);

	return (
		<Select
			onValueChange={onValueChange}
			defaultValue={defaultValue}>
			<SelectTrigger className='w-fit space-x-2 border-none rounded-none'>
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
					{priorityList.map((c) => (
						<SelectItem
							value={(c as Country).cty_code}
							key={(c as Country).cty_code}>
							{(c as Country).cty_name} ({(c as Country).call_code})
						</SelectItem>
					))}
				</SelectGroup>
				<hr className='my-2 border-neutral-200' />
				<SelectGroup>
					{mainList.map((c) => (
						<SelectItem
							value={(c as Country).cty_code}
							key={(c as Country).cty_code}>
							{(c as Country).cty_name} ({(c as Country).call_code})
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

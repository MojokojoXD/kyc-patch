import { useMemo } from 'react';
import type { FactoryComponentProps } from '@/types/Components/formFactory';
import { FormItem, FormControl, FormLabel, FormMessage } from '../../ui/form';
import { useFormContext, useFieldArray } from 'react-hook-form';
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
import type { CountryCode } from '@/types/forms/common';
import type { PhoneInfo } from '@/types/forms/common';
import Image from 'next/image';
import type { Country } from '@/types/forms/common';
import { cn } from '@/lib/utils';
import { isPossiblePhoneNumber } from 'react-phone-number-input';

interface FormPhoneProps extends FactoryComponentProps {}

export default function FormPhone({
	label,
	name,
	placeholder,
	readonly = false,
	rules = {
		validate: {
			isRequired: (v) =>
				(typeof v.value === 'string' && (v as PhoneInfo[number]).value !== '') ||
				'Please enter phone number',
			isValidPhone: (v) =>
				(typeof v.value === 'string' &&
					isPossiblePhoneNumber((v as PhoneInfo[number]).value)) ||
				'Please enter valid phone number',
		},
	},
	defaultValue = 'GH',
	componentProps = { phoneMode: 'multi', maxPhoneCount: 2 },
	options,
}: FormPhoneProps) {
	const { control, setValue } = useFormContext();

	const { fields, append, remove } = useFieldArray({
		control,
		name: name,
	});

	if (fields.length === 0) {
		setValue(name, [{ value: '', countryCode: 'GH' }], {
			shouldTouch: false,
			shouldValidate: false,
			shouldDirty: false,
		});
	}

	return (
		<>
			<FormItem>
				<div>
					<ul className='space-y-[8px]'>
						{fields.map((field, i) => (
							<li key={field.id}>
								<Controller
									control={control}
									name={`${name}.${i}`}
									defaultValue={{ value: '', areaCode: 'GH' }}
									rules={rules}
									render={({ field, fieldState }) => (
										<div className='space-y-2.5'>
											{i === 0 && (
												<FormLabel className={cn(fieldState.error && 'text-error-500')}>
													{label}
												</FormLabel>
											)}
											<FormControl>
												<div
													className={cn(
														'focus:border-primary-500 flex has-[:focus]:border-primary-500 rounded-lg border border-neutral-200 text-neutral-700 bg-white paragraph2Regular grow relative items-center overflow-hidden',
														readonly &&
															'opacity-70 focus:border-neutral-200 [:focus]:border-primary-500'
													)}>
													<CustomCountrySelect
														disabled={readonly}
														options={options}
														onValueChange={(v: CountryCode) => {
															field.onChange({
																value: '',
																countryCode: v,
															});
														}}
														defaultValue={field.value.countryCode || defaultValue}
													/>
													{!readonly ? (
														<PhoneInput
															country={field.value.countryCode || defaultValue}
															international
															className='border-none'
															placeholder={placeholder}
															ref={field.ref}
															value={field.value.value}
															onChange={(v) =>
																field.onChange({
																	...field.value,
																	value: v,
																})
															}
															inputComponent={Input}
														/>
													) : (
														<Input
															readOnly
															className='border-none cursor-not-allowed'
															value={field.value.value}
														/>
													)}
													{i !== 0 && !readonly && (
														<Button
															type='button'
															size={'icon'}
															variant={'ghost'}
															className='absolute right-1 text-primary-500'
															onClick={() => remove(i)}>
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
							</li>
						))}
					</ul>
				</div>
				{componentProps.phoneMode === 'multi' && (
					<Button
						variant={'link'}
						type='button'
						disabled={fields.length === componentProps.maxPhoneCount}
						className='text-primary-500 hover:bg-none hover:no-underline px-0 py-2 h-fit '
						onClick={() => {
							append({ value: '', countryCode: 'GH' }, { shouldFocus: false });
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
	disabled,
	onValueChange,
	defaultValue,
	options = { keys: [], priorityKeys: [],keySelector: (key) => key as string },
}: CustomCountrySelectProps) {
	const countries = useMemo(
		() => [...options.keys || [], ...options.priorityKeys || []],
		[]
	);

	const flagURL = FormHelpers.getFlagURL(
		defaultValue as string,
		countries as Country[]
	);
	return (
		<Select
			onValueChange={onValueChange}
			defaultValue={defaultValue}>
			<SelectTrigger
				className='w-fit space-x-2 border-none rounded-none'
				disabled={disabled}>
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
					{options?.priorityKeys?.map((c) => (
						<SelectItem
							value={(c as Country).cty_code}
							key={(c as Country).cty_code}>
							{(c as Country).cty_name} ({(c as Country).call_code})
						</SelectItem>
					))}
				</SelectGroup>
				<hr className='my-2 border-neutral-200' />
				<SelectGroup>
					{options?.keys?.map((c) => (
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

import type { FactoryComponentProps } from '..';
import { FormItem, FormControl, FormLabel, FormMessage } from '../../ui/form';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { useFormState } from 'react-hook-form';
import { CustomToggle } from '../../CompoundUI/CustomToggle';
import { cn } from '@/lib/utils';
import { useState,useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { Input } from '../../ui/input';
import PhoneInput from 'react-phone-number-input/input';
import { X, CirclePlus } from 'lucide-react';
import { Button } from '../../ui/button';
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
import type { IndividualFormSchema } from '@/types/forms/individual';
import Image from 'next/image';

interface FormPhoneProps extends FactoryComponentProps {}

export default function FormPhone({
	label,
	name,
	placeholder,
	rules,
	defaultValue = 'GH',
    componentProps = {},
}: FormPhoneProps )
{
    const { control, resetField, setValue, getValues } = useFormContext();

    const metaDataPath = `_formMetadata.` as const + name ;
    
    const countryListMetadata = getValues( metaDataPath );

	const [country, setCountry] = useState<CountryCode[]>(countryListMetadata || []);
    

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
		setCountry((prevCountryList) => [...country.filter((c, i) => i !== index)]);
    };

    useEffect( () =>
    {
        if ( fields.length === 0 )
        {
            setValue( name, [{ value: '' }] );
        }
        setValue( metaDataPath, country );
    },[country,fields])

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
											className={
												'flex has-[:focus]:border-primary-500 rounded-lg border border-neutral-200 text-neutral-700 bg-white paragraph2Regular grow relative items-center overflow-hidden'
											}>
											<CustomCountrySelect
												onValueChange={(v: CountryCode) => {
													resetField(field.name, { defaultValue: '' });
													handleCountryChange(v, i);
												}}
												defaultValue={country[i] || defaultValue}
											/>
											<PhoneInput
                                                country={ country[ i ] || defaultValue }
                                                international
												className='border-none'
												placeholder={placeholder}
                                                { ...field }
                                                inputComponent={ Input }
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
				{componentProps.phoneMode === 'multi' && <Button
					variant={'link'}
					type='button'
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
				</Button>}
			</FormItem>
		</>
	);
}

interface CustomCountrySelectProps extends SelectProps {}

const PRIORITY_COUNTRIES = ['GH', 'NG', 'KE'];

function CustomCountrySelect({
	onValueChange,
	defaultValue,
}: CustomCountrySelectProps) {
	const priorityCountries = COUNTRIES.data.filter((c) =>
		PRIORITY_COUNTRIES.includes(c.cty_code)
	);
	const otherCountries = COUNTRIES.data.filter(
		(c) => !PRIORITY_COUNTRIES.includes(c.cty_code)
	);

	const flagURL = FormHelpers.getFlagURL(
		defaultValue as string,
		COUNTRIES.data
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
					{priorityCountries.map((c) => (
						<SelectItem
							value={c.cty_code}
							key={c.cty_code}>
							{c.cty_name} ({ c.call_code })
						</SelectItem>
					))}
				</SelectGroup>
				<hr className='my-2 border-neutral-200' />
				<SelectGroup>
					{otherCountries.map((c) => (
						<SelectItem
							value={c.cty_code}
							key={c.cty_code}>
							{c.cty_name} ({ c.call_code })
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

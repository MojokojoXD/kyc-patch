import { useMemo, useEffect } from 'react';
import type { FactoryComponentProps } from '@/types/Components/formFactory';
import
  {
    FormItem,
    FormControl,
    FormLabel,
    FormMessage,
  } from '../../../ui/form';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Input } from '../../../ui/input';
import PhoneInput from 'react-phone-number-input/input';
import { X, CirclePlus } from 'lucide-react';
import { Button } from '../../../ui/button';
import
  {
    Select,
    SelectTrigger,
    SelectContent,
    SelectGroup,
    SelectItem,
  } from '../../../ui/select';
import type { SelectProps } from '@radix-ui/react-select';
import type { CountryCode } from '@/types/forms/common';
import type { PhoneInfo } from '@/types/forms/common';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import { useKYCFormContext } from '../../utils/formController';

interface FormPhoneProps extends FactoryComponentProps<'phone'> { }

export default function FormPhone( {
  label,
  name,
  placeholder,
  readonly = false,
  rules,
  defaultValue = 'GH',
  componentProps = { phoneMode: 'multi', maxPhoneCount: 2 },
  options,
}: FormPhoneProps )
{
  const { control } = useFormContext();

  const { fields, append, remove, replace } = useFieldArray( {
    control,
    name: name,
  } );

  const ruleSet =
    typeof rules === 'undefined'
      ? {
        validate: {
          isRequired: ( v: PhoneInfo[ number ] ) =>
            v.value !== '' || 'Please enter phone number',
          isValidPhone: ( v: PhoneInfo[ number ] ) =>
            isPossiblePhoneNumber( v.value ?? '' ) || 'Please enter valid phone number',
        },
      }
      : {};

  useEffect( () =>
  {
    if ( fields.length === 0 )
    {
      replace( [ { value: '', CountryCode: 'GH' } ] );
    }
  }, [ fields.length, replace ] );

  return (
    <>
      <FormItem>
        <div>
          <ul className='space-y-2'>
            { fields.map( ( field, i ) => (
              <li key={ field.id }>
                <Controller
                  control={ control }
                  name={ `${ name }.${ i }` }
                  rules={ ruleSet }
                  render={ ( { field, fieldState } ) => (
                    <div className='space-y-2.5'>
                      { i === 0 && (
                        <FormLabel
                          className={ cn(
                            componentProps?.classNames?.labelStyles,
                            fieldState.error && 'text-error-500'
                          ) }>
                          { label }
                        </FormLabel>
                      ) }
                      <FormControl>
                        <div
                          className={ cn(
                            'focus:border-primary-500 flex has-[:focus]:border-primary-500 rounded-lg border border-neutral-200 text-neutral-700 bg-white paragraph2Regular grow relative items-center overflow-hidden hover:border-primary-300',
                            readonly &&
                            'focus:border-neutral-200 [:focus]:border-primary-100 disabled:hover:border-neutral-100 disabled:border-neutral-100 disabled:bg-neutral-50/80'
                          ) }>
                          <CustomCountrySelect
                            disabled={ readonly }
                            options={ options }
                            onValueChange={ ( v: CountryCode ) =>
                            {
                              field.onChange( {
                                value: '',
                                countryCode: v,
                              } );
                            } }
                            defaultValue={ field.value.countryCode || defaultValue }
                          />
                          { !readonly ? (
                            <PhoneInput
                              country={ field.value.countryCode || defaultValue }
                              international
                              className='border-none'
                              placeholder={ placeholder }
                              ref={ field.ref }
                              value={ field.value.value ?? '' }
                              onChange={ ( v ) =>
                                field.onChange( {
                                  ...field.value,
                                  value: v,
                                } )
                              }
                              inputComponent={ Input }
                            />
                          ) : (
                            <Input
                              readOnly
                              disabled={ readonly }
                              className='border-none cursor-not-allowed'
                              value={ field.value.value }
                            />
                          ) }
                          { i !== 0 && !readonly && (
                            <Button
                              type='button'
                              size={ 'icon' }
                              variant={ 'ghost' }
                              className='absolute right-1 text-error-500'
                              onClick={ () => remove( i ) }>
                              <X className='h-5 aspect-square' />
                            </Button>
                          ) }
                        </div>
                      </FormControl>
                      <FormMessage className='relative mt-2'>{ fieldState.error?.message }</FormMessage>
                    </div>
                  ) }
                />
              </li>
            ) ) }
          </ul>
        </div>
        { componentProps.phoneMode === 'multi' && (
          <Button
            variant={ 'link' }
            type='button'
            disabled={ fields.length === componentProps.maxPhoneCount || readonly }
            className='text-primary-500 hover:bg-none hover:no-underline px-0 py-2 h-fit '
            onClick={ () =>
            {
              append( { value: '', countryCode: 'GH' }, { shouldFocus: false } );
            } }>
            <CirclePlus className='h-[20px] w-[20px] mr-1' />
            Add another number
          </Button>
        ) }
      </FormItem>
    </>
  );
}

type Options = Pick<FactoryComponentProps<'phone'>, 'options'>;

type CustomCountrySelectProps = Options & SelectProps & object;

function CustomCountrySelect( {
  disabled,
  onValueChange,
  defaultValue = '',
}: CustomCountrySelectProps )
{
  const {
    formVars: { countryList },
  } = useKYCFormContext();
  const countries = useMemo(
    () => [ ...countryList[ 0 ], ...countryList[ 1 ] ],
    [ countryList ]
  );

  const flagURL = countries.find( c => c.cty_code === defaultValue )?.cty_flag_name;

  return (
    <Select
      onValueChange={ onValueChange }
      defaultValue={ defaultValue }>
      <SelectTrigger
        className='w-fit space-x-2 border-none rounded-none'
        disabled={ disabled }>
        <div className='h-[24px] w-[24px] relative'>
          { flagURL && (
            <Image
              src={ flagURL }
              fill
              alt={ `${ defaultValue } flag` }
            />
          ) }
        </div>
      </SelectTrigger>
      <SelectContent className=''>
        <SelectGroup>
          { countryList[ 0 ].map( ( c ) =>
          {
            if ( typeof c === 'string' ) return <></>;
            if ( !( 'cty_name' in c ) ) return <></>;

            return (
              <SelectItem
                value={ c.cty_code }
                key={ c.cty_code }>
                { c.cty_name.toLowerCase() } ({ c.call_code })
              </SelectItem>
            );
          } ) }
        </SelectGroup>
        <hr className='my-2 border-neutral-200' />
        <SelectGroup>
          { countryList[ 1 ].map( ( c ) =>
          {
            if ( typeof c === 'string' ) return <></>;
            if ( !( 'cty_name' in c ) ) return <></>;
            return (
              <SelectItem
                value={ c.cty_code }
                key={ c.cty_code }>
                { c.cty_name.toLowerCase() } ({ c.call_code })
              </SelectItem>
            );
          } ) }
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

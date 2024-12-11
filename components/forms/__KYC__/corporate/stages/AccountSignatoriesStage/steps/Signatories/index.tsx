import { useEffect, useMemo } from 'react';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import
  {
    signatoriesModel,
    signatoriesDefaultValues,
    MAX_SIGNATORIES,
  } from './model/signatoriesModel';
import
  {
    Accordion,
    AccordionItem,
    AccordionContent,
    AccordionTrigger,
  } from '@/components/ui/accordion';
import
  {
    FormHeader,
    FormTitle,
    FormContent,
  } from '@/components/forms/FormLayout';
import { CirclePlus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FormFactory from '@/components/forms/FormFactory';
import { useFieldArray } from 'react-hook-form';
import { useKYCFormContext } from '@/components/forms/utils/formController';
import { FormStep } from '@/types/Components/onboarding';
import type { CorporateFormSchema } from '@/types/forms/corporateSchema';
import { FormFieldAggregator } from '@/components/forms/utils/FormFieldAggregator';
import { PrefillBannerDesc } from '../../PrefillBannerDesc';
import { useFormState } from 'react-hook-form';
import { FormHelpers } from '@/utils/clientActions/formHelpers';

export const Signatories: FormStep = () =>
{
  const { form, onFormNav } = useKYCFormContext<CorporateFormSchema>();
  const { control, resetField, getValues } = form;
  const { touchedFields } = useFormState<CorporateFormSchema>( {
    name: 'accountSignatories.signatories',
    exact: true,
  } );

  const { fields, append, remove, replace } = useFieldArray( {
    name: 'accountSignatories.signatories',
    control,
  } );

  const signatories = getValues( 'accountSignatories.signatories' ) ?? [];

  onFormNav( function ()
  {
    if ( !( 'accountSignatories' in touchedFields ) ) return;

    const currentTouchedSignatories = touchedFields.accountSignatories!.signatories;

    if ( !currentTouchedSignatories ) return;

    const signatoriesCopy = [ ...signatories ];

    let index = 0;

    for ( const touched of currentTouchedSignatories )
    {
      if ( !touched )
      {
        signatoriesCopy.splice( index, 0 );
        index++;
        continue;
      }

      if ( signatoriesCopy[ index ]._fillSrc === 'AUTO' )
      {
        index++;
        continue;
      }

      signatoriesCopy[ index ] = {
        ...signatories[ index ],
        _fillSrc: 'MANUAL',
      };

      index++;
    }

    resetField( 'accountSignatories.signatories' );
    replace( signatoriesCopy );
  } );

  useEffect( () =>
  {
    let isInitialized = false;
    const signatoriesCount = signatories.length;

    if ( !isInitialized && signatoriesCount === 0 )
    {
      console.log( 'here' );
      signatories.length === 0 ? append( signatoriesDefaultValues ) : undefined;
      resetField( 'accountSignatories.signatories', { keepDirty: false } );
    }
    return () =>
    {
      isInitialized = true;
    };
  } );

  return (
    <>
      <FormHeader>
        <FormTitle>Account Signatories</FormTitle>
      </FormHeader>
      <FormContent>
        <ul className='space-y-[8px]'>
          { fields.map( ( f, i ) =>
          {
            // const firstName = watch(`accountSignatories.signatories.${i}.firstName`);
            // const lastName = watch(`accountSignatories.signatories.${i}.lastName`);

            return (
              <li key={ f.id }>
                <Accordion
                  defaultValue={ 'item-0' }
                  collapsible
                  type={ 'single' }>
                  <AccordionItem value={ `item-${ i }` }>
                    <AccordionTrigger>
                      <div className='flex items-center space-x-2'>
                        { i > 0 && (
                          <span
                            onClick={ () => remove( i ) }
                            className='h-fit py-0 w-fit px-0 text-primary-500'>
                            <Trash2 className='h-4 w-4' />
                          </span>
                        ) }
                        <p className='inline-block'>Signatory #{ i + 1 }</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent
                      className='data-[state=closed]:hidden pb-16'
                      forceMount>
                      <SignatoryForm
                        applicantId={ i }
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </li>
            );
          } ) }
          <li>
            <Button
              type='button'
              size={ 'sm' }
              variant={ 'ghost' }
              disabled={ fields.length >= MAX_SIGNATORIES }
              onClick={ () =>
                append( {
                  ...signatoriesDefaultValues,
                  _id: FormHelpers.generateUniqueIdentifier(),
                } )
              }
              className='text-base text-primary-500'>
              <span className='mr-1'>
                <CirclePlus className='h-4 w-4' />
              </span>
              Add another signatory
            </Button>
          </li>
        </ul>
      </FormContent>
    </>
  );
};

interface SignatoryFormProps extends SingleFormFieldsGeneratorProps { }

const GHANA = 'GHANA';

function SignatoryForm( { applicantId }: SignatoryFormProps )
{
  const {
    form,
  } = useKYCFormContext<CorporateFormSchema>();
  const { setValue, watch, getValues } = form;

  const [ signatoryResidence, signatoryCitizenship ] = watch( [
    `accountSignatories.signatories.${ applicantId }.countryOfResidence`,
    `accountSignatories.signatories.${ applicantId }.citizenship`,
  ] );

  const fillSrc = getValues(
    `accountSignatories.signatories.${ applicantId }._fillSrc`
  );

  const fields = useMemo( () =>
  {
    const rawFields = signatoriesModel( {
      index: applicantId,
    } );

    const aggregator = new FormFieldAggregator( rawFields );

    aggregator.modifyFields( 'read-only', {
      readonly: fillSrc === 'AUTO',
    } );

    aggregator.modifyFields( 'NG', {
      required: signatoryResidence === 'NIGERIA',
    } );

    return aggregator.generate();
  }, [ applicantId, fillSrc, signatoryResidence ] );

  useEffect( () =>
  {
    const residenceStatus =
      signatoryResidence === GHANA && signatoryCitizenship === GHANA
        ? 'Resident Ghanaian'
        : signatoryResidence === GHANA && signatoryCitizenship !== GHANA
          ? 'Resident Foreigner'
          : signatoryResidence !== GHANA && signatoryCitizenship === GHANA
            ? 'Non-Resident Ghanaian'
            : 'Non-Resident Foreigner';

    setValue(
      `accountSignatories.signatories.${ applicantId }.residenceStatus`,
      residenceStatus
    );
  }, [ signatoryCitizenship, signatoryResidence, applicantId, setValue ] );

  return (
    <>
      { fillSrc === 'AUTO' && <PrefillBannerDesc /> }
      { fields.map( ( f ) => (
        <FormFactory
          key={ f.name }
          { ...f }
        />
      ) ) }
    </>
  );
}

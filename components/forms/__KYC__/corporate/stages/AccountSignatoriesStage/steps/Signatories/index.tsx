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
import { FormHeader, FormTitle, FormContent } from '@/components/forms/FormLayout';
import { CirclePlus, Minus } from 'lucide-react';
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
import { MAX_DIRECTORS } from '../Directors/model/directorsModel';
import { MAX_BENEFICIAL_OWNERS } from '../BeneficialOwner/model/beneficialOwnerModel';
import { directorOrBeneficialOwnerBuilder } from '../../utils/signatoriesFn';

export const Signatories: FormStep = () =>
{
  const { form, onFormNav } = useKYCFormContext<CorporateFormSchema>();
  const { control, resetField, getValues, setValue } = form;
  const { touchedFields } = useFormState<CorporateFormSchema>( {
    name: 'accountSignatories.signatories',
    exact: true,
  } );

  const { fields, append, remove, replace } = useFieldArray( {
    name: 'accountSignatories.signatories',
    control,
  } );

  const signatories = getValues( 'accountSignatories.signatories' ) ?? [];
  const [ directors, beneficiaries ] = getValues( [
    'accountSignatories.directors',
    'accountSignatories.beneficialOwners',
  ] );

  const totalDirectorSignatories =
    signatories.reduce(
      ( a, c ) => ( c.role.includes( 'Director/Executive/Trustee/Admin' ) ? a + 1 : a ),
      0
    ) + ( directors ?? [] ).filter( d => d._fillSrc !== 'AUTO' ).length;
  const totalBeneficiarySignatories =
    signatories.reduce( ( a, c ) => ( c.role.includes( 'Beneficial Owner' ) ? a + 1 : a ), 0 ) +
    ( beneficiaries ?? [] ).filter( b => b._fillSrc !== 'AUTO' ).length;

  onFormNav(  ()=>
  {
    const directorsInit = directorOrBeneficialOwnerBuilder( signatories, directors, 'directors' );
    const beneficiariesInit = directorOrBeneficialOwnerBuilder(
      signatories,
      beneficiaries,
      'beneficiaries'
    );
    setValue( 'accountSignatories.directors', directorsInit );
    setValue( 'accountSignatories.beneficialOwners', beneficiariesInit );

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
      replace( signatoriesDefaultValues );
      resetField( 'accountSignatories.signatories', { keepDirty: false } );
    }
    return () =>
    {
      isInitialized = true;
    };
  }, [ append, replace, resetField, signatories.length ] );

 
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
                  type={ 'single' }
                >
                  <AccordionItem value={ `item-${ i }` }>
                    <AccordionTrigger>
                      <div className='flex items-center justify-between w-full space-x-2 pr-5'>
                        <p className='inline-block'>Signatory #{ i + 1 }</p>
                        { i > 0 && (
                          <span
                            onClick={ () =>
                            {
                              const adjustedDirectors =
                                directors?.filter( d => f._id !== d._id ) ?? [];
                              setValue( `accountSignatories.directors`, adjustedDirectors );
                              remove( i );
                            } }
                            className='h-fit py-0 w-fit px-0 text-error-500 paragraph1Regular flex items-center'
                          >
                            <Minus className='h-4 w-4 inline mr-1' /> Delete
                          </span>
                        ) }
                      </div>
                    </AccordionTrigger>
                    <AccordionContent
                      className='data-[state=closed]:hidden pb-16'
                      forceMount
                    >
                      <SignatoryForm
                        applicantId={ i }
                        totalSelectedDirectors={ totalDirectorSignatories }
                        totalSelectedBeneficiaries={ totalBeneficiarySignatories }
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
              className='text-base text-primary-500'
            >
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

interface SignatoryFormProps extends SingleFormFieldsGeneratorProps
{
  totalSelectedDirectors: number;

  totalSelectedBeneficiaries: number;
}

const GHANA = 'GHANA';

function SignatoryForm( {
  applicantId,
  totalSelectedDirectors,
  totalSelectedBeneficiaries,
}: SignatoryFormProps )
{
  const { form } = useKYCFormContext<CorporateFormSchema>();

  const { setValue, watch, getValues } = form;

  const _fillSrc = getValues( `accountSignatories.signatories.${ applicantId }._fillSrc` );

  const [ signatoryResidence, signatoryCitizenship, residenceStatus, role ] = watch( [
    `accountSignatories.signatories.${ applicantId }.countryOfResidence`,
    `accountSignatories.signatories.${ applicantId }.citizenship`,
    `accountSignatories.signatories.${ applicantId }.residence.status`,
    `accountSignatories.signatories.${ applicantId }.role`,
  ] );

  const fields = useMemo( () =>
  {
    const rawFields = signatoriesModel( {
      index: applicantId,
    } );

    const aggregator = new FormFieldAggregator( rawFields );

    aggregator.modifyFields( 'read-only', {
      readonly: _fillSrc === 'AUTO',
    } );

    aggregator.modifyFields( 'NG', {
      required: signatoryResidence === 'NIGERIA',
    } );

    aggregator.modifyFields( 'GH', {
      required: residenceStatus && residenceStatus === 'Resident Foreigner',
      remove: residenceStatus && residenceStatus === 'Resident Ghanaian',
    } );

    aggregator.modifyFields( `accountSignatories.signatories.${ applicantId }.role`, function ( f )
    {
      let evaluatedRoles = [ ...( f.options?.keys ?? [] ) ];

      if (
        totalSelectedDirectors >= MAX_DIRECTORS &&
        !role.includes( 'Director/Executive/Trustee/Admin' )
      )
      {
        evaluatedRoles = evaluatedRoles.filter( r => !( r as string ).startsWith( 'Director' ) );
      }

      if (
        totalSelectedBeneficiaries >= MAX_BENEFICIAL_OWNERS &&
        !role.includes( 'Beneficial Owner' )
      )
      {
        evaluatedRoles = evaluatedRoles.filter( r => !( r as string ).startsWith( 'Beneficial' ) );
      }

      return evaluatedRoles.length === 0
        ? null
        : {
          ...f,
          options: {
            keys: [ ...evaluatedRoles ],
          },
        };
    } );

    return aggregator.generate();
  }, [
    applicantId,
    _fillSrc,
    signatoryResidence,
    residenceStatus,
    totalSelectedDirectors,
    role,
    totalSelectedBeneficiaries,
  ] );

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

    setValue( `accountSignatories.signatories.${ applicantId }.residence.status`, residenceStatus );
  }, [ signatoryCitizenship, signatoryResidence, applicantId, setValue ] );

  return (
    <>
      { _fillSrc === 'AUTO' && <PrefillBannerDesc /> }
      { fields.map( f => (
        <FormFactory
          key={ f.name }
          { ...f }
        />
      ) ) }
    </>
  );
}

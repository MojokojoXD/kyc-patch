import { useEffect, useMemo } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { FormHeader, FormContent, FormTitle } from '@/components/forms/FormLayout';
import FormFactory from '@/components/forms/FormFactory';
import { CirclePlus, Minus } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';
import { useKYCFormContext } from '@/components/forms/utils/formController';
import { directorsDefaultValues, directorsModel } from './model/directorsModel';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import type { FormStep } from '@/types/Components/onboarding';
import { FormFieldAggregator } from '@/components/forms/utils/FormFieldAggregator';
import type { CorporateFormSchema } from '@/types/forms/corporateSchema';
import { PrefillBannerDesc } from '../../PrefillBannerDesc';
import { MAX_DIRECTORS } from './model/directorsModel';
import { FormHelpers } from '@/utils/clientActions/formHelpers';

export const Directors: FormStep = () => {
  const { form, onFormNav } = useKYCFormContext<CorporateFormSchema>();
  const { control, getValues } = form;
  const { fields, append, remove, replace, update } = useFieldArray({
    name: 'accountSignatories.directors',
    control,
  } );
  
  
  onFormNav( function ()
  {
    
    const currentDirectors = getValues( `accountSignatories.directors` );

    const s_defaultDirector = JSON.stringify( directorsDefaultValues );

    let index = -1;

    for ( const director of currentDirectors )
    {
      index++;

      if ( director._fillSrc === 'AUTO' ) continue;

      if ( '_fillSrc' in director ) delete director._fillSrc;

      delete director._id

      const s_director = JSON.stringify( director )

      if ( s_director !== s_defaultDirector )
      {
        update( index, { ...director, _fillSrc: 'MANUAL' } );
      }
      
    } 

  })

  
  useEffect(() => {
    let isInitialized = false;
    const currentDirectors = getValues( `accountSignatories.directors` )
    
    if ( currentDirectors.length === 0 && !isInitialized )
      {
      
      replace( { ...directorsDefaultValues,_id: FormHelpers.generateUniqueIdentifier()});
    
    }

    return () => {
      isInitialized = true;
    };
  }, [replace, getValues]);

  return (
    <>
      <FormHeader>
        <FormTitle>Directors/Executive/Trustee/Admin</FormTitle>
      </FormHeader>
      <FormContent>
        <ul className='space-y-[8px]'>
          {fields.map((f, i) => {
            return (
              <li key={f.id}>
                <Accordion
                  defaultValue={`item-0`}
                  collapsible
                  type={'single'}
                >
                  <AccordionItem value={`item-${i}`}>
                    <AccordionTrigger>
                      <div className='flex items-center justify-between w-full space-x-2 pr-5'>
                        <p className='inline-block'>
                          Individual #{i + 1}: {f.firstName} {f.lastName}
                        </p>
                        {i > 0 && f._fillSrc !== 'AUTO' && (
                          <span
                            onClick={() => remove(i)}
                            className='h-fit py-0 w-fit px-0 text-error-500 paragraph1Regular flex items-center'
                          >
                            <Minus className='h-4 w-4 inline mr-1' /> Delete
                          </span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent
                      className='data-[state=closed]:hidden pb-16'
                      forceMount
                    >
                      <DirectorForm applicantId={i} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </li>
            );
          })}
          <li>
            <Button
              type='button'
              size={'sm'}
              variant={'ghost'}
              disabled={fields.length >= MAX_DIRECTORS}
              onClick={() =>
                append({ ...directorsDefaultValues, _id: FormHelpers.generateUniqueIdentifier() })
              }
              className='text-base text-primary-500'
            >
              <span className='mr-1'>
                <CirclePlus className='h-4 w-4' />
              </span>
              Add another individual
            </Button>
          </li>
        </ul>
      </FormContent>
    </>
  );
};

interface DirectorFormProps extends SingleFormFieldsGeneratorProps {}

function DirectorForm({ applicantId }: DirectorFormProps) {
  const { form } = useKYCFormContext<CorporateFormSchema>();
  const { getValues, watch } = form;


  const isApplicantPrefilled = getValues(`accountSignatories.directors.${applicantId}._fillSrc`);
  const pepStatus =
    (watch(`accountSignatories.directors.${applicantId}.pepInfo.isPep`) as string) || '';

  const fields = useMemo(() => {
    const rawFields = directorsModel({ index: applicantId });
    const aggregator = new FormFieldAggregator(rawFields);

    aggregator.modifyFields('read-only', {
      readonly: isApplicantPrefilled === 'AUTO',
    });

    aggregator.modifyFields('remove', {
      remove: pepStatus === 'No' || !pepStatus,
    });

    return aggregator.generate();
  }, [applicantId, isApplicantPrefilled, pepStatus]);

  
  return (
    <>
      {isApplicantPrefilled === 'AUTO' && <PrefillBannerDesc />}
      {fields.map(f => (
        <FormFactory
          key={f.name}
          {...f}
        />
      ))}
    </>
  );
}

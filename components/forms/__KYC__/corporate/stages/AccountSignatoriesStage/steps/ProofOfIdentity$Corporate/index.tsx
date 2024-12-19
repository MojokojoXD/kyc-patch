import { useMemo } from 'react';
import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import type { CorporateFormSchema } from '@/types/forms/corporateSchema';
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
import FormFactory from '@/components/forms/FormFactory';
import { FormFieldAggregator } from '@/components/forms/utils/FormFieldAggregator';
import { useKYCFormContext } from '@/components/forms/utils/formController';
import { proofOfIdentityModel$Corporate } from './model/proofOfIdentityModel$Corporate';
import { directorOrBeneficialOwnerBuilder } from '../../utils/signatoriesFn';

export const ProofOfIdentity$Corporate: FormStep = () =>
{
  const { form, onFormNav } = useKYCFormContext<CorporateFormSchema>();
  const { getValues,setValue } = form;

  const signatories =
    getValues( 'accountSignatories.signatories' ) ?? [];
  
  const currentDirectors = getValues( `accountSignatories.directors` ) ?? [];
  const currentBeneficiaries = getValues( 'accountSignatories.beneficialOwners' ) ?? []
  
  onFormNav( function ()
  {
    const directorsProofOfIdentityUpdate = directorOrBeneficialOwnerBuilder( signatories, currentDirectors, 'directors' );
    const beneficiariesProofOfIdentityUpdate = directorOrBeneficialOwnerBuilder( signatories, currentBeneficiaries, 'beneficiaries' )
    setValue( 'accountSignatories.directors', directorsProofOfIdentityUpdate );
    setValue( 'accountSignatories.beneficialOwners', beneficiariesProofOfIdentityUpdate );
  })

  return (
    <>
      <FormHeader>
        <FormTitle>Proof of Identity</FormTitle>
      </FormHeader>
      <FormContent>
        <ul className='space-y-[8px]'>
          { signatories.map( ( s, i ) => (
            <li key={ s._id }>
              <Accordion
                defaultValue={ 'item-0' }
                collapsible
                type={ 'single' }>
                <AccordionItem value={ `item-${ i }` }>
                  <AccordionTrigger>
                    Signatory #{ i + 1 }: { s.firstName } { s.lastName }
                  </AccordionTrigger>
                  <AccordionContent
                    className='data-[state=closed]:hidden pb-16 overflow-visible'
                    forceMount>
                    <SignatoryIdentityProofForm applicantId={ i } readonly={ s._fillSrc === 'AUTO' } />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </li>
          ) ) }
        </ul>
      </FormContent>
    </>
  );
};

interface SignatoryIdentityProofFormProps extends SingleFormFieldsGeneratorProps
{
  readonly: boolean;
}

function SignatoryIdentityProofForm( { applicantId, readonly }: SignatoryIdentityProofFormProps )
{
  const fields = useMemo( () =>
  {
    const rawFields = proofOfIdentityModel$Corporate( {
      index: applicantId,
    } );

    const aggregator = new FormFieldAggregator( rawFields );
    aggregator.modifyFields( 'read-only', {
      readonly
    } );

    return aggregator.generate();

  }, [ applicantId, readonly ] );


  return (
    <>
      { fields.map( ( f ) => (
        <FormFactory
          key={ f.name }
          { ...f }
        />
      ) ) }
    </>
  );
}

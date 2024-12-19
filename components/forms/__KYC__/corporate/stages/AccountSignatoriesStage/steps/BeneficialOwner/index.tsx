import { useMemo,useEffect } from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
	FormHeader,
	FormContent,
	FormTitle,
} from '@/components/forms/FormLayout';
import FormFactory from '@/components/forms/FormFactory';
import { CirclePlus, Minus } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';
import { useKYCFormContext } from '@/components/forms/utils/formController';
import {
	beneficialOwnersDefaultValues,
	beneficialOwnersModel,
} from './model/beneficialOwnerModel';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import type { FormStep } from '@/types/Components/onboarding';
import { FormFieldAggregator } from '@/components/forms/utils/FormFieldAggregator';
import type { CorporateFormSchema } from '@/types/forms/corporateSchema';
import { PrefillBannerDesc } from '../../PrefillBannerDesc';
import { MAX_BENEFICIAL_OWNERS } from './model/beneficialOwnerModel';


export const BeneficialOwners: FormStep = () => {
	const { form, onFormNav } = useKYCFormContext<CorporateFormSchema>();
	const { control, getValues } = form;
	const { fields, append, remove, replace, update } = useFieldArray({
		name: 'accountSignatories.beneficialOwners',
		control,
  } );
  

  onFormNav( function ()
    {
      
      const currentBeneficiaries = getValues( `accountSignatories.beneficialOwners` );
      
      const s_defaultBeneficiary = JSON.stringify( beneficialOwnersDefaultValues );
  
      let index = -1;
  
      for ( const beneficiary of currentBeneficiaries )
      {
        index++;
  
        if ( beneficiary._fillSrc === 'AUTO' ) continue;
  
        if ( '_fillSrc' in beneficiary ) delete beneficiary._fillSrc;
  
        delete beneficiary._id
  
        const s_beneficiary = JSON.stringify( beneficiary )
  
        if ( s_beneficiary !== s_defaultBeneficiary )
        {
          update( index, { ...beneficiary, _fillSrc: 'MANUAL' } );
        }
        
      } 
  
    })

  useEffect( () =>
  {
    let initialized = false;

    if ( fields.length === 0 && !initialized )
    {
      replace( beneficialOwnersDefaultValues );
    }

    return () => { initialized = true }
  },[fields.length, replace])


	return (
		<>
			<FormHeader>
				<FormTitle>Beneficial Owners</FormTitle>
			</FormHeader>
			<FormContent>
				<ul className='space-y-[8px]'>
					{fields.map((f, i) => {

						return (
							<li key={f.id}>
								<Accordion
									defaultValue={`item-0`}
									collapsible
									type={'single'}>
									<AccordionItem value={`item-${i}`}>
										<AccordionTrigger>
                      <div className='flex items-center justify-between w-full space-x-2 pr-5'>
                        <p className='inline-block'>Individual #{ i + 1 }: { f.firstName } { f.lastName }</p>
                        { i > 0 && f._fillSrc !== 'AUTO' && (
                          <span
                            onClick={ () => remove( i ) }
                            className='h-fit py-0 w-fit px-0 text-error-500 paragraph1Regular flex items-center'
                          >
                            <Minus className='h-4 w-4 inline mr-1' /> Delete
                          </span>
                        ) }
                      </div>
										</AccordionTrigger>
										<AccordionContent
											className='data-[state=closed]:hidden pb-16 overflow-visible'
											forceMount>
											<BeneficialOwnerForm
												applicantId={i}
											/>
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
							disabled={fields.length >= MAX_BENEFICIAL_OWNERS}
							onClick={() => append(beneficialOwnersDefaultValues)}
							className='text-base text-primary-500'>
							<span className='mr-1'>
								<CirclePlus className='h-5 w-5' />
							</span>
							Add another Individual
						</Button>
					</li>
				</ul>
			</FormContent>
		</>
	);
};

interface BeneficialOwnerFormProps extends SingleFormFieldsGeneratorProps {}

function BeneficialOwnerForm({
	applicantId,
}: BeneficialOwnerFormProps) {
	const { form } = useKYCFormContext<CorporateFormSchema>();
	const { getValues, watch } = form;

	const fillSrc =
		getValues(
			`accountSignatories.beneficialOwners.${applicantId}._fillSrc`
		);
	const pepStatus =
		(watch(
			`accountSignatories.beneficialOwners.${applicantId}.pepInfo.isPep`
		) as string) || '';

	const fields = useMemo(() => {
		const rawFields = beneficialOwnersModel({ index: applicantId });
		const aggregator = new FormFieldAggregator(rawFields);

		aggregator.modifyFields('read-only', {
			readonly: fillSrc === 'AUTO',
		});

		aggregator.modifyFields('remove', {
			remove: pepStatus === 'No' || !pepStatus,
		});

		return aggregator.generate();
	}, [applicantId, fillSrc, pepStatus]);

	return (
		<>
			{fillSrc === 'AUTO' && <PrefillBannerDesc />}
			{fields.map((f) => (
				<FormFactory
					key={f.name}
					{...f}
				/>
			))}
		</>
	);
}

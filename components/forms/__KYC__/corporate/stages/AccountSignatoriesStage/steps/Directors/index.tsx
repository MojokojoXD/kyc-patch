import { useEffect, useMemo } from 'react';
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
import { CirclePlus, Trash2 } from 'lucide-react';
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
	const { form } = useKYCFormContext<CorporateFormSchema>();
	const { control, watch, getValues } = form;
	const { fields, append, remove, replace } = useFieldArray({
		name: 'accountSignatories.directors',
		control,
	});

  useEffect( () =>
  {
    let isInitialized = false;

    if ( fields.length === 0 && !isInitialized )
    {
      replace( { ...directorsDefaultValues, id: FormHelpers.generateUniqueIdentifier() } )
    }

    return () =>
    {
      isInitialized = true;
    }
  },[fields.length, replace])

  

	return (
		<>
			<FormHeader>
				<FormTitle>Directors/Executive/Trustee/Admin</FormTitle>
			</FormHeader>
			<FormContent>
				<ul className='space-y-[8px]'>
					{fields.map((f, i) => {
						const firstName = watch(
							`accountSignatories.directors.${i}.firstName`
						) as string;
						const lastName = watch(`accountSignatories.directors.${i}.lastName`) as string;
						const isPrefill = getValues(
							`accountSignatories.directors.${i}.isPrefill`
						) as boolean;
						return (
							<li key={f.id}>
								<Accordion
									defaultValue={`item-0`}
									collapsible
									type={'single'}>
									<AccordionItem value={`item-${i}`}>
										<AccordionTrigger>
											<div className='flex items-center space-x-2'>
												{i > 0 && !isPrefill && (
													<span
														onClick={() => remove(i)}
														className='h-fit py-0 w-fit px-0 text-primary-500'>
														<Trash2 className='h-5 w-5' />
													</span>
												)}
												<p className='inline-block'>
													Individual #{i + 1}: {firstName} {lastName}
												</p>
											</div>
										</AccordionTrigger>
										<AccordionContent
											className='data-[state=closed]:hidden pb-16'
											forceMount>
											<DirectorForm
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
							disabled={fields.length >= MAX_DIRECTORS}
							onClick={() => append(directorsDefaultValues)}
							className='text-base text-primary-500'>
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

function DirectorForm({ applicantId}: DirectorFormProps) {
	const { form } = useKYCFormContext<CorporateFormSchema>();
	const { watch } = form;

	const isApplicantPrefilled =
		(watch(`accountSignatories.directors.${applicantId}.isPrefill`) as boolean) ||
		false;
	const pepStatus =
		(watch(
			`accountSignatories.directors.${applicantId}.pepInfo.isPep`
		) as string) || '';

	const fields = useMemo(() => {
		const rawFields = directorsModel({ index: applicantId });
		const aggregator = new FormFieldAggregator(rawFields);

		aggregator.modifyFields('read-only', {
			readonly: isApplicantPrefilled,
		});

		aggregator.modifyFields('remove', {
			remove: pepStatus === 'No' || !pepStatus,
		});

		return aggregator.generate();
	}, [applicantId, isApplicantPrefilled, pepStatus]);

	return (
		<>
			{isApplicantPrefilled && <PrefillBannerDesc />}
			{fields.map((f) => (
				<FormFactory
					key={f.name}
					{...f}
				/>
			))}
		</>
	);
}

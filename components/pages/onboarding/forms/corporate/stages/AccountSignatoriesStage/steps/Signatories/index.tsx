import { useEffect,useMemo } from 'react';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import {
	signatoriesModel,
	signatoriesDefaultValues,
} from './model/signatoriesModel';
import {
	Accordion,
	AccordionItem,
	AccordionContent,
	AccordionTrigger,
} from '@/components/UIcomponents/ui/accordion';
import {
	FormHeader,
	FormTitle,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import { CirclePlus, Trash2 } from 'lucide-react';
import { Button } from '@/components/UIcomponents/ui/button';
import FormFactory from '@/components/UIcomponents/FormFactory';
import { useFieldArray } from 'react-hook-form';
import { useKYCFormContext } from '@/components/pages/onboarding/forms/utils/formController';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import { FormStep } from '@/types/Components/onboarding';

const MAX_SIGNATORIES = 4;

export const Signatories: FormStep = ({ countryList }) => {
	const { form } = useKYCFormContext();
	const { control, setValue } = form;

	const { fields, append, remove } = useFieldArray({
		name: 'accountSignatories.signatories',
		control,
	});

	useEffect(() => {
		if (fields.length === 0) {
			setValue(`accountSignatories.signatories`, [
				{ ...signatoriesDefaultValues, id: FormHelpers.generateUniqueIdentifier() },
			]);
		}
    }, [] );

    
	return (
		<>
			<FormHeader>
				<FormTitle>Account Signatories</FormTitle>
			</FormHeader>
			<FormContent>
				<ul className='space-y-[8px]'>
					{fields.map((f, i) => {
						// const firstName = watch(`accountSignatories.signatories.${i}.firstName`);
						// const lastName = watch(`accountSignatories.signatories.${i}.lastName`);

						return (
							<li key={f.id}>
								<Accordion
									defaultValue={'item-0'}
									collapsible
									type={'single'}>
									<AccordionItem value={`item-${i}`}>
										<AccordionTrigger>
											<div className='flex items-center space-x-2'>
												{i > 0 && (
													<span
														onClick={() => remove(i)}
														className='h-fit py-0 w-fit px-0 text-primary-500'>
														<Trash2 className='h-5 w-5' />
													</span>
												)}
												<p className='inline-block'>
													Signatory #{i + 1}
												</p>
											</div>
										</AccordionTrigger>
										<AccordionContent className='data-[state=closed]:hidden pb-16' forceMount>
											<SignatoryForm
												applicantId={i}
												countryList={countryList}
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
							disabled={fields.length >= MAX_SIGNATORIES}
							onClick={() =>
								append({
									...signatoriesDefaultValues,
									id: FormHelpers.generateUniqueIdentifier(),
								})
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

interface SignatoryFormProps extends SingleFormFieldsGeneratorProps {}

const GHANA = 'GHANA';

function SignatoryForm({ applicantId, countryList }: SignatoryFormProps) {
	const { form } = useKYCFormContext();
	const { setValue,getValues } = form;

	const residenceCountry = getValues(
		`accountSignatories.signatories.${applicantId}.countryOfResidence`
	) as string;
	const citizenshipCountry = getValues(
		`accountSignatories.signatories.${applicantId}.citizenship`
    ) as string;
    
    const residenceStatus =
        residenceCountry === GHANA && citizenshipCountry === GHANA
            ? 'Resident Ghanaian'
            : residenceCountry === GHANA && citizenshipCountry !== GHANA
            ? 'Resident Foreigner'
            : residenceCountry !== GHANA && citizenshipCountry === GHANA
            ? 'Non-Resident Ghanaian'
                    : 'Non-Resident Foreigner';
    
    const fields = useMemo( () =>
    {
    
        return signatoriesModel({
            index: applicantId,
            countryList,
        });
        
    },[ countryList,applicantId])


	useEffect(
        () =>
			setValue(
				`accountSignatories.signatories.${applicantId}.residenceStatus`,
				residenceStatus
			),
		[residenceStatus, applicantId, setValue]
	);

	return (
		<>
			{fields.map((f) => (
				<FormFactory
					key={f.name}
					{...f}
				/>
			))}
		</>
	);
}

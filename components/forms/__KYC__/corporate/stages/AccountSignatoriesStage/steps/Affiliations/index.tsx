import { useEffect } from 'react';
// import { useFormContext } from 'react-hook-form';
import { FormHeader, FormTitle, FormContent } from '@/components/forms/FormLayout';
import { Button } from '@/components/ui/button';
import { FormLabel } from '@/components/ui/form';
import FormFactory from '@/components/forms/FormFactory';
import { useKYCFormContext } from '@/components/forms/utils/formController';
import { useFieldArray } from 'react-hook-form';
import {
	affiliationsModel,
	affiliationsDefaultValues,
} from './model/affiliationsModel';
import { CirclePlus, X } from 'lucide-react';
import type { FormStep } from '@/types/Components/onboarding';
import type { CorporateFormSchema } from '@/types/forms/corporateSchema';

const MAX_AFFILIATIONS = 5;

export const Affiliations: FormStep = () => {
	const { form } = useKYCFormContext<CorporateFormSchema>();
	const { control, setValue } = form;

	const { fields, append, remove } = useFieldArray({
		name: 'accountSignatories.affiliations',
		control,
	});

	useEffect(() => {
		if (fields.length === 0) {
			setValue('accountSignatories.affiliations', [affiliationsDefaultValues]);
		}
	}, [fields, setValue]);

	return (
		<>
			<FormHeader>
				<FormTitle>Affiliations</FormTitle>
			</FormHeader>
			<FormContent>
				<FormLabel>
					Is this entity part of a group? Kindly state all entities within the group
					structure:
				</FormLabel>
				<ul>
					{fields.map((f, i) => {
						const formFields = affiliationsModel({ index: i });

						return (
							<li key={f.id}>
								<div className='relative flex items-center justify-center'>
									<div className='grow'>
										<FormFactory {...formFields[0]} />
									</div>
									<div className='absolute right-3 top-5'>
										{i > 0 && (
											<Button
												variant={'ghost'}
												onClick={() => remove(i)}
												type='button'
												size={'sm'}
												className='text-primary-500 p-0 aspect-square h-[24px] '>
												<X className='h-full w-full' />
											</Button>
										)}
									</div>
								</div>
							</li>
						);
					})}
					<li>
						<Button
							type='button'
							size={'sm'}
							variant={'ghost'}
							disabled={fields.length >= MAX_AFFILIATIONS}
							onClick={() => append(affiliationsDefaultValues)}
							className='text-base text-primary-500'>
							<span className='mr-1'>
								<CirclePlus className='h-4 w-4' />
							</span>
							Add another entity
						</Button>
					</li>
				</ul>
			</FormContent>
		</>
	);
};

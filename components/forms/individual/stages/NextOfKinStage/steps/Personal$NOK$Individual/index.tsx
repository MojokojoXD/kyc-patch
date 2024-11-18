import { useMemo, useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useKYCFormContext } from '@/components/forms/utils/formController';
import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { CirclePlus, Trash2 } from 'lucide-react';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
	FormAutopopulate,
} from '@/components/FormLayout';
import type { FormStep } from '@/types/Components/onboarding';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import type { NOK } from '@/types/forms/individualSchema';
import { cn } from '@/lib/utils';
import { personalModel$NOK$Individual } from './model/personalModel$NOK$Individual';
import FormFactory from '@/components/FormFactory';
import Loading from '@/components/ui/Loading';
import { FormHelpers } from '@/utils/clientActions/formHelpers';

const MAX_NUMBER_OF_KINS = 2;

const defaultNOKValues: NOK = {
	id: FormHelpers.generateUniqueIdentifier(),
	title: {
		presets: undefined,
		other: '',
	},
	firstName: '',
	lastName: '',
	middleName: '',
	dateOfBirth: '',
	relationshipToApplicant: '',
	gender: undefined,
	maritalStatus: undefined,
	countryOfBirth: '',
	placeOfBirth: '',
	countryOfResidence: '',
	citizenship: '',
	percentageAllocation: '',
};

export const Personal$NOK$Individual: FormStep = ({ countryList }) => {
	const {
		form: { control },
		toggleLoading,
	} = useKYCFormContext<IndividualFormSchema>();

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'nextOfKin',
	});

	useEffect(() => {
		if (fields.length === 0) {
			toggleLoading(true);
			append(defaultNOKValues);
			return;
		}

		toggleLoading(false);
	}, [fields, append, toggleLoading]);

	return (
		<>
			<Loading reveal={fields.length === 0} />
			<FormHeader>
				<FormTitle>Next of Kin - Personal Information</FormTitle>
				<FormSubHeader>Enter the information of your next of kin</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-[8px] py-5'>
					{fields.map((f, i) => {
						return (
							<div
								key={f.id}
								className='flex space-x-1'>
								<Accordion
									type='single'
									defaultValue='item-0'
									className='grow'
									collapsible>
									<AccordionItem value={`item-${i}`}>
										<AccordionTrigger
											className={cn('relative', i > 0 && 'pl-12')}
											type='button'>
											<div className='absolute left-[16px]'>
												{i > 0 && (
													<span
														className='text-primary-500 hover:bg-none hover:no-underline px-0 py-0 h-fit '
														onClick={() => remove(i)}>
														<Trash2 className='h-5 w-5 mr-1' />
													</span>
												)}
											</div>
											Next of Kin #{i + 1}
										</AccordionTrigger>
										<AccordionContent
											className='data-[state=closed]:hidden py-10'
											forceMount>
											<FormAutopopulate
												formIndex={i}
												srcFields={personalModel$NOK$Individual({ index: 0 })}
												srcPath='nextOfKin'
												render={(index) => (
													<NOKBioForm
														applicantId={index}
														countryList={countryList}
													/>
												)}
											/>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</div>
						);
					})}
					<div>
						<Button
							variant={'link'}
							type='button'
							disabled={fields.length === MAX_NUMBER_OF_KINS}
							className='text-primary-500 hover:bg-none hover:no-underline px-0 py-2 h-fit '
							onClick={() => {
								append(defaultNOKValues, {});
							}}>
							<CirclePlus className='h-5 w-5 mr-1' />
							Add a next of kin
						</Button>
					</div>
				</div>
			</FormContent>
		</>
	);
};

interface NOKBioForm extends SingleFormFieldsGeneratorProps {}

function NOKBioForm({ applicantId, countryList = [] }: NOKBioForm) {
	const aggregatorResults = useMemo(
		() =>
			personalModel$NOK$Individual({
				index: applicantId,
				countryList,
			}),
		[applicantId, countryList]
	);

	return (
		<>
			{aggregatorResults.map((f) => (
				<FormFactory
					key={f.name}
					{...f}
				/>
			))}
		</>
	);
}

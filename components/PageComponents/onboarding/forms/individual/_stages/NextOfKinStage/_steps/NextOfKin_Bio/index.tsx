import { useMemo } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/UIcomponents/ui/accordion';
import { Button } from '@/components/UIcomponents/ui/button';
import { CirclePlus, Trash2 } from 'lucide-react';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import type { FormStep } from '@/types/Components/onboarding';
import type { IndividualFormSchema } from '@/types/forms/individual';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import type { NextOfKinInfo } from '@/types/forms/individual';
import { cn } from '@/lib/utils';
import { NOK_bioFieldsModel } from './formBuilder/NOK_biofieldsModel';
import FormFactory from '@/components/UIcomponents/FormFactory';

const MAX_NUMBER_OF_KINS = 2;

const defaultNextOfKinValues: NextOfKinInfo = {
	title: {
		presets: '',
		other: '',
	},
	firstName: '',
	lastName: '',
	middleName: '',
	dateOfBirth: '',
	relationshipToApplicant: '',
	gender: '',
    maritalStatus: '',
    countryOfBirth: '',
    placeOfBirth: '',
    countryOfResidence: '',
    countryOfCitizenship: '',
    percentageAllocation: ''
};

export const NextOfKinBio: FormStep = ({ countryList }) => {
	const { watch, control } = useFormContext<IndividualFormSchema>();

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'nextOfKin',
	});

	if (fields.length === 0) {
		append(defaultNextOfKinValues);
    }
    


	return (
		<>
			<FormHeader>
				<FormTitle>Next of Kin - Personal Information</FormTitle>
				<FormSubHeader>
					Enter the information of your next of kin
				</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-[8px] py-5'>
                    { fields.map( ( f, i ) =>
                    {
						const kinFirstName = watch(`nextOfKin.${i}.firstName`);
						const kinLastName = watch(`nextOfKin.${i}.lastName`);
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
											className={cn('relative', i > 0 && 'pl-12')}>
											<div className='absolute left-[16px]'>
												{i > 0 && (
													<span
														className='text-primary-500 hover:bg-none hover:no-underline px-0 py-2 h-fit '
														onClick={() => remove(i)}>
														<Trash2 className='h-[20px] w-[20px] mr-1' />
													</span>
												)}
											</div>
											Next of Kin #{i + 1}: {kinFirstName} {kinLastName}
										</AccordionTrigger>
										<AccordionContent
											className='data-[state=closed]:hidden pb-16'
											forceMount>
											<NextOfKinBioForm
												applicantId={i}
												countryList={countryList}
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
                                append(defaultNextOfKinValues);
							}}>
							<CirclePlus className='h-[20px] w-[20px] mr-1' />
							Add a next of kin
						</Button>
					</div>
				</div>
			</FormContent>
		</>
	);
};

interface NextOfKinBioForm extends SingleFormFieldsGeneratorProps {}

function NextOfKinBioForm({
	applicantId,
	countryList = [],
}: NextOfKinBioForm) {
	const aggregatorResults = useMemo(
		() =>
			NOK_bioFieldsModel({
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

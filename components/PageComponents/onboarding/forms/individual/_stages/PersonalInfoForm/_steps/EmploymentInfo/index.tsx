import { useFormContext } from 'react-hook-form';
import {
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/UIcomponents/ui/form';
import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/UIcomponents/ui/accordion';
import { useMemo} from 'react';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import type { IndividualFormSchema } from '@/types/forms/individual';
import type { SingleCategoryForm } from '../BiographicalInfo';
import { CustomToggle } from '@/components/UIcomponents/CompoundUI/CustomToggle';
import MULTI_CHOICE_RESPONSES from '@/utils/vars/_formDefaults/personal_multiple_choice.json';
import EmploymentFields from './EmployedFields';
import StudentFields from './StudentFields';
import type { Country } from '@/types/forms/universal';

interface EmploymentInfoProps {
	countryList: Country[];
}

export default function EmploymentInfo({ countryList }: EmploymentInfoProps) {
	const form = useFormContext<IndividualFormSchema>();
	const { watch } = form;
	const applicant = useMemo(() => watch('applicant'), [watch]);

	return (
		<>
			<FormHeader>
				<FormTitle>Employment Information</FormTitle>
				<FormSubHeader>Enter your employment information.</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-10 py-5'>
					{applicant.map((c, i) => (
						<Accordion
							key={c.id}
                            type='single'
                            defaultValue='item-1'
							collapsible>
							<AccordionItem value={`item-${c.id}`}>
								<AccordionTrigger>
									Applicant #{c.id}: {c.firstName} {c.lastName}
								</AccordionTrigger>
								<AccordionContent className='space-y-8 data-[state=closed]:hidden' forceMount>
									<EmploymentForm
										applicantId={i}
										countryList={countryList}
									/>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</div>
			</FormContent>
		</>
	);
}

function EmploymentForm({ applicantId, countryList }: SingleCategoryForm) {
	const StatusFieldName = `applicant.${applicantId}.employment.status` as const;

	const { control, watch,unregister } = useFormContext<IndividualFormSchema>();

	const currentEmploymentStatus = watch(StatusFieldName);

	return (
		<>
			{/* Employment Status */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.employment.status` }
                    rules={ {
                        required: "Please select employment status"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Employment Status</FormLabel>
							<div className='grid gap-y-2'>
								{MULTI_CHOICE_RESPONSES.employment.status.map((c) => (
									<CustomToggle
										key={c}
										label={c}
										{...field}
										onChange={(e) => {
                                            unregister(`applicant.${applicantId}.employment.statusDetails`)
											field.onChange(e);
										}}
										value={c}
										selected={field.value === c}
									/>
								))}
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{currentEmploymentStatus === 'Employed' ||
			currentEmploymentStatus === 'Self-Employed' ? (
				<EmploymentFields
					applicantId={applicantId}
					countryList={countryList}
				/>
			) : currentEmploymentStatus === 'Student' ? (
				<StudentFields
					applicantId={applicantId}
					countryList={countryList}
				/>
			) : (
				<></>
			)}
		</>
	);
}

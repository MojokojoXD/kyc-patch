import { useFormContext } from 'react-hook-form';
import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/UIcomponents/ui/accordion';
import { useMemo, useEffect } from 'react';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import type { IndividualFormSchema } from '@/types/forms/individual';
import type { SingleCategoryForm } from '../BiographicalInfo';
import { generateEmploymentFields } from './formBuilder/employmentFormField';
import FormFactory from '@/components/UIcomponents/FormFactory';

export default function EmploymentInfo() {
	const { watch,getValues } = useFormContext<IndividualFormSchema>();
	const applicants = watch(`_formMetadata.applicantCount`);

	return (
		<>
			<FormHeader>
				<FormTitle>Employment Information</FormTitle>
				<FormSubHeader>Enter your employment information.</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-[8px] py-5'>
					{[...Array(applicants).keys()].map((c, i) => {
						const firstName = getValues(`applicant.${i}.firstName`);
						const lastName = getValues(`applicant.${i}.lastName`);
						return (
							<Accordion
								key={c}
								type='single'
								defaultValue='item-0'
								collapsible>
								<AccordionItem value={`item-${c}`}>
									<AccordionTrigger>
										Applicant #{c + 1}: {firstName} {lastName}
									</AccordionTrigger>
									<AccordionContent
										className='space-y-8 data-[state=closed]:hidden'
										forceMount>
										<EmploymentForm applicantId={i} />
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						);
					})}
				</div>
			</FormContent>
		</>
	);
}

function EmploymentForm({
	applicantId,
}: Pick<SingleCategoryForm, 'applicantId'>) {
	const { watch, resetField } = useFormContext<IndividualFormSchema>();

	const currentEmploymentStatus = watch(
		`applicant.${applicantId}.employment.status`
	);

	const dynamicFieldIdentifiers =
		currentEmploymentStatus === 'Employed' ||
		currentEmploymentStatus === 'Self-Employed'
			? ['employed', 'student']
			: currentEmploymentStatus === 'Student'
			? ['student']
			: [];

	const fields = useMemo(
		() => generateEmploymentFields(applicantId, ...dynamicFieldIdentifiers),
		[currentEmploymentStatus, applicantId]
	);

	useEffect(() => {
		if (
			currentEmploymentStatus === 'Retired' ||
			currentEmploymentStatus === 'Unemployed'
		) {
			resetField(`applicant.${applicantId}.employment.statusDetails`, {
				defaultValue: null,
			});
		}
	}, [currentEmploymentStatus]);

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

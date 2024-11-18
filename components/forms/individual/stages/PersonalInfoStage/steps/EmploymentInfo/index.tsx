import { useFormContext } from 'react-hook-form';
import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { useMemo, useEffect } from 'react';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/FormLayout';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import { employmentModel } from './model/employmentModel';
import { FormFieldAggregator } from '@/components/forms/utils/FormFieldAggregator';
import FormFactory from '@/components/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import { BrokerCurrency } from '@/utils/vars/brokers';
import { useKYCFormContext } from '@/components/forms/utils/formController';

export const EmploymentInfo: FormStep = ({ countryList }) => {
	const {
		form: { getValues },
	} = useKYCFormContext<IndividualFormSchema>();

	const applicants = getValues('applicant') ?? [];

	return (
		<>
			<FormHeader>
				<FormTitle>Employment Information</FormTitle>
				<FormSubHeader>Enter your employment information.</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-[8px] py-5'>
					{applicants.map((a, i) => {
						return (
							<Accordion
								key={a.id}
								type='single'
								defaultValue='item-0'
								collapsible>
								<AccordionItem value={`item-${i}`}>
									<AccordionTrigger>
										Applicant #{i + 1}: {a.firstName} {a.lastName}
									</AccordionTrigger>
									<AccordionContent
										className='data-[state=closed]:hidden py-10'
										forceMount>
										<EmploymentForm
											applicantId={i}
											countryList={countryList}
										/>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						);
					})}
				</div>
			</FormContent>
		</>
	);
};

interface EmploymentFormProps extends SingleFormFieldsGeneratorProps {}

function EmploymentForm({
	applicantId,
	countryList = [],
}: EmploymentFormProps) {
	const { watch, resetField } = useFormContext<IndividualFormSchema>();

	const currentEmploymentStatus = watch(
		`applicant.${applicantId}.employment.status`
	);

	const currency = BrokerCurrency['DATAB'];

	const aggregatorResults = useMemo(() => {
		const rawFields = employmentModel({
			index: applicantId,
			countryList,
			currency,
		});
		const aggregator = new FormFieldAggregator(rawFields);

		aggregator.modifyFields('control-employment', {
			removeAllExcept:
				currentEmploymentStatus === 'Retired' ||
				currentEmploymentStatus === 'Unemployed' ||
				!currentEmploymentStatus,
		});

		aggregator.modifyFields('remove-all-except', {
			removeAllExcept: currentEmploymentStatus === 'Student',
		});

		return aggregator.generate();
	}, [applicantId, currentEmploymentStatus, countryList, currency]);

	useEffect(() => {
		if (
			currentEmploymentStatus === 'Retired' ||
			currentEmploymentStatus === 'Unemployed'
		) {
			resetField(`applicant.${applicantId}.employment.statusDetails`, {
				defaultValue: null,
			});
		}
	}, [currentEmploymentStatus, applicantId, resetField]);

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

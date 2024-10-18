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
import { employmentFieldsModel } from './formBuilder/employmentFormField';
import { FormFieldAggregator } from '@/components/PageComponents/onboarding/forms/individual/utils/FormFieldAggregator';
import FormFactory from '@/components/UIcomponents/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import { BrokerCurrency } from '@/utils/vars/brokers';

export const EmploymentInfo: FormStep = ({
	applicantCount,
	countryList,
	broker,
}) => {
	const { getValues } = useFormContext<IndividualFormSchema>();

	return (
		<>
			<FormHeader>
				<FormTitle>Employment Information</FormTitle>
				<FormSubHeader>Enter your employment information.</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-[8px] py-5'>
					{[...Array(applicantCount).keys()].map((c, i) => {
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
										className='data-[state=closed]:hidden pb-16'
										forceMount>
										<EmploymentForm
											applicantId={i}
											countryList={countryList}
											broker={broker}
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

interface EmploymentFormProps
	extends SingleFormFieldsGeneratorProps {}

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
		const rawFields = employmentFieldsModel({
			index: applicantId,
			countryList,
			currency,
		});
		const aggregator = new FormFieldAggregator(rawFields);

		aggregator.modifyFields('control-employment', {
			removeAllExcept:
				currentEmploymentStatus === 'Retired' ||
				currentEmploymentStatus === 'Unemployed',
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
			{aggregatorResults.fields.map((f) => (
				<FormFactory
					key={f.name}
					{...f}
				/>
			))}
		</>
	);
}

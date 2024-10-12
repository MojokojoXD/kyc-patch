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
import { FormFieldAggregator } from '@/components/PageComponents/onboarding/forms/utils/FormFieldAggregator';
import FormFactory from '@/components/UIcomponents/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import { BrokerCurrency } from '@/utils/vars/brokers';

export const EmploymentInfo: FormStep = ({
	applicantCount,
	passCountryList,
	passBrokerInfo,
}) => {
	const { getValues } = useFormContext<IndividualFormSchema>();

	const countryList = passCountryList?.call(this, true);

	const broker = passBrokerInfo?.call(this, true);

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
										className='data-[state=closed]:hidden'
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

type EmploymentFormProps = SingleFormFieldsGeneratorProps &
	Record<string, never>;

function EmploymentForm({
	applicantId,
	countryList,
	broker = { org_code: 'DATAB' },
}: EmploymentFormProps) {
	const { watch, resetField } = useFormContext<IndividualFormSchema>();

	const currentEmploymentStatus = watch(
		`applicant.${applicantId}.employment.status`
	);

	const currency = BrokerCurrency[broker!.org_code];

	const aggregatorResults = useMemo(() => {
		const aggregator = new FormFieldAggregator(
			employmentFieldsModel
		).init(broker?.org_code, {
			index: applicantId,
			countryList,
			currency,
		});

		const isKESTREL = broker.org_code === 'KESTR'; // condition not inlined to improve readability

		aggregator.modifyFields(
			`applicant.${applicantId}.employment.status`,
			(currentField) =>
				isKESTREL
					? {
							options: {
								...currentField.options,
								keys: ['Employed', 'Self-Employed'],
							},
					  }
					: null
		);

		aggregator.modifyFields('remove-all-except', {
			removeAllExcept:
				currentEmploymentStatus === 'Student' &&
				broker.org_code === 'DATAB',
		});

		aggregator.modifyFields('control-employment', {
			removeAllExcept:
				currentEmploymentStatus === 'Retired' ||
				currentEmploymentStatus === 'Unemployed',
		});

		return aggregator.generate();
	}, [applicantId, currentEmploymentStatus, countryList, broker]);

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

	console.log(currentEmploymentStatus);

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

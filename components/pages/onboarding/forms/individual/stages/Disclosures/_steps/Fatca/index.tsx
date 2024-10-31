import { useFormContext } from 'react-hook-form';

import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/UIcomponents/ui/accordion';
import { useMemo } from 'react';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import FormFactory from '@/components/UIcomponents/FormFactory';
import type { IndividualFormSchema } from '@/types/forms/individual';
import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import { fatcaFieldsModel } from './formBuilder/fatcaFieldsModel';
import { FormFieldAggregator } from '../../../../../utils/FormFieldAggregator';

export const Fatca: FormStep = ({ applicantCount, countryList }) => {
	const { getValues } = useFormContext<IndividualFormSchema>();

	return (
		<>
			<FormHeader>
				<FormTitle>Foreign Account Tax Compliance Act (FATCA)</FormTitle>
				<FormSubHeader>
					The following questions are designed to capture information for
					common reporting standards as well as FATCA (Foreign Account Tax
					Compliance Act)
				</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-10 py-5'>
					{[...Array(applicantCount).keys()].map((c) => {
						const firstName = getValues(`applicant.${c}.firstName`);
						const lastName = getValues(`applicant.${c}.lastName`);
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
										<FatcaForm
											applicantId={c}
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

interface FatcaFormProps extends SingleFormFieldsGeneratorProps {}

function FatcaForm({ applicantId, countryList }: FatcaFormProps) {
	const { watch } = useFormContext<IndividualFormSchema>();

	const currentFatcaStatus = watch(
		`applicant.${applicantId}.disclosures.fatca.status`
	);

	const aggregatorResults = useMemo(() => {
		const rawFields = fatcaFieldsModel({
			index: applicantId,
			countryList,
		});

		const aggregator = new FormFieldAggregator(rawFields);

		aggregator.modifyFields('remove-all-except', {
			removeAllExcept:
				!currentFatcaStatus || currentFatcaStatus.length === 0,
		});

		return aggregator.generate();
	}, [applicantId, countryList, currentFatcaStatus]);

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

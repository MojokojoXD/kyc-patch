import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { useMemo } from 'react';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/FormLayout';
import FormFactory from '@/components/FormFactory';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import { fatcaModel$Individual } from './model/fatcaModel$Individual';
import { FormFieldAggregator } from '../../../../../utils/FormFieldAggregator';
import { useKYCFormContext } from '@/components/forms/utils/formController';

export const Fatca$Individual: FormStep = ({ countryList }) => {
	const {
		form: { getValues },
	} = useKYCFormContext<IndividualFormSchema>();

	const applicants = getValues('applicant') || [{}];

	return (
		<>
			<FormHeader>
				<FormTitle>Foreign Account Tax Compliance Act (FATCA)</FormTitle>
				<FormSubHeader>
					The following questions are designed to capture information for common
					reporting standards as well as FATCA (Foreign Account Tax Compliance Act)
				</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-10 py-5'>
					{applicants.map((a, i) => (
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
									<FatcaForm
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
};

interface FatcaFormProps extends SingleFormFieldsGeneratorProps {}

function FatcaForm({ applicantId, countryList }: FatcaFormProps) {
	const {
		form: { watch },
	} = useKYCFormContext<IndividualFormSchema>();

	const currentFatcaStatus = watch(
		`applicant.${applicantId}.disclosures.fatca.status`
	);

	const aggregatorResults = useMemo(() => {
		const rawFields = fatcaModel$Individual({
			index: applicantId,
			countryList,
		});

		const aggregator = new FormFieldAggregator(rawFields);

		aggregator.modifyFields('remove-all-except', {
			removeAllExcept: !currentFatcaStatus || currentFatcaStatus.length === 0,
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

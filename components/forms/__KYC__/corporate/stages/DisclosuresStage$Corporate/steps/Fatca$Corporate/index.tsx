import { useMemo } from 'react';
import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/ui/accordion';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/forms/FormLayout';
import FormFactory from '@/components/forms/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';
import type { Signatory } from '@/types/forms/corporateSchema';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import { useKYCFormContext } from '@/components/forms/utils/formController';
import { FormFieldAggregator } from '@/components/forms/utils/FormFieldAggregator';
import { fatcaModel$Corporate } from './model/fatcaModel$Corporate';

export const Fatca$Corporate: FormStep = () => {
	const { form } = useKYCFormContext();
	const { getValues } = form;

	const signatories =
		(getValues('accountSignatories.signatories') as Signatory[]) || [];

	return (
	<>
		<FormHeader>
			<FormTitle>Foreign Account Tax Compliance Act (FATCA)</FormTitle>
			<FormSubHeader>
				The following questions are designed to capture information for common reporting
				standards as well as FATCA (Foreign Account Tax Compliance Act)
			</FormSubHeader>
		</FormHeader>
		<FormContent className='space-y-1'>
			{signatories.map((s, i) => {
				const signatoryFirstName = s.firstName ?? 'John';
				const signatoryLastName = s.lastName ?? 'Doe';

				return (
					<Accordion
						collapsible
						key={i}
						type={'single'}
						defaultValue='item-0'>
						<AccordionItem value={`item-${i}`}>
							<AccordionTrigger>
								Signatory #{i + 1} {signatoryFirstName} {signatoryLastName}
							</AccordionTrigger>
							<AccordionContent
								className='data-[state=closed]:hidden'
								forceMount>
								<FatcaForm applicantId={i} />
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				);
			})}
		</FormContent>
	</>
);
};

interface FatcaFormProps extends SingleFormFieldsGeneratorProps {}

function FatcaForm({ applicantId }: FatcaFormProps) {
	const { form } = useKYCFormContext();
	const { watch } = form;

	const currentFatcaStatus = watch(
		`accountSignatories.signatories.${applicantId}.disclosures.fatca.status`
	) as string[];

	const result = useMemo(() => {
		const rawFields = fatcaModel$Corporate({ index: applicantId });

		const aggregator = new FormFieldAggregator(rawFields);

		if (!currentFatcaStatus) return aggregator.generate();

		aggregator.modifyFields('remove-all-except', {
			removeAllExcept: currentFatcaStatus.length === 0,
		});

		return aggregator.generate();
	}, [currentFatcaStatus, applicantId]);

	return (
		<>
			{result.map((f) => (
				<FormFactory
					key={f.name}
					{...f}
				/>
			))}
		</>
	);
}

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
import type { IndividualFormSchema } from '@/types/forms/individual';
import type { FormStep } from '@/types/Components/onboarding';
import { BrokerCurrency } from '@/utils/vars/brokers';
import { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import { riskProfileFieldModel } from './FormBuilder/riskProfileFields';
import { FormFieldAggregator } from '@/components/PageComponents/onboarding/forms/individual/utils/FormFieldAggregator';
import FormFactory from '@/components/UIcomponents/FormFactory';

export const RiskProfile: FormStep = ({ applicantCount}) => {
	const { getValues } = useFormContext<IndividualFormSchema>();

	return (
		<>
			<FormHeader>
				<FormTitle>Investment & Risk Profile</FormTitle>
				<FormSubHeader>
					Complete your investment & risk profile.
				</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-[8px] py-5'>
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
										className='data-[state=closed]:hidden pb-10'
										forceMount>
										<RiskProfileForm
											applicantId={c}
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

interface RiskProfileFormProps
	extends SingleFormFieldsGeneratorProps {}

function RiskProfileForm({ applicantId }: RiskProfileFormProps) {
	// const { getValues } = useFormContext<IndividualFormSchema>();

	const aggregatorResults = useMemo(() => {
		const currency = BrokerCurrency['DATAB'];

		const rawFields = riskProfileFieldModel({
			index: applicantId,
			currency,
		});
		const aggregator = new FormFieldAggregator(rawFields);

		return aggregator.generate();
	}, [applicantId]);

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

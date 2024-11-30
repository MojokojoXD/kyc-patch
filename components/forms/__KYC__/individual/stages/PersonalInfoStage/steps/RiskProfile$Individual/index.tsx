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
} from '@/components/forms/FormLayout';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import type { FormStep } from '@/types/Components/onboarding';
import type { BrokerCode } from '@/types/forms/broker';
import { BrokerCurrency } from '@/utils/vars/brokers';
import { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import { riskProfileModel$Individual } from './model/riskProfileModel$Individual';
import { FormFieldAggregator } from '@/components/forms/utils/FormFieldAggregator';
import FormFactory from '@/components/forms/FormFactory';
import { useKYCFormContext } from '@/components/forms/utils/formController';

export const RiskProfile$Individual: FormStep = () => {
	const {
		form: { getValues },
	} = useKYCFormContext<IndividualFormSchema>();

	const applicant = getValues('applicant') || [{}];

	return (
		<>
			<FormHeader>
				<FormTitle>Investment & Risk Profile</FormTitle>
				<FormSubHeader>Complete your investment & risk profile.</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-[8px] py-5'>
					{applicant.map((a, i) => (
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
									className='data-[state=closed]:hidden pb-10'
									forceMount>
									<RiskProfileForm applicantId={i} />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</div>
			</FormContent>
		</>
	);
};

interface RiskProfileFormProps extends SingleFormFieldsGeneratorProps {}

function RiskProfileForm({ applicantId }: RiskProfileFormProps) {
	const {
		formVars: { brokerCode },
	} = useKYCFormContext<IndividualFormSchema>();

	const aggregatorResults = useMemo(() => {
		const currency = BrokerCurrency[brokerCode as BrokerCode];

		const rawFields = riskProfileModel$Individual({
			index: applicantId,
			currency,
		});
		const aggregator = new FormFieldAggregator(rawFields);

		return aggregator.generate();
	}, [applicantId, brokerCode]);

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

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
import { FormFieldAggregator } from '@/components/PageComponents/onboarding/forms/utils/FormFieldAggregator';
import FormFactory from '@/components/UIcomponents/FormFactory';

export const RiskProfile: FormStep = ({
	applicantCount,
	passBrokerInfo,
}) => {
	const { getValues } = useFormContext<IndividualFormSchema>();

	const broker = passBrokerInfo?.call(this, true);

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
										className='data-[state=closed]:hidden'
										forceMount>
										<RiskProfileForm
											applicantId={c}
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

interface RiskProfileFormProps
	extends SingleFormFieldsGeneratorProps {}

function RiskProfileForm({
	applicantId,
	broker,
}: RiskProfileFormProps) {
	const { getValues } = useFormContext<IndividualFormSchema>();

	const aggregatorResults = useMemo(() => {
		const currency = BrokerCurrency[broker?.org_code];
		const aggregator = new FormFieldAggregator(
			riskProfileFieldModel
		).init(broker?.org_code, {
			index: applicantId,
			currency,
		});

		broker?.org_code === 'KESTR' &&
			aggregator.modifyFields(
				`applicant.${applicantId}.riskProfile.topUpActivity.frequency`,
				(f) => ({
					...f,
                    label: 'Expected investment frequency',
                    name: `applicant.${applicantId}.riskProfile.investmentFrequency`,
					placeholder: 'Enter investment frequency',
					options: {
						...f.options,
                        keys: f.options?.keys.filter( ( k ) => k !== 'Bi-Annually' )
                    },
                    componentProps: {
                        className: 'grid-cols-3'
                    }
				})
			);

		return aggregator.generate();
	}, [applicantId, broker]);

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

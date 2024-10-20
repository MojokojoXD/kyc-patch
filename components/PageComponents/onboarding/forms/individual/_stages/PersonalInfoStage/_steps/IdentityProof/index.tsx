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
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import { FormFieldAggregator } from '@/components/PageComponents/onboarding/forms/individual/utils/FormFieldAggregator';
import { proofOfIdentityFieldsModel } from './formBuild/proofOfIdentityFields';
import FormFactory from '@/components/UIcomponents/FormFactory';

export const IdentityProofInfo: FormStep = ({
	applicantCount,
}) => {
	const { getValues } = useFormContext<IndividualFormSchema>();

	return (
		<>
			<FormHeader>
				<FormTitle>Proof of Identity</FormTitle>
				<FormSubHeader>Enter your ID information.</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-[8px] py-5'>
					{[...Array(applicantCount).keys()].map((c, i) => {
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
										<IdentityForm
											applicantId={i}
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

interface IdentityFormProps extends SingleFormFieldsGeneratorProps {}

function IdentityForm({ applicantId }: IdentityFormProps) {
	const aggregatorResults = useMemo(() => {
		const rawFields = proofOfIdentityFieldsModel({
			index: applicantId,
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

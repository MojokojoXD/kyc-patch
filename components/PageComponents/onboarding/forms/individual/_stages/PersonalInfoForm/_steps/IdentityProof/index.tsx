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
import { FormFieldAggregator } from '@/components/PageComponents/onboarding/forms/utils/FormFieldAggregator';
import { proofOfIdentityFieldsModel } from './formBuild/proofOfIdentityFields';
import FormFactory from '@/components/UIcomponents/FormFactory';

export const IdentityProofInfo: FormStep = ({ applicantCount, passBrokerInfo }) => {
    const { getValues } = useFormContext<IndividualFormSchema>();
    
    const broker = passBrokerInfo?.call( this, true );

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
										className='data-[state=closed]:hidden'
										forceMount>
										<IdentityForm applicantId={i} broker={ broker }/>
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

type IdentityFormProps = Omit<SingleFormFieldsGeneratorProps,'countryList'> & Record<string, never>

function IdentityForm({ applicantId, broker }: IdentityFormProps) {

	const aggregatorResults = useMemo(() => {
		const aggregator = new FormFieldAggregator(
			proofOfIdentityFieldsModel
		).init('', {
			index: applicantId,
		});

		broker?.org_code !== 'DATAB' && aggregator.modifyFields(
			`applicant.${applicantId}.proofOfIdentity.idType`,
			(f) => ({
				...f,
				options: {
                    keySelector: ( k ) => k,
                    keys: f.options?.keys.filter( k => k !== 'Voter\'s ID' )
				},
			})
		);

		return aggregator.generate();
	}, [applicantId,broker]);

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

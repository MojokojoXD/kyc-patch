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
import { Button } from '@/components/ui/button';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import { proofOfIdentityModel$NOK$Individual } from './model/proofOfIdentityModel$NOK$Individual';
import { FormFieldAggregator } from '../../../../../../utils/FormFieldAggregator';
import FormFactory from '@/components/forms/FormFactory';
import { useKYCFormContext } from '@/components/forms/utils/formController';

export const ProofOfIdentity$NOK$Individual: FormStep = () => {
	const {
		form: { getValues },
		formAction,
	} = useKYCFormContext<IndividualFormSchema>();

	const nextOfKins = getValues(`nextOfKin`);

	return (
		<>
			<FormHeader>
				<div className='flex justify-between items-center'>
					<FormTitle>Next of Kin - Proof of Identity</FormTitle>
					<Button
						variant={'outline'}
						onClick={() => formAction({ type: 'next' })}>
						Skip
					</Button>
				</div>
				<FormSubHeader>Enter the ID information of your next of kin.</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-[8px] py-5'>
					{nextOfKins.map((n, i) => (
						<Accordion
							key={i}
							type='single'
							defaultValue='item-0'
							collapsible>
							<AccordionItem value={`item-${i}`}>
								<AccordionTrigger>
									Applicant #{i + 1}: {n.firstName} {n.lastName}
								</AccordionTrigger>
								<AccordionContent
									className='data-[state=closed]:hidden pb-16 overflow-visible'
									forceMount>
									<NextOfKin_IdentityProofForm applicantId={i} />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</div>
			</FormContent>
		</>
	);
};

interface NextOfKin_IdentityProofFormProps
	extends SingleFormFieldsGeneratorProps {}

function NextOfKin_IdentityProofForm({
	applicantId,
}: NextOfKin_IdentityProofFormProps) {
	const {
		form: { watch },
	} = useKYCFormContext<IndividualFormSchema>();

	const currentNOKidType = watch(
		`nextOfKin.${applicantId}.proofOfIdentity.idType`
	);

	const aggregatorResults = useMemo(() => {
		const rawFields = proofOfIdentityModel$NOK$Individual({
			index: applicantId,
		});

		const aggregator = new FormFieldAggregator(rawFields);

		aggregator.modifyFields('deps', {
			required: currentNOKidType !== 'Birth Certificate (If under 18 years old)',
		});

		return aggregator.generate();
	}, [applicantId, currentNOKidType]);

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

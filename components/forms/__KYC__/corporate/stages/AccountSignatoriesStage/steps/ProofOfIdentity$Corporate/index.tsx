import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import type { Signatory } from '@/types/forms/corporateSchema';
import {
	Accordion,
	AccordionItem,
	AccordionContent,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { FormHeader, FormTitle, FormContent } from '@/components/forms/FormLayout';
import FormFactory from '@/components/forms/FormFactory';
import { useKYCFormContext } from '@/components/forms/utils/formController';
import { proofOfIdentityModel$Corporate } from './model/proofOfIdentityModel$Corporate';

export const ProofOfIdentity$Corporate: FormStep = () => {
	const { form } = useKYCFormContext();
	const { getValues } = form;

	const currentSignatoriesList =
		(getValues('accountSignatories.signatories') as Signatory[]) || [];

	return (
		<>
			<FormHeader>
				<FormTitle>Proof of Identity</FormTitle>
			</FormHeader>
			<FormContent>
				<ul className='space-y-[8px]'>
					{currentSignatoriesList.map((s, i) => (
						<li key={s.id}>
							<Accordion
								defaultValue={'item-0'}
								collapsible
								type={'single'}>
								<AccordionItem value={`item-${i}`}>
									<AccordionTrigger>
										Signatory #{i + 1}: {s.firstName} {s.lastName}
									</AccordionTrigger>
									<AccordionContent
										className='data-[state=closed]:hidden pb-16 overflow-visible'
										forceMount>
										<SignatoryForm applicantId={i} />
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</li>
					))}
				</ul>
			</FormContent>
		</>
	);
};

interface SignatoryFormProps extends SingleFormFieldsGeneratorProps {}

function SignatoryForm({ applicantId }: SignatoryFormProps) {
	const fields = proofOfIdentityModel$Corporate({
		index: applicantId,
	});

	return (
		<>
			{fields.map((f) => (
				<FormFactory
					key={f.name}
					{...f}
				/>
			))}
		</>
	);
}

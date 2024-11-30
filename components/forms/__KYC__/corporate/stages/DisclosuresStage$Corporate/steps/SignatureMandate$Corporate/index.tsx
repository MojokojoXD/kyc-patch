import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/forms/FormLayout';
import FormFactory from '@/components/forms/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';
import { signatureMandateModel$Corporate } from './model/signatureMandateModel$Corporate';

export const SignatureMandate$Corporate: FormStep = () => {
	return (
		<>
			<FormHeader>
				<FormTitle>Signature Mandate</FormTitle>
				<FormSubHeader>Tick the combination that applies</FormSubHeader>
			</FormHeader>
			<FormContent>
				{signatureMandateModel$Corporate.map((f) => (
					<FormFactory
						key={f.name}
						{...f}
					/>
				))}
			</FormContent>
		</>
	);
};

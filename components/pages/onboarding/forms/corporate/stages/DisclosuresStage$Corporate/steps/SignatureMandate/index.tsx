import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import FormFactory from '@/components/UIcomponents/FormFactory';
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

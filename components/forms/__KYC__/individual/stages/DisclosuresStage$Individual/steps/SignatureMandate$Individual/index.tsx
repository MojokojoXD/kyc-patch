import {
	FormContent,
	FormTitle,
	FormHeader,
	FormSubHeader,
} from '@/components/forms/FormLayout';
import { signatureMandateModel$Individual } from './model/signatureMandateModel$Individual';
import FormFactory from '@/components/forms/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';

export const SignatureMandate$Individual: FormStep = () => {
	return (
		<>
			<FormHeader>
				<FormTitle>Signature Mandate</FormTitle>
				<FormSubHeader>Please select which one applies.</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-[40px] py-5'>
					{signatureMandateModel$Individual.map((f) => (
						<FormFactory
							key={f.name}
							{...f}
						/>
					))}
				</div>
			</FormContent>
		</>
	);
};

import {
	FormContent,
	FormTitle,
    FormHeader,
    FormSubHeader
} from '@/components/UIcomponents/FormLayout';
import { signatureMandateFields } from './formBuilder/signatureMandateFields';
import FormFactory from '@/components/UIcomponents/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';

export const SignatureMandate: FormStep = () => {

	return (
		<>
			<FormHeader>
                <FormTitle>Signature Mandate</FormTitle>
                <FormSubHeader>Please select which one applies.</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-[40px] py-5'>
					{signatureMandateFields.map((f) => (
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

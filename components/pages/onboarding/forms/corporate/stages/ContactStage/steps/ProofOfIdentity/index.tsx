import {
	FormHeader,
	FormContent,
	FormTitle,
} from '@/components/UIcomponents/FormLayout';
import { proofOfIdentityModel$Contacts } from './model/proofOfIdentityModel_contact';
import FormFactory from '@/components/UIcomponents/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';

export const ProofOfIdentity$Contacts: FormStep = () => {

	return (
		<>
			<FormHeader>
				<FormTitle>Proof of Identity</FormTitle>
			</FormHeader>
			<FormContent>
				{proofOfIdentityModel$Contacts.map((f) => (
					<FormFactory
						key={f.name}
						{...f}
					/>
				))}
			</FormContent>
		</>
	);
};

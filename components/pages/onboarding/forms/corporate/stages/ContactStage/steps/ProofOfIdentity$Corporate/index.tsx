import {
	FormHeader,
	FormContent,
	FormTitle,
} from '@/components/UIcomponents/FormLayout';
import { proofOfIdentityModel$Contacts } from './model/proofOfIdentityModel_contact';
import FormFactory from '@/components/UIcomponents/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';

export const ProofOfIdentity$Corporate: FormStep = () => {

	return (
		<>
			<FormHeader>
				<FormTitle>Proof of Identity</FormTitle>
			</FormHeader>
			<FormContent className='space-y-[45px]'>
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

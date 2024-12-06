import {
	FormHeader,
	FormContent,
	FormTitle,
} from '@/components/forms/FormLayout';
import { useFieldArray } from 'react-hook-form';
import { proofOfIdentityModel$Contacts } from './model/proofOfIdentityModel_contact';
import FormFactory from '@/components/forms/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';
import { useKYCFormContext } from '@/components/forms/utils/formController';
import type { CorporateFormSchema } from '@/types/forms/corporateSchema';

export const ProofOfIdentity$Corporate: FormStep = () => {
	const { form, onFormNav } = useKYCFormContext<CorporateFormSchema>();
	const { getValues } = form;
	const { update } = useFieldArray<
		CorporateFormSchema,
		'accountSignatories.signatories'
	>({
		name: 'accountSignatories.signatories',
	});

	onFormNav(function () {
		// update contact person signatory before component dismount

		const proofOfIdentityOfContact = getValues('contacts.proofOfIdentity');
		const signatories = getValues('accountSignatories.signatories');

		const signatoryIndexToUpdate = signatories.findIndex(
			(s) => s._fillSrc === 'AUTO'
		);

		if (signatoryIndexToUpdate === -1) return;

		const oldValue = signatories[signatoryIndexToUpdate];

		update(signatoryIndexToUpdate, {
			...oldValue,
			proofOfIdentity: {
				...proofOfIdentityOfContact,
			},
		});
	});

	// useEffect(() => {
	// 	return () => {

	// 	};
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// },[]);

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

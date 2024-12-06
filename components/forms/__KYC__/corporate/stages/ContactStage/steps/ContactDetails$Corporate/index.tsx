import { useKYCFormContext } from '@/components/forms/utils/formController';
import type { CorporateFormSchema } from '@/types/forms/corporateSchema';
import {
	FormHeader,
	FormContent,
	FormTitle,
} from '@/components/forms/FormLayout';
import { contactDetailsModel$Corporate } from './model/contactDetailsModel$Corporate';
import FormFactory from '@/components/forms/FormFactory';
import { useFieldArray } from 'react-hook-form';
import type { FormStep } from '@/types/Components/onboarding';

export const ContactDetails$Corporate: FormStep = ({ countryList }) => {
	const { form, onFormNav } = useKYCFormContext<CorporateFormSchema>();
	const { getValues } = form;
	const { update } = useFieldArray<
		CorporateFormSchema,
		'accountSignatories.signatories'
	>({
		name: 'accountSignatories.signatories',
	});
	const fields = contactDetailsModel$Corporate({ countryList });

	onFormNav(function () {
		const signatories = getValues('accountSignatories.signatories');
		const signatoryIndexToUpdate = signatories.findIndex(
			(s) => s._fillSrc === 'AUTO'
		);

		if (signatoryIndexToUpdate === -1) return;

		const { contactPerson, proofOfIdentity, ...contactDetails } =
			getValues('contacts');

		const oldValues = signatories[signatoryIndexToUpdate];

		update(signatoryIndexToUpdate, {
			...oldValues,
			address: {
				...oldValues.address,
				...contactDetails,
				emergencyContact: { ...contactDetails.emergencyContact },
			},
		});
	});

	return (
		<>
			<FormHeader>
				<FormTitle>Contact Details</FormTitle>
			</FormHeader>
			<FormContent className='space-y-[45px]'>
				{fields.map((f) => (
					<FormFactory
						key={f.name}
						{...f}
					/>
				))}
			</FormContent>
		</>
	);
};

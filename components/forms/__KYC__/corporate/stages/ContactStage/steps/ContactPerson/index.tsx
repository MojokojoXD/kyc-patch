import { useMemo, useEffect } from 'react';
import {
	FormHeader,
	FormContent,
	FormSubHeader,
	FormTitle,
} from '@/components/forms/FormLayout';
import { contactPersonModel } from './model/contactPersonModel';
import FormFactory from '@/components/forms/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';
import { FormFieldAggregator } from '@/components/forms/utils/FormFieldAggregator';
import { useKYCFormContext } from '@/components/forms/utils/formController';
import type { CorporateFormSchema } from '@/types/forms/corporateSchema';

const GHANA = 'GHANA';

export const ContactPerson: FormStep = ({ countryList }) => {
	const { form } = useKYCFormContext<CorporateFormSchema>();
	const { watch, setValue } = form;

	const residenceCountry = watch('contacts.contactPerson.countryOfResidence');
	const citizenshipCountry = watch('contacts.contactPerson.citizenship');

	const residenceStatus =
		residenceCountry === GHANA && citizenshipCountry === GHANA
			? 'Resident Ghanaian'
			: residenceCountry === GHANA && citizenshipCountry !== GHANA
			? 'Resident Foreigner'
			: residenceCountry !== GHANA && citizenshipCountry === GHANA
			? 'Non-Resident Ghanaian'
			: 'Non-Resident Foreigner';

	const fields = useMemo(() => {
		const rawFields = contactPersonModel({ countryList });

		const aggregator = new FormFieldAggregator(rawFields);

		aggregator.modifyFields('GH', {
			required:
				residenceStatus === 'Resident Foreigner' ||
				residenceStatus === 'Non-Resident Foreigner',
			remove: residenceStatus === 'Resident Ghanaian',
		});

		return aggregator.generate();
	}, [countryList, residenceStatus]);

	useEffect(
		() => setValue(`contacts.contactPerson.residenceStatus`, residenceStatus),
		[residenceStatus, setValue]
	);

	return (
		<>
			<FormHeader>
				<FormTitle>Contact Person</FormTitle>
				<FormSubHeader>
					Enter details for the company&apos;s contact person.
				</FormSubHeader>
			</FormHeader>
			<FormContent className='space-y-[46px]'>
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

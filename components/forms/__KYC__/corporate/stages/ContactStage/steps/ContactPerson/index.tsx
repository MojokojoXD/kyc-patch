import { useMemo, useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
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
import type {
	ContactPerson as ContactPersonType,
	CorporateFormSchema,
} from '@/types/forms/corporateSchema';
import type { Signatory } from '@/types/forms/corporateSchema';
import {
	MAX_SIGNATORIES,
	signatoriesDefaultValues,
} from '../../../AccountSignatoriesStage/steps/Signatories/model/signatoriesModel';

const GHANA = 'GHANA';

export const ContactPerson: FormStep = ({ countryList }) => {
	const { form, onFormNav } = useKYCFormContext<CorporateFormSchema>();
	const { watch, setValue, getValues } = form;
	const { replace } = useFieldArray<
		CorporateFormSchema,
		'accountSignatories.signatories'
	>({
		name: 'accountSignatories.signatories',
	});

  
	const residenceCountry = watch('contacts.contactPerson.countryOfResidence');
	const citizenshipCountry = watch('contacts.contactPerson.citizenship');
  const isContactPersonASignatory = watch( 'contacts.contactPerson.isSignatory' );
  const signatories = getValues( 'accountSignatories.signatories' ) ?? [];
	const signatoriesCount = signatories.length;

	const residenceStatus =
		residenceCountry === GHANA && citizenshipCountry === GHANA
			? 'Resident Ghanaian'
			: residenceCountry === GHANA && citizenshipCountry !== GHANA
			? 'Resident Foreigner'
			: residenceCountry !== GHANA && citizenshipCountry === GHANA
			? 'Non-Resident Ghanaian'
			: 'Non-Resident Foreigner';

  onFormNav( function ()
  {
		if (isContactPersonASignatory && isContactPersonASignatory === 'Yes') {
			const currentContactPerson = getValues('contacts.contactPerson');

			if (signatoriesCount >= MAX_SIGNATORIES) return;

			const contactPersonSignatory = composeSignatoryFromContactPerson(
				currentContactPerson,
				signatories
			);

			const updatedSignatories = [
				contactPersonSignatory,
				...signatories.filter((s) => s._fillSrc === 'MANUAL'),
			];

			replace(updatedSignatories);
		} else {
			const trimmedSignatories = signatories.filter((s) => s._fillSrc === 'MANUAL');

			replace(trimmedSignatories);
    }
    
	});

	const fields = useMemo(() => {
		const rawFields = contactPersonModel({ countryList });

		const aggregator = new FormFieldAggregator(rawFields);

		aggregator.modifyFields('GH', {
			required: residenceStatus === 'Resident Foreigner',
			remove: residenceStatus === 'Resident Ghanaian',
		});

		return aggregator.generate();
	}, [countryList, residenceStatus]);

  //Do nothing or update existing contact signatory person if signatories is at maximum
  if (
    signatories.length === MAX_SIGNATORIES &&
    isContactPersonASignatory === 'Yes' &&
    !signatories.some((s) => s._fillSrc === 'AUTO')
  ) {
    alert('Maximum number of signatories reached!');
    setValue('contacts.contactPerson.isSignatory', 'No');
  }

	useEffect(() => {
		setValue(`contacts.contactPerson.residenceStatus`, residenceStatus);
	}, [residenceStatus, setValue]);

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

function composeSignatoryFromContactPerson(
	person: ContactPersonType,
	signatories: Signatory[]
): Signatory {
	const prefilledSignatory = signatories.find((s) => s._fillSrc === 'AUTO');

	const preContactPersonSignatory = { ...person };

	delete preContactPersonSignatory.isSignatory;

	return {
		...(prefilledSignatory
			? prefilledSignatory
			: {
					...signatoriesDefaultValues,
					_fillSrc: 'AUTO',
			  }),
		...preContactPersonSignatory,
	};
}

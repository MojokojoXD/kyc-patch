import { useKYCFormContext } from '@/components/forms/utils/formController';
import { FormContent, FormTitle, FormHeader } from '@/components/forms/FormLayout';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import { retailClientModel } from './model/retailClientModel';
import { bioInfoDefaultValue } from '../BiographicalInfo/model/bioInfoModel';
import FormFactory from '@/components/forms/FormFactory';
import { useEffect } from 'react';
import type { FormStep } from '@/types/Components/onboarding';
import { individualFormMetadata } from '../../../../config/individualFormMetadata';

enum ClientTypeCount {
	'Individual' = 1,
	'Joint Account' = 2,
}

export const RetailClient: FormStep = () => {
	const {
		formAction,
		form: { getValues, setValue },
	} = useKYCFormContext<IndividualFormSchema, typeof individualFormMetadata>();

	const [clientType, applicant] = getValues(['clientType', 'applicant']);

	if (!applicant) {
		setValue(
			'applicant',
			Array(ClientTypeCount[clientType ?? 1]).fill(bioInfoDefaultValue)
		);
	} else {
		setValue(
			'applicant',
			clientType === 'Individual'
				? [applicant[0]]
				: [applicant[0], bioInfoDefaultValue]
		);
	}

	useEffect(() => {
		if (clientType === 'Individual') {
			formAction({
				type: 'remove_step',
				stage: 'disclosures',
				step: 'signature mandate',
			});
		} else {
			formAction({ type: 'reset', stages: individualFormMetadata });
		}
	}, [clientType, formAction]);

	return (
		<>
			<FormHeader>
				<FormTitle>Retail Client</FormTitle>
			</FormHeader>
			<FormContent>
				<div className='space-y-[40px] py-5'>
					{retailClientModel.map((f) => (
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

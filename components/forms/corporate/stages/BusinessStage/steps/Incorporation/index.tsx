import type { FormStep } from '@/types/Components/onboarding';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/FormLayout';
import FormFactory from '@/components/FormFactory';
import { incorporationFields } from './model/incorporationFields';
import { FormFieldAggregator } from '@/components/forms/utils/FormFieldAggregator';
import { useKYCFormContext } from '@/components/forms/utils/formController';

export const Incorporation: FormStep = ({ countryList }) => {
	const {
		formVars: { brokerCode },
	} = useKYCFormContext();
	const rawFields = incorporationFields({ countryList });

	const aggregator = new FormFieldAggregator(rawFields);

	aggregator.modifyFields('KESTR', {
		remove: brokerCode !== 'KESTR',
	});

	const fields = aggregator.generate();

	return (
		<>
			<FormHeader>
				<FormTitle>Proof of Incorporation/Registration</FormTitle>
				<FormSubHeader>
					Enter the required proof of incorporation/registration below
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

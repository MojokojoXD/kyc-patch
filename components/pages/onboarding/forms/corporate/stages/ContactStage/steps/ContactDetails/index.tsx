import {
	FormHeader,
	FormContent,
	FormTitle,
} from '@/components/UIcomponents/FormLayout';
import { contactDetailsModel } from './model/contactDetailsFields';
import FormFactory from '@/components/UIcomponents/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';

export const ContactDetails: FormStep = ({ countryList }) => {
	const fields = contactDetailsModel({ countryList });

	return (
		<>
			<FormHeader>
				<FormTitle>Contact Details</FormTitle>
			</FormHeader>
			<FormContent>
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

import {
	FormHeader,
	FormContent,
	FormSubHeader,
	FormTitle,
} from '@/components/UIcomponents/FormLayout';
import { contactPersonModel } from './model/contactPersonModel';
import FormFactory from '@/components/UIcomponents/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';

export const ContactPerson: FormStep = ({ countryList }) => {
	const fields = contactPersonModel({ countryList });

	return (
		<>
			<FormHeader>
				<FormTitle>Contact Person</FormTitle>
				<FormSubHeader>
					Enter details for the company&apos;s contact person.
				</FormSubHeader>
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

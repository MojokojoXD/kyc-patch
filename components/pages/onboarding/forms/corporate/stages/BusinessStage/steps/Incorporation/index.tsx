import type { FormStep } from '@/types/Components/onboarding';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import FormFactory from '@/components/UIcomponents/FormFactory';
import { incorporationFields } from './model/incorporationFields';

export const Incorporation: FormStep = ({ countryList }) => {
	const rawFields = incorporationFields({ countryList });

	return (
		<>
			<FormHeader>
				<FormTitle>Proof of Incorporation/Registration</FormTitle>
				<FormSubHeader>
					Enter the required proof of incorporation/registration below
				</FormSubHeader>
			</FormHeader>
			<FormContent>
				{rawFields.map((f) => (
					<FormFactory
						key={f.name}
						{...f}
					/>
				))}
			</FormContent>
		</>
	);
};

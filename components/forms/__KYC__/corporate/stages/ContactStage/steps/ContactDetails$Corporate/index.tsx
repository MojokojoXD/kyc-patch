import { FormHeader, FormContent, FormTitle } from '@/components/forms/FormLayout';
import { contactDetailsModel$Corporate } from './model/contactDetailsModel$Corporate';
import FormFactory from '@/components/forms/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';

export const ContactDetails$Corporate: FormStep = ({ countryList }) => {
	const fields = contactDetailsModel$Corporate({ countryList });

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

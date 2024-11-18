import type { FormStep } from '@/types/Components/onboarding';
import { companyDetailsFields } from './model/companyDetailsFields';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/FormLayout';
import FormFactory from '@/components/FormFactory';

export const CompanyDetails: FormStep = ({ countryList }) => {
	const rawFields = companyDetailsFields({ countryList });

	return (
		<>
			<FormHeader>
				<FormTitle>Company/Business Details</FormTitle>
				<FormSubHeader>Enter details about your company/business</FormSubHeader>
			</FormHeader>
			<FormContent className='space-y-[46px]'>
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

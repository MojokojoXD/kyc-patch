import type { FormStep } from '@/types/Components/onboarding';
import { companyDetailsFields } from './model/companyDetailsFields';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import FormFactory from '@/components/UIcomponents/FormFactory';

export const CompanyDetails: FormStep = ( { countryList } ) =>
{
    const rawFields = companyDetailsFields( { countryList } )

	return (
		<>
			<FormHeader>
				<FormTitle>Company/Business Details</FormTitle>
				<FormSubHeader>
					Enter details about your company/business
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

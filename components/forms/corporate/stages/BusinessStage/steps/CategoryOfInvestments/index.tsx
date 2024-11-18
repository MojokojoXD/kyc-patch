import type { FormStep } from '@/types/Components/onboarding';
import { categoryOfInvestmentFields } from './model/categoryOfInvestmentsFields';
import { FormHeader, FormTitle, FormContent } from '@/components/FormLayout';
import FormFactory from '@/components/FormFactory';

export const CategoryOfInvestment: FormStep = () => {
	return (
		<>
			<FormHeader>
				<FormTitle>Category of Investment</FormTitle>
			</FormHeader>
			<FormContent>
				{categoryOfInvestmentFields.map((f) => (
					<FormFactory
						key={f.name}
						{...f}
					/>
				))}
			</FormContent>
		</>
	);
};

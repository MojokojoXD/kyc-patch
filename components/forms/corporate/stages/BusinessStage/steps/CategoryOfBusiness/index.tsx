import type { FormStep } from '@/types/Components/onboarding';
import { categoryOfBusinessFields } from './model/categoryOfBusinessFields';
import {
	FormHeader,
	FormSubHeader,
	FormTitle,
	FormContent,
} from '@/components/FormLayout';
import FormFactory from '@/components/FormFactory';

export const CategoryOfBusiness: FormStep = () => {
	return (
		<>
			<FormHeader>
				<FormTitle>Category of Business</FormTitle>
				<FormSubHeader>
					Select the category that best describes your business
				</FormSubHeader>
			</FormHeader>
			<FormContent>
				{categoryOfBusinessFields.map((f) => (
					<FormFactory
						key={f.name}
						{...f}
					/>
				))}
			</FormContent>
		</>
	);
};

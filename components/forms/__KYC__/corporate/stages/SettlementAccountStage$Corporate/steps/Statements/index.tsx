import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/forms/FormLayout';
import FormFactory from '@/components/forms/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';
import { statementsModel } from './model/statementsModel';

export const Statements: FormStep = () => {
	return (
		<>
			<FormHeader>
				<FormTitle>Statement Services & Preferences </FormTitle>
				<FormSubHeader>Enter the required information below.</FormSubHeader>
			</FormHeader>
			<FormContent>
				{statementsModel.map((f) => (
					<FormFactory
						key={f.name}
						{...f}
					/>
				))}
			</FormContent>
		</>
	);
};

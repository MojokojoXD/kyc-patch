import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/forms/FormLayout';
import FormFactory from '@/components/forms/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';
import { riskProfileModel$Corporate } from './model/riskProfileModel$Corporate';

export const RiskProfile$Corporate: FormStep = () => {
	return (
		<>
			<FormHeader>
				<FormTitle>Risk Profile</FormTitle>
				<FormSubHeader>Enter the required information below.</FormSubHeader>
			</FormHeader>
			<FormContent>
				{riskProfileModel$Corporate.map((f) => (
					<FormFactory
						key={f.name}
						{...f}
					/>
				))}
			</FormContent>
		</>
	);
};

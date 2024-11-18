import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/FormLayout';
import FormFactory from '@/components/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';
import { accountActivityModel } from './model/accountActivityModel';
import { BrokerCurrency } from '@/utils/vars/brokers';

export const AccountActivity: FormStep = () => {
	const currency = BrokerCurrency['DATAB']; // Still unsure of how to calculate this

	return (
		<>
			<FormHeader>
				<FormTitle>Expected Account Activity</FormTitle>
				<FormSubHeader>Enter the required information below.</FormSubHeader>
			</FormHeader>
			<FormContent>
				{accountActivityModel({ currency }).map((f) => (
					<FormFactory
						key={f.name}
						{...f}
					/>
				))}
			</FormContent>
		</>
	);
};

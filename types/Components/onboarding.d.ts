import type { Country } from '../forms/universal';
import type { FC, JSX } from 'react';
import type { BrokerDetails } from '../forms/broker';
import type { FormMetadata } from '@/pages/onboarding/individual';
import type { Dispatch } from 'react';
import type { FormReducerAction } from '@/components/PageComponents/onboarding/forms/individual/utils/formReducer';

type Steps = Pick<FormMetadata, 'steps'>['steps'][number];

export interface FormStepProps {
	applicantCount?: number;
	countryList?: Country[];
	broker?: Partial<BrokerDetails>;
	formAction: Dispatch<FormReducerAction>;
}

export type FormStep = FC<FormStepProps>;

export interface FormStageProps<TSteps> {
	renderStep: (tStepComponent: FormStep | null) => JSX.Element | null;
	step: TSteps;
}

export type FormStage<TSteps = Steps> = FC<FormStageProps<TSteps>>;

export interface SingleFormFieldsGeneratorProps {
	applicantId: number;
	broker?: Partial<BrokerDetails>;
	countryList?: Country[];
}

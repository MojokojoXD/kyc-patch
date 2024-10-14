import type { Country } from '../forms/universal';
import type { FC, JSX } from 'react';
import type { BrokerDetails } from '../forms/broker';
import type { FormMetadata } from '@/pages/onboarding/individual';


type Steps = Pick<FormMetadata,'steps'>['steps'][number]

export interface FormStepProps {
	applicantCount?: number;
	passCountryList?: (shouldPass: boolean) => Country[];
	passBrokerInfo?: (shouldPass: boolean) => BrokerDetails;
}

export type FormStep = FC<FormStepProps>;

export interface FormStageProps<TSteps> {
	renderStep: ((tStepComponent: FormStep | null) => JSX.Element);
    currentStepIndex: number;
    step: TSteps;
}

export type FormStage<TSteps = Steps> = FC<FormStageProps<TSteps>>;

export interface SingleFormFieldsGeneratorProps {
	applicantId: number;
	broker?: BrokerDetails;
	countryList?: Country[];
}

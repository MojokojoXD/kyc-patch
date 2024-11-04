import type { CountryList } from '../forms/common';
import type { FC, JSX } from 'react';
import type { FormAction } from '@/components/pages/onboarding/forms/utils/formReducer';

export interface FormStepProps {
	applicantCount?: number;
	countryList?: CountryList;
	clientID?: string;
	formAction?: FormAction;
}

export type FormStep = FC<FormStepProps>;

export interface FormStageProps<TSteps> {
	renderStep: (StepComponent: FormStep) => JSX.Element;
	step: TSteps;
}

export type FormStage<TSteps = string> = FC<FormStageProps<TSteps>>;

export interface SingleFormFieldsGeneratorProps {
	applicantId: number;
	countryList?: CountryList;
}

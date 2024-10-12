import type { Country,BankList } from '../forms/universal';
import type { FC,JSX } from 'react';
import type { BrokerDetails } from '../forms/broker';


export type StageInfo<TStep = number> = {
    step: TStep;
    finalStep: TStep;
}

export interface FormStepProps
{
    applicantCount?: number; 
    passCountryList?: ( shouldPass: boolean ) => Country[];
    passBrokerInfo?: ( shouldPass: boolean ) => BrokerDetails
}

export type FormStep = FC<FormStepProps>;

export interface FormStageProps<TStep> {
	renderStep: (
		step: StageInfo<TStep>,
        tStepComponent: FormStep | null
	) => JSX.Element;
	nextStage?: (step?: number) => Promise<void>;
	prevStage?: (step?: number) => void;
}

export type FormStage<TStep = number> = FC<FormStageProps<TStep>>;

export interface SingleFormFieldsGeneratorProps
{
    applicantId: number;
    broker?: BrokerDetails;
    countryList?: Country[];
}

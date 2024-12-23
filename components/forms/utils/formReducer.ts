import { Stack } from '@/utils/dataStructures/stack';
import type { Dispatch } from 'react';

export type Stages<TStage = string, TStep = string> = readonly {
	readonly name: TStage;
	readonly steps: readonly TStep[];
}[];


export interface FormReducerState<TStage = string, TStep = string>
{
	readonly currentStage: TStage;
	readonly currentStep: TStep;
	allStages: Stages;

	shouldValidate?: boolean;
}

export type FormReducerFn<
	TState = FormReducerState,
	TAction = FormReducerAction
> = (state: TState, action: TAction) => TState;

export type FormReducerAction<TStage = string, TStep = string> =
	| { type: 'next'; payload?: { shouldValidate?: boolean } }
	| { type: 'prev'; payload?: { shouldValidate?: boolean } }
	| {
			type: 'remove_step';
			stage: TStage;
			step: TStep;
	  }
	| { type: 'reset'; stages: Stages }
	| {
			type: 'jump_to_form_location';
			toStage: TStage;
			toStep?: TStep;
			payload?: { shouldValidate?: boolean };
	  };

export type FormAction<TStage = string, TStep = string> = Dispatch<
	FormReducerAction<TStage, TStep>
>;

export type DeriveFormSteps<TStages extends Stages = Stages> =
	TStages[number]['steps'][number];

export type DeriveFormStages<TStages extends Stages = Stages> =
	TStages[number]['name'];

export type FormComponentDict<
	TStepOrStage extends string | number | symbol = string
> = Partial<Record<TStepOrStage, JSX.Element>>;

/*

      logic that handles form navigation and it's state

*/

const historyTrace = new Stack<{
	stage: string;
	step: string;
	shouldValidate?: boolean;
}>();

export const formReducer: FormReducerFn = (state, action) => {
	const { currentStage, currentStep, allStages } = state;

	const currentStageIndex = allStages.findIndex((s) => s.name === currentStage);
	const currentSteps = allStages[currentStageIndex].steps;
	const currentStepIndex = currentSteps.findIndex((s) => s === currentStep);

	switch (action.type) {
		case 'next': {
			if (
				currentStageIndex === allStages.length - 1 &&
				currentStepIndex === currentSteps.length - 1
			)
				return state;

			historyTrace.push({
				stage: currentStage,
				step: currentStep,
				shouldValidate: false,
			});

			const nextStageIndex =
				currentStepIndex === currentSteps.length - 1
					? currentStageIndex + 1
					: currentStageIndex;
			const nextStepIndex =
				currentStepIndex === currentSteps.length - 1 ? 0 : currentStepIndex + 1;

			return {
				...state,
				currentStage: allStages[nextStageIndex].name,
				currentStep: allStages[nextStageIndex].steps[nextStepIndex],
			};
		}
		case 'prev': {
			if (historyTrace.size() === 0) return state;

			const prevStepInfo = historyTrace.pop();

			return {
				...state,
				currentStage: prevStepInfo!.stage,
				currentStep: prevStepInfo!.step,
				shouldValidate: false,
			};
		}
		case 'remove_step': {
			const clonedStages = [...allStages];

			const stageIndexToEdit = clonedStages.findIndex((s) => s.name === action.stage);

			if (stageIndexToEdit === -1)
				throw new Error('Stage ' + currentStage + ' is not supported');

			const editedSteps = clonedStages[stageIndexToEdit].steps.filter(
				(s) => s !== action.step
			);

			clonedStages[stageIndexToEdit] = {
				...clonedStages[stageIndexToEdit],
				steps: [...editedSteps],
			};

			return {
				...state,
				allStages: clonedStages,
			};
		}
		case 'reset':
			return {
				...state,
				allStages: action.stages,
			};
		case 'jump_to_form_location': {
			const nextStageName = action.toStage ?? currentStage;
			const nextStage = allStages.find((s) => s.name === nextStageName);
			const nextStepName = action.toStep ?? nextStage?.steps.at(0);

			if (!allStages.some((s) => s.name === nextStageName) || !nextStepName) {
				return state;
			}

			historyTrace.push({
				stage: currentStage,
				step: currentStep,
				shouldValidate: false,
			});

			return {
				...state,
				currentStage: nextStageName,
				currentStep: nextStepName,
				shouldValidate: action.payload?.shouldValidate,
			};
		}
		default:
			throw new Error('action type is not supported');
	}
};

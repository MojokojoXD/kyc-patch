import { Stack } from '@/utils/dataStructures/stack';
import type { Dispatch } from 'react';

//Form meta data for navigation components
export const individualFormMetadata = [
	{
		name: 'introduction',
		steps: ['instructions'],
	},
	{
		name: 'personal',
		steps: [
			'retail client',
			'category of investment',
			'personal information_personal',
			'contact details_personal',
			'employment information',
			'settlement bank account',
			'proof of identity_personal',
			'investment & risk profile',
			'review_personal',
		],
	},
	{
		name: 'next of kin',
		steps: [
			'personal information_next of kin',
			'contact details_next of kin',
			'proof of identity_next of kin',
			'review_next of kin',
		],
	},
	{
		name: 'disclosures',
		steps: [
			'signature upload',
			'customer ratification',
			'pep',
			'fatca',
			'kestrel capital - terms',
			'kestrel capital - nominee',
			'afrinvest - email indemnity',
			'declarations',
			'signature mandate',
			'afrinvest - privacy policy',
			'review_disclosures',
		],
	},
	{
		name: 'document upload',
		steps: ['checklist', 'review_document upload', 'submit'],
	},
] as const;

export type IndividualFormStages = typeof individualFormMetadata;

export type Stage = IndividualFormStages[number]['name'];
export type Step = IndividualFormStages[number]['steps'][number];

export interface FormReducerState {
	readonly currentStage: Stage;
	readonly currentStep: Step;
	allStages: IndividualFormStages;
}

// use this to generate more reducer function for other forms
export interface FormReducerFn<TState> {
	(state: TState, action: FormReducerAction): TState;
}

export type IndividualReducerFn = FormReducerFn<FormReducerState>;

type FormReducerAction =
	| { type: 'next' }
	| { type: 'prev' }
	| {
			type: 'remove_step';
			stage: Stage;
			step: Step;
	  }
	| { type: 'reset'; stages: IndividualFormStages }
	| {
			type: 'jump_to_form_location';
			toStage: Stage;
			toStep?: Step;
	  };

export type FormAction = Dispatch<FormReducerAction>;

const historyStack = new Stack<{ stage: Stage; step: Step }>();

export function formReducer(
	state: FormReducerState,
	action: FormReducerAction
): FormReducerState {
	const { currentStage, currentStep, allStages } = state;

	const currentStageIndex = allStages.findIndex(
		(s) => s.name === currentStage
	);
	const currentSteps = allStages[currentStageIndex].steps;
	const currentStepIndex = currentSteps.findIndex(
		(s) => s === currentStep
	);

	// const clonedStages = state.stages.map((s) => ({
	// 	...s,
	// 	steps: Array.from(s.steps),
	// }));

	switch (action.type) {
		case 'next': {
			if (
				currentStageIndex === allStages.length - 1 &&
				currentStepIndex === currentSteps.length - 1
			)
				return state;

			historyStack.push({ stage: currentStage, step: currentStep });

			const nextStageIndex =
				currentStepIndex === currentSteps.length - 1
					? currentStageIndex + 1
					: currentStageIndex;
			const nextStepIndex =
				currentStepIndex === currentSteps.length - 1
					? 0
					: currentStepIndex + 1;

			return {
				...state,
				currentStage: allStages[nextStageIndex].name,
				currentStep: allStages[nextStageIndex].steps[nextStepIndex],
			};
		}
		case 'prev': {
			if (historyStack.size() === 0) return state;

			const prevProgress = historyStack.pop();

			return {
				...state,
				currentStage: prevProgress!.stage,
				currentStep: prevProgress!.step,
			};
		}
		case 'remove_step': {
			const clonedStages = [...allStages];

			const stageIndexToEdit = clonedStages.findIndex(
				(s) => s.name === action.stage
			);

			const editedSteps = clonedStages[stageIndexToEdit].steps.filter(
				(s) => s !== action.step
			);

			if (stageIndexToEdit === -1)
				throw new Error('Stage ' + stage + ' is not supported');

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

			if (
				!allStages.some((s) => s.name === nextStageName) ||
				!nextStepName
			) {
				return state;
			}

			historyStack.push({
				stage: currentStage,
				step: currentStep,
			});

			return {
				...state,
				currentStage: nextStageName,
				currentStep: nextStepName,
			};
		}
		default:
			throw new Error('action type is not supported');
	}
}

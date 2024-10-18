import type { IndividualFormStages } from '@/pages/onboarding/individual';

export interface FormReducerState {
	readonly stageIndex: number;
	readonly stepIndex: number;
	stages: IndividualFormStages;
}

export interface FormReducerFn<TState> {
	(state: TState, action: FormReducerAction): TState;
}

export type FormReducerAction =
	| { type: 'next' }
	| { type: 'prev' }
	| { type: 'next_step' }
	| { type: 'prev_step' }
	| { type: 'prev_stage' }
	| { type: 'next_stage' }
	| {
			type: 'jump_to_form_location';
			toStage?: number;
			toStep?: number;
	  };

const isValidIndex = <T>(
	index: number | undefined,
	collection: readonly T[] | undefined
) =>
	(index && collection && typeof collection.at(index)) !== 'undefined';

export function formReducer<TState extends FormReducerState>(
	state: TState,
	action: FormReducerAction
): TState {
	const { stageIndex, stepIndex } = state;

	if (!isValidIndex(stageIndex, state.stages)) return state;

	if (!isValidIndex(stepIndex, state.stages[stageIndex].steps))
		return state;

	const clonedStages = state.stages.map((s) => ({
		...s,
		steps: Array.from(s.steps),
	}));

	switch (action.type) {
		case 'next': {
			const stepsCount = state.stages[stageIndex].steps.length;
			const stagesCount = state.stages.length;
			const nextStep = (stepIndex + 1) % stepsCount;

			return {
				...state,
				stages: clonedStages,
				stageIndex: nextStep === 0 ? stageIndex + 1 : stageIndex,
				stepIndex: stageIndex < stagesCount ? nextStep : stagesCount - 1,
			};
		}
		case 'prev': {
			const stepsCount = state.stages[stageIndex].steps.length;
			const nextStep = (stepIndex - 1) % stepsCount;

			return {
				...state,
				stages: clonedStages,
				stageIndex: nextStep < 0 ? stageIndex - 1 : stageIndex,
				stepIndex:
					nextStep < 0
						? state.stages[stageIndex - 1].steps.length - 1
						: nextStep,
			};
		}
		case 'next_stage': {
			return {
				...state,
				stages: clonedStages,
				stageIndex: stageIndex + 1,
			};
		}
		case 'prev_stage': {
			return {
				...state,
				stages: clonedStages,
				stageIndex: stageIndex - 1,
			};
		}
		case 'next_step': {
			return {
				...state,
				stages: clonedStages,
				stepIndex: stepIndex + 1,
			};
		}
		case 'prev_step': {
			return {
				...state,
				stages: clonedStages,
				stepIndex: stepIndex - 1,
			};
		}
		case 'jump_to_form_location': {
			const nextStage = action.toStage ?? stageIndex;
			const nextStep = action.toStep ?? stepIndex;

			if (
				!isValidIndex(nextStage, state.stages) ||
				!isValidIndex(nextStep, state.stages.at(nextStage)?.steps)
			) {
				return state;
			}

			return {
				...state,
				stages: clonedStages,
				stageIndex: nextStage,
				stepIndex: nextStep,
			};
		}
		default:
			throw new Error('action type is not supported');
	}
}

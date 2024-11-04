import {
	createContext,
	useContext,
	useReducer,
	useCallback,
	useMemo,
} from 'react';
import {
	type FormReducerFn,
	type FormReducerAction,
	type FormReducerState,
	type Stages,
	formReducer,
} from './formReducer';
import { UserContext } from '@/Contexts/UserProfileProvider';
import type { UseFormReturn, FieldValues } from 'react-hook-form';

export type KYCContextValue = ReturnType<typeof useKYCForm>;

export const KYCContext = createContext<KYCContextValue | null>(null);

export function useKYCFormContext<
	TSchema extends FieldValues  =  FieldValues,
	TStages extends Stages = Stages
>() {
	const context = useContext(KYCContext) as ReturnType<
		typeof useKYCForm<TSchema, TStages>
	>;

	if (!context) throw new Error('useKYCForm must be used within a KYC context');

	return context;
}

export function useKYCForm<
	TForm extends FieldValues,
	TStages extends Stages = Stages
>(stages: TStages, form: UseFormReturn<TForm>) {

	const [formNav, formAction] = useReducer(
        formReducer as FormReducerFn<
			FormReducerState<TStages[number]['name'], TStages[number]['steps'][number]>,
			FormReducerAction<TStages[number]['name'], TStages[number]['steps'][number]>
    >
        ,
		{
			currentStage: stages[0].name,
			currentStep: stages[0].steps[0],
			allStages: stages,
		}
	);

	const appWideContext = useContext(UserContext);

	const next = useCallback(async () => {
		if (await form.trigger(undefined, { shouldFocus: true })) {
            formAction({ type: 'next' });
        }
	}, [form]);

	const prev = useCallback(() => formAction({ type: 'prev' }), []);

	const KYCForm = useMemo(
		() => ({
			formNav,
			clientID: appWideContext?.onboardingFacts?.clientID || 'hello',
			formAction,
			form: form as  UseFormReturn<TForm>,
			next,
			prev,
		}),
		[appWideContext, formNav, next, prev, formAction,form]
	);

	return KYCForm;
}

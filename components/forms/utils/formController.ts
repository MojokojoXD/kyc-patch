import {
	createContext,
	useContext,
	useReducer,
	useCallback,
	useMemo,
	useState,
	useEffect,
} from 'react';
import {
	type FormReducerFn,
	type FormReducerAction,
	type FormReducerState,
	type Stages,
	formReducer,
} from './formReducer';
import type { UseFormReturn, FieldValues } from 'react-hook-form';
import { useRouter } from 'next/router';

type ParsedURLQuery = {
	c_id: string;
	b_code: string;
	submission: string;
};

export type KYCContextValue = ReturnType<typeof useKYCForm>;

export const KYCContext = createContext<KYCContextValue | null>(null);

// Custom hook for safe use of the KYC context object
export function useKYCFormContext<
	TSchema extends FieldValues = FieldValues,
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
  >( stages: TStages, form: UseFormReturn<TForm> )
{

  
  //Global error and loading state
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');



  //Reducer for handling form stage and step movement i.e next, prev, jump to step
	const [formNav, formAction] = useReducer(
		formReducer as FormReducerFn<
			FormReducerState<TStages[number]['name'], TStages[number]['steps'][number]>,
			FormReducerAction<TStages[number]['name'], TStages[number]['steps'][number]>
		>,
		{
			currentStage: stages[0].name,
			currentStep: stages[0].steps[0],
			allStages: stages,
		}
  );
  


  //collect broker info and client info from page url query params
	const router = useRouter();
	const urlQuery = router.query as ParsedURLQuery;



  /*
      Any component within the KYC context can toggle loading overlay to musk
      async operation or calculations that take time
  */
	const toggleLoading = useCallback(
		(toggle: boolean) => setIsLoading(toggle),
		[]
	);



  /* 
      Set global error stage form any component with KYC context to show critical failure.
  */
  const getError = useCallback( ( error: string ) => setError( error ), [] );
  



  // advance form one step
	const next = useCallback(async () => {
		if (await form.trigger(undefined, { shouldFocus: true })) {
      formAction({ type: 'next' });
    }
  }, [ form ] );
  


  // advance form one step backward
	const prev = useCallback(() => formAction({ type: 'prev' }), []);

  //effect to detect form vars in URL
	useEffect(() => {
		if (router.isReady) {
			if (urlQuery.c_id && urlQuery.b_code && urlQuery.submission) {
			} else {
				setError('missing or malformed client ID or broker code');
			}

			setIsLoading(false);
		}
	}, [router, urlQuery]);

  //All custom hook returns memoized to mitigate unnecessary rerenders
	return useMemo(
		() => ({
			formNav,
			formVars: {
				clientID: urlQuery.c_id ?? '',
				brokerCode: urlQuery.b_code ?? '',
				submissionID: urlQuery.submission ?? '',
			},
			formAction,
			form: form as UseFormReturn<TForm>,
			toggleLoading,
			getError,
			isLoading,
			error,
			next,
			prev,
		}),
		[
			formNav,
			next,
			prev,
			formAction,
			form,
			urlQuery,
			error,
			isLoading,
			getError,
			toggleLoading,
		]
	);
}

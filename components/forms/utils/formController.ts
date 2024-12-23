import {
	createContext,
	useContext,
	useReducer,
	useCallback,
	useMemo,
	useState,
	useEffect,
} from 'react';
import
  {
    type FormReducerAction,
    type FormReducerState,
	type FormReducerFn,
	type Stages,
	formReducer,
} from './formReducer';
import { type FieldValues, useForm, DefaultValues } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAsyncAction } from './customHooks/useAsyncAction';
import { getCountryList } from '@/utils/vars/countries';


type ParsedURLQuery = {
	c_id: string;
	b_code: string;
	submission: string;
};

// type SyncData<T> = T | Promise<T>;

type Action = () => void;

type KYCContextValue = ReturnType<typeof useKYCForm<never, never>>;

export const KYCContext = createContext<KYCContextValue | null>(null);

// Custom hook for safe use of the KYC context object
export function useKYCFormContext<
	TSchema extends FieldValues = FieldValues,
	TStages extends Stages = Stages
  >()
{
	const context = useContext(KYCContext) as ReturnType<typeof useKYCForm<TSchema,TStages>>;
	if (!context) throw new Error('useKYCForm must be used within a KYC context');

	return context;
}

//Reference to a function to be called when the form changes stages or steps
let actionBeforeFormNav: Action | null = null;

const invokeActionBeforeFormNav = async() =>
{
	actionBeforeFormNav?.call(undefined);
	actionBeforeFormNav = null;
};

export function useKYCForm<
	TForm extends FieldValues,
	TStages extends Stages = Stages
>(stages: TStages, formDefaultValues?: DefaultValues<TForm>) {
	//Global error and loading state
	const [globalLoading, setGlobalLoading] = useState(true);
  const [ globalError, setGlobalError ] = useState( '' );
  
  const form = useForm<TForm>( { mode: 'onChange', ...( typeof formDefaultValues !== 'undefined' && { defaultValues: formDefaultValues } ) });


	//Reducer for handling form stage and step movement i.e next, prev, jump to step
	const [formNav, formAction] = useReducer(
    formReducer as FormReducerFn<
      FormReducerState< typeof stages[number]['name'], typeof stages[number]['steps'][number]>,
      FormReducerAction< typeof stages[number]['name'], typeof stages[number]['steps'][number]>
    >,
		{
			currentStage: stages[0].name,
			currentStep: stages[0].steps[0],
			allStages: stages,
		}
	);

	//Fetch resources that are used across all forms here.
	const [countryList, isFetchingCountryList, countryListError] =
		useAsyncAction(getCountryList);

	//collect broker info and client info from page url query params
	const router = useRouter();
	const urlQuery = router.query as ParsedURLQuery;

	/*
      Any component within the KYC context can toggle loading overlay to musk
      async operation or calculations that take time
  */
	const toggleLoading = useCallback(
		(toggle: boolean) => setGlobalLoading(toggle),
		[]
	);

	/* 
      Set global error stage form any component with KYC context to show critical failure.
  */
	const setError = useCallback((error: string) => setGlobalError(error), []);

	//function to be invoked within next button click
	const onFormNav = (action: Action) => {
		actionBeforeFormNav = action;
	};

	// advance form one step
	const next = useCallback(async () => {
		await invokeActionBeforeFormNav();
    
		if (await form.trigger(undefined, { shouldFocus: true })) {
      formAction({ type: 'next' });
		}
	}, [form]);

	// advance form one step backward following the history trace. Eg: it will only go to the most recent step
	const prev = useCallback(async () => {
		await invokeActionBeforeFormNav();

		if (
			formNav.shouldValidate &&
			!(await form.trigger(undefined, { shouldFocus: true }))
		) {
			alert('To continue, please make sure all entries are valid!');
			return;
		}

		formAction({ type: 'prev' });
	}, [form, formNav.shouldValidate]);

	//jump to any part of the form given stage and step
	const goToFormLocation = useCallback(
		async (
			stage: typeof formNav.currentStage,
			step?: typeof formNav.currentStep
		) => {
			await invokeActionBeforeFormNav();

			if (
				formNav.shouldValidate &&
				!(await form.trigger(undefined, { shouldFocus: true }))
			) {
				alert('To continue, please make sure all entries are valid!');
				return;
			}

			formAction({
				type: 'jump_to_form_location',
				toStage: stage,
				toStep: step,
				payload: { shouldValidate: true },
			});
		},
		[formNav, form]
	);

	//effect to detect form vars in URL
	useEffect(() => {
		if (router.isReady) {
			if (urlQuery.c_id && urlQuery.b_code && urlQuery.submission) {
			} else {
				setGlobalError('missing or malformed client ID or broker code');
			}

			setGlobalLoading(false);
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
				countryList: countryList ?? [[],[]],
			},
			formAction,
			form,
			toggleLoading,
			setError,
			isLoading: globalLoading || isFetchingCountryList,
			error: globalError || countryListError.message,
			next,
			prev,
			onFormNav,
			goToFormLocation,
			actionBeforeFormNav,
		}),
		[
			formNav,
			next,
			prev,
			formAction,
			form,
			urlQuery,
			setError,
			toggleLoading,
			goToFormLocation,
			globalError,
			countryListError,
			globalLoading,
			isFetchingCountryList,
			countryList,
		]
	);
}

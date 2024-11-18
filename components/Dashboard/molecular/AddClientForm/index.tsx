import { useForm, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { SSXActionSuccess as ActionSuccess } from '@/components/CompoundUI/SSXActionSuccess';
import { Button } from '@/components/ui/button';
import { useAsyncAction } from '@/components/forms/utils/customHooks/useAsyncAction';
import { getCountryList } from '@/utils/vars/countries';
import { useState, useContext } from 'react';
import { addClientFormModel } from './model/addClientFormModel';
import FormFactory from '@/components/FormFactory';
import type { NewClientPayload } from './model/addClientForm';
import { DashboardContext } from '@/pages/dashboard';

enum AddClientFormSteps {
	Form = 1,
	ClientAdded = 2,
}

export function AddClientForm({
	actionBtnFn,
}: // acStep,
{
	actionBtnFn: () => void;
	acStep: (step: number) => void;
}) {
	const [countryList, isFetchingCountry, countryListError] =
		useAsyncAction(getCountryList);
	const userContext = useContext(DashboardContext);
	const form = useForm<NewClientPayload>({
		defaultValues: {
			clientFirstName: '',
			clientLastName: '',
			clientEmail: '',
			clientPhone: '',
			brokerID: userContext?.profile?.broker_id ?? '',
			typeOfClient: '',
		},
		mode: 'onChange',
	});

	const { handleSubmit } = form;

	const [isLoading, _setIsLoading] = useState(false);
	const [submitError, _setSubmitError] = useState('');
	const [step, _setStep] = useState<AddClientFormSteps>(AddClientFormSteps.Form);

	const submitHandler: SubmitHandler<NewClientPayload> = (payload) => {
		console.log(payload);
	};

	const aggregateLoadingState = isLoading || isFetchingCountry;
	const aggregateErrorState = countryListError.message || submitError;

	if (aggregateErrorState) {
		console.log(aggregateErrorState);
		return <p className='p-10'>Something went wrong!. Please try again later.</p>;
	}

	switch (step) {
		case AddClientFormSteps.Form:
			return (
				<Form {...form}>
					<form
						onSubmit={handleSubmit(submitHandler)}
						className='flex flex-col flex-1'>
						<div className='space-y-[40px]'>
							{addClientFormModel({ countryList }).map((f) => (
								<FormFactory
									key={f.name}
									{...f}
								/>
							))}

							<Button
								size='lg'
								className='w-full'
								type='submit'
								disabled={aggregateLoadingState}>
								Confirm
							</Button>
						</div>
					</form>
				</Form>
			);
		case AddClientFormSteps.ClientAdded:
			return (
				<div className='flex flex-col flex-1 items-center w-full'>
					<div className='flex flex-col flex-1 justify-center items-center'>
						<ActionSuccess headingText='Client Added!' />
					</div>
					<Button
						size='lg'
						onClick={actionBtnFn}>
						Sounds Good
					</Button>
				</div>
			);
		default:
			return null;
	}
}

import { useForm, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { SSXActionSuccess as ActionSuccess } from '@/components/CompoundUI/SSXActionSuccess';
import { Button } from '@/components/ui/button';
import { useAsyncAction } from '@/components/forms/utils/customHooks/useAsyncAction';
import { getCountryList } from '@/utils/vars/countries';
import { useState } from 'react';
import { addClientFormModel } from './model/addClientFormModel';
import FormFactory from '@/components/FormFactory';
import type { NewClientPayload } from './model/addClientForm';
import { useSession } from '@/components/Dashboard/hooks/useSession';

enum NewClientFormSteps {
	Form = 1,
	ClientAdded = 2,
}

interface NewClientFormProps {
	toggleSheet: () => void;
}

export function NewClientForm({ toggleSheet }: NewClientFormProps) {
	const [countryList, isFetchingCountry, countryListError] =
		useAsyncAction(getCountryList);

	const { profile } = useSession();
	const form = useForm<NewClientPayload>({
		defaultValues: {
			clientFirstName: '',
			clientLastName: '',
			clientEmail: '',
			clientPhone: '',
			brokerID: profile?.broker_id ?? '',
			typeOfClient: '',
		},
		mode: 'onChange',
	});

	const { handleSubmit } = form;

	const [isLoading, _setIsLoading] = useState(false);
	const [submitError, _setSubmitError] = useState('');
	const [step, _setStep] = useState<NewClientFormSteps>(NewClientFormSteps.Form);

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
		case NewClientFormSteps.Form:
			return (
				<>
					{step === NewClientFormSteps.Form && (
						<h6 className='heading6Bold absolute top-[32px]'>Add A New Client</h6>
					)}
					<Form {...form}>
						<form onSubmit={handleSubmit(submitHandler)}>
							<div className='space-y-[40px]'>
								{addClientFormModel({ countryList }).map((f) => (
									<FormFactory
										key={f.name}
										{...f}
									/>
								))}

								<Button
									className='w-full'
									type='submit'
									disabled={aggregateLoadingState}>
									Confirm
								</Button>
							</div>
						</form>
					</Form>
				</>
			);
		case NewClientFormSteps.ClientAdded:
			return (
				<div className='flex flex-col flex-1 items-center w-full'>
					<div className='flex flex-col flex-1 justify-center items-center'>
						<ActionSuccess headingText='Client Added!' />
					</div>
					<Button onClick={() => toggleSheet()}>Sounds Good</Button>
				</div>
			);
		default:
			return null;
	}
}

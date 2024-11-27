import { useForm, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { SSXActionSuccess as ActionSuccess } from '@/components/CompoundUI/SSXActionSuccess';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
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

	const { profile, request } = useSession<{ Status: 'SUCC' | 'FAIL' }>();
	const form = useForm<NewClientPayload>({
		defaultValues: {
			clientFirstName: '',
			clientLastName: '',
			clientEmail: '',
			clientPhone: [{ value: '', countryCode: 'GH' }],
			brokerID: profile?.broker_id ?? '',
			typeOfClient: '',
		},
		mode: 'onChange',
	});

	const { handleSubmit } = form;

	const [isLoading, setIsLoading] = useState(false);
	const [submitError, setSubmitError] = useState('');
	const [step, setStep] = useState<NewClientFormSteps>(NewClientFormSteps.Form);

	const submitHandler: SubmitHandler<NewClientPayload> = (payload) => {
		setIsLoading(true);

		//data transformation to match server schema;
		const newClient = {
			...payload,
			clientPhone: payload.clientPhone[0].value,
			typeOfClient:
				payload.typeOfClient === 'Individual or Joint'
					? 'Individual'
					: payload.typeOfClient,
		};

		request(
			{ url: 'kyc/broker/client', method: 'POST', data: newClient },
			function (res, error, status) {
				if (status === 'COMPLETED' && res?.Status === 'SUCC') {
					setStep(NewClientFormSteps.ClientAdded);
					setIsLoading(false);
				}

        if ( status === 'FAILED' )
        {
          setSubmitError( error as string );
          setIsLoading( false );
        };
			}
		);
	};

	const aggregateLoadingState = isLoading || isFetchingCountry;
  const aggregateErrorState = countryListError.message || submitError;
  
  const clientFormFields = countryList ? addClientFormModel( { countryList } ) : [];

	if (aggregateErrorState) {
		console.log(aggregateErrorState);
		return <p className='p-10'>Something went wrong!. Please try again later.</p>;
	}

	switch (step) {
		case NewClientFormSteps.Form:
			return (
				<>
					{step === NewClientFormSteps.Form && (
						<p className='paragraph2Medium absolute top-[32px]'>Add A New Client</p>
					)}
					<Form {...form}>
						<form onSubmit={handleSubmit(submitHandler)}>
							<div className='space-y-[40px] relative w-full'>
								{clientFormFields.map((f) => (
									<FormFactory
										key={f.name}
										{...f}
									/>
								))}

								<Button
									className='w-full'
									type='submit'
									disabled={aggregateLoadingState}>
									{isLoading ? (
										<Loader2 className='h-5 aspect-square ml-.5 animate-spin' />
									) : (
										'Confirm'
									)}
								</Button>
							</div>
						</form>
					</Form>
				</>
			);
		case NewClientFormSteps.ClientAdded:
			return (
				<div className='flex flex-col flex-1 items-center w-full h-full'>
					<div className='flex flex-col flex-1 justify-center items-center'>
						<ActionSuccess headingText='Client Added!' />
					</div>
					<Button className='w-full' onClick={() => toggleSheet()}>Sounds Good</Button>
				</div>
			);
		default:
			return null;
	}
}

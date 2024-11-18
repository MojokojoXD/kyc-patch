import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import type { PasswordResetResponse } from '@/types/server/password-reset';
import validator from 'validator';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SSXActionSuccess } from '@/components/CompoundUI/SSXActionSuccess';
import FormInput from '@/components/FormFactory/FactoryComponents/FormInput';
import * as PasswordResetLayout from '../components/home/layout';

enum PasswordResetStep {
	EmailForm,
	Success,
}

interface ResetPayload {
	email: string;
}

const ForgotPassword: NextPage = () => {
	const router = useRouter();
	const [resetStep, setResetStep] = useState<PasswordResetStep>(
		PasswordResetStep.EmailForm
	);
	const form = useForm<ResetPayload>({
		defaultValues: {
			email: '',
		},
		mode: 'onChange',
	});
	const { handleSubmit } = form;
	const [errMsg, setErrMsg] = useState('');
	const [loading, setLoading] = useState(false);

	const submitHandler: SubmitHandler<ResetPayload> = async (payload) => {
		try {
			setLoading(true);
			const res = await axios.post<PasswordResetResponse>(
				'/api/request-reset-code',
				payload
			);
			if (res.status === 200 && res.data.Status === 'SUCC') {
				setResetStep(PasswordResetStep.Success);
				setLoading(false);
			}

			throw new Error(res.data.Message, { cause: 'server-error' });
		} catch (error) {
			setLoading(false);
			if (error instanceof Error && error.cause === 'server-error') {
				setErrMsg(error.message);
				return;
			}

			if (axios.isAxiosError(error)) {
				console.log(error);
				setErrMsg('Something went wrong!. Please contact support.');
				return;
			}

			console.log(error);
			setErrMsg('Fatal Error, use browser console for more details');
		}
	};

	switch (resetStep) {
		case PasswordResetStep.EmailForm:
			return (
				<PasswordResetLayout.Layout>
					<Form {...form}>
						<form onSubmit={handleSubmit(submitHandler)}>
							<PasswordResetLayout.Main>
								<PasswordResetLayout.Header
									title='Forgot Password?'
									tagline="Enter your account's email address and we'll send you a link to reset your password."
								/>
								<PasswordResetLayout.Body error={errMsg}>
									<FormInput
										label=''
										componentProps={{
											errorPosition: 'relative',
										}}
										placeholder='Enter your email address'
										name={'email'}
										rules={{
											required: 'Please enter email address',
											validate: (v) =>
												(typeof v === 'string' && validator.isEmail(v)) ||
												'Email must be of the format: name@example.com',
										}}
									/>
								</PasswordResetLayout.Body>
								<PasswordResetLayout.Footer className='justify-end gap-[8px]'>
									<Button
										type='button'
										variant={'outline'}
										className='text-primary-500 hover:no-underline'
										onClick={() => router.replace('/')}>
										Cancel
									</Button>
									<Button
										type='submit'
										disabled={loading}>
										Send reset link
									</Button>
								</PasswordResetLayout.Footer>
							</PasswordResetLayout.Main>
						</form>
					</Form>
				</PasswordResetLayout.Layout>
			);
		case PasswordResetStep.Success:
			return (
				<PasswordResetLayout.Layout>
					<PasswordResetLayout.Main noLogo>
						<PasswordResetLayout.Header />
						<PasswordResetLayout.Body>
							<SSXActionSuccess
								headingText='Email on the way!'
								subText="We sent you instructions to reset your password. If it doesn't show up soon, check your spam folder."
							/>
						</PasswordResetLayout.Body>
						<PasswordResetLayout.Footer className='justify-center'>
							<Button
								onClick={() => {
									router.push('/');
								}}>
								Back to login
							</Button>
						</PasswordResetLayout.Footer>
					</PasswordResetLayout.Main>
				</PasswordResetLayout.Layout>
			);
		default:
			return null;
	}
};

export default ForgotPassword;

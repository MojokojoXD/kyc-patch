import { useState } from 'react';
import axios from 'axios';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { NextPage } from 'next';
import type { PasswordResetResponse } from '@/types/server/password-reset';
import validator from 'validator';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/forms/FormFactory/FactoryComponents/FormInput';
import FormPasswordInput from '@/components/forms/FormFactory/FactoryComponents/FormPasswordInput';
import { Button } from '@/components/ui/button';
import { SSXActionSuccess } from '@/components/ui/CompoundUI/SSXActionSuccess';
import { useRouter } from 'next/router';
import { CircleCheck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import * as NewPwdLayout from '../components/home/layout';

interface NewPwdPayload {
	newPwd: string;
	email: string;
	verificationCode: string;
}

enum NewPwdSteps {
	Form,
	Success,
}

const MAX_PWD_STRENGTH_SCORE = 50;

const SetNewPwd: NextPage = () => {
	const router = useRouter();
	const form = useForm<NewPwdPayload>({
		defaultValues: {
			email: '',
			newPwd: '',
			verificationCode: '',
		},
		reValidateMode: 'onChange',
	});
	const { handleSubmit, watch } = form;
	const [loading, setLoading] = useState(false);
	const [errMsg, setErrMsg] = useState('');
	const [newPwdStep, setNewPwdStep] = useState<NewPwdSteps>(NewPwdSteps.Form);

	const currentPwd = watch('newPwd');

	const pwdStrength: { [index: string]: number } = {
		'A minimum of 8 characters': currentPwd.length >= 8 ? 10 : 0,
		'One lowercase letter': /[a-z]/.test(currentPwd) ? 10 : 0,
		'One uppercase letter': /[A-Z]/.test(currentPwd) ? 10 : 0,
		'One number': /\d/.test(currentPwd) ? 10 : 0,
		'One special character': /\W/.test(currentPwd) ? 10 : 0,
	};

	const pwdStrengthScore = Object.values(pwdStrength).reduce((a, c) => a + c);
	const indicatorPercentage = (pwdStrengthScore / MAX_PWD_STRENGTH_SCORE) * 100;

	const submitHandler: SubmitHandler<NewPwdPayload> = async (payload) => {
		setLoading(true);
		const postPayload = {
			usrEmail: payload.email,
			usrVerifyCode: payload.verificationCode,
			usrNewPwd: payload.newPwd,
			usrConfPwd: payload.newPwd,
		};

		try {
			const res = await axios.post<PasswordResetResponse>(
				'/api/change-password',
				postPayload
			);

			if (res.status !== 200) {
				throw new Error(`Network response failed with status ${res.status}`);
			}

			if (res.data.Status === 'SUCC') {
				setNewPwdStep(NewPwdSteps.Success);
				return;
			} else throw new Error(res.data.Message, { cause: 'ssx-failure' });
		} catch (error) {

			if (error instanceof Error && error.cause === 'ssx-failure') {
				setErrMsg(error.message);
				return;
			}

			console.log(error);
			setErrMsg('Unable to complete request. Please try again later!');
    } finally
    {
      setLoading( false );
    }
	};

	switch (newPwdStep) {
		case NewPwdSteps.Form:
			return (
				<NewPwdLayout.Layout>
					<Form {...form}>
						<form onSubmit={handleSubmit(submitHandler)}>
							<NewPwdLayout.Main>
								<NewPwdLayout.Header
									title='Reset you password'
									tagline="Almost done. Enter your new password and we're good to go."
								/>
								<NewPwdLayout.Body error={errMsg}>
									<FormInput
										name={'email'}
										componentProps={{
                      classNames: { errorPosition: 'relative' },
										}}
										label=''
										placeholder='Enter email'
										rules={{
											required: 'Please enter email',
											validate: (v) =>
												validator.isEmail(v) ||
												'Email must be of the format: name@example.com',
										}}
									/>
									<FormInput
										label=''
										componentProps={{
                      classNames: { errorPosition: 'relative' },
										}}
										placeholder='Enter verification code'
										name={'verificationCode'}
										rules={{
											required: 'Please enter verification code',
										}}
									/>
									<FormPasswordInput
										label=''
										componentProps={{
                      classNames: { errorPosition: 'relative' },
										}}
										placeholder='Enter new password'
										name={'newPwd'}
										rules={{
											required: 'Please enter new password',
											validate: {
												noSpace: (v) => !/\s/g.test(v) || 'Password cannot contain spaces',
												pwdStrength: (v) =>
													validator.isStrongPassword(v, {
														pointsPerRepeat: 0,
														pointsPerUnique: 0,
													}) || 'Password is not strong enough',
											},
										}}
									/>
								</NewPwdLayout.Body>
								<Progress
									max={MAX_PWD_STRENGTH_SCORE}
									value={indicatorPercentage}
									className='h-1.5'
									indicatorStyle={cn(
										indicatorPercentage < 30
											? 'bg-error-500'
											: indicatorPercentage < 100
											? 'bg-warning-500'
											: 'bg-success-500'
									)}
								/>
								<div className='space-y-[8px]'>
									{Object.keys(pwdStrength).map((k) => (
										<p
											key={k}
											className='paragraph2Regular flex items-center'>
											<span className='mr-1.5'>
												<CircleCheck
													className={cn(
														'text-white',
														pwdStrength[k] > 0 ? 'fill-success-500' : 'fill-neutral-300'
													)}
												/>
											</span>
											{k}
										</p>
									))}
								</div>

								<NewPwdLayout.Footer className='justify-end space-x-[8px]'>
									<Button
										type='button'
										variant={'outline'}
										onClick={() => router.replace('/')}>
										Cancel
									</Button>
									<Button disabled={loading}>Save Password</Button>
								</NewPwdLayout.Footer>
							</NewPwdLayout.Main>
						</form>
					</Form>
				</NewPwdLayout.Layout>
			);
		case NewPwdSteps.Success:
			return (
				<NewPwdLayout.Layout>
					<NewPwdLayout.Main noLogo>
						<NewPwdLayout.Header />
						<NewPwdLayout.Body>
							<SSXActionSuccess
								headingText='Password reset successfully'
								subText='Your password has been updated and is secure.
        You can now login again'
							/>
						</NewPwdLayout.Body>
						<NewPwdLayout.Footer>
							<Button
								onClick={() => router.replace('/')}
								className='mx-auto'>
								Back to login
							</Button>
						</NewPwdLayout.Footer>
					</NewPwdLayout.Main>
				</NewPwdLayout.Layout>
			);
		default:
			return null;
	}
};
export default SetNewPwd;

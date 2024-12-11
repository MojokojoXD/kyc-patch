import { useState } from 'react';
import type { GetServerSideProps } from 'next';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useForm, type SubmitHandler } from 'react-hook-form';
import validator from 'validator';
import axios from 'axios';
import { LoginResponse } from '@/types/accounts/user';
import { useRouter } from 'next/router';
import * as HomeLayout from '../components/home/layout';
import FormInput from '@/components/forms/FormFactory/FactoryComponents/FormInput';
import FormPasswordInput from '@/components/forms/FormFactory/FactoryComponents/FormPasswordInput';
import { Loader2 } from 'lucide-react';

export const getServerSideProps = (async ({ req, res }) => {
	const profileCookie = req.cookies['securedRefreshtokenCookie'];
	const accessToken = req.cookies['token'];

	if (profileCookie && accessToken) {
		return {
			redirect: {
				permanent: true,
				destination: '/dashboard',
			},
		};
	}

	res.setHeader('Set-Cookie', `token=;expires=${new Date(0).toUTCString()}`);

	return { props: {} };
}) satisfies GetServerSideProps<Record<string, never>>;

export interface LoginCredentials {
	username: string;
	password: string;
}

const LOGIN_URI = 'api/dashboard/login';

export default function Home() {
	const router = useRouter();
	const form = useForm<LoginCredentials>({
		defaultValues: {
			username: '',
			password: '',
		},
		reValidateMode: 'onChange',
	});
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [networkError, setNetworkError] = useState<string | undefined>(undefined);

	//Ajax call to sign authorized user in and get authorization tokens
	const submitHandler: SubmitHandler<LoginCredentials> = async (data) => {
		setIsLoading(true);

		const axiosOptions = { withCredentials: true };

		try {
			const res = await axios.post<LoginResponse>(LOGIN_URI, data, axiosOptions);

			if (res.status === 200 && res.data.Status === 'SUCC') {
				router.push('/dashboard');
				return;
			}
			setNetworkError(res.data.Message);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<HomeLayout.Layout>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(submitHandler)}>
					<HomeLayout.Main>
						<HomeLayout.Header
							title='Login'
							tagline='Welcome back! Enter your details to access your account'
						/>
						<HomeLayout.Body error={networkError}>
							<FormInput
								name={'username'}
								componentProps={{
                  classNames: { errorPosition: 'relative' },
								}}
								label=''
								placeholder='Enter your email address'
								rules={{
									required: 'Please enter email',
									validate: (value) =>
										validator.isEmail(value) || 'Email must be of the format: name@example.com',
								}}
							/>
							<FormPasswordInput
								name={'password'}
								componentProps={{
                  classNames: { errorPosition: 'relative' },
								}}
								label=''
								placeholder='Enter password'
								rules={{
									required: 'Please enter password',
								}}
							/>
						</HomeLayout.Body>
						<HomeLayout.Footer>
							<Button
								type='button'
								variant={'link'}
								onClick={() => router.push('/forgot-password')}
								className='text-primary-500 paragraph2Medium hover:no-underline px-0'>
								Forgot Password?
							</Button>
							<Button
								disabled={isLoading}
								type={'submit'}>
								{isLoading ? (
									<span>
										<Loader2 className='animate-spin h-5 aspect-square' />
									</span>
								) : (
									'Login'
								)}
							</Button>
						</HomeLayout.Footer>
					</HomeLayout.Main>
				</form>
			</Form>
		</HomeLayout.Layout>
	);
}

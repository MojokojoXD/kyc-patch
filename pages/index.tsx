import { useState } from 'react';
import type { GetServerSidePropsContext } from 'next';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import validator from 'validator';
import axios from 'axios';
import { LoginResponse } from '@/types/accounts/user';
import { useRouter } from 'next/router';
import * as HomeLayout from '../components/home/layout';
import FormInput from '@/components/FormFactory/FactoryComponents/FormInput';
import FormPasswordInput from '@/components/FormFactory/FactoryComponents/FormPasswordInput';

export async function getServerSideProps({}: GetServerSidePropsContext) {
    
	// if (cookies.securedprofileCookie) {
	// 	return {
	// 		redirect: {
	// 			destination: '/dashboard',
	// 			permanent: false,
	// 		},
	// 	};
	// }

	return { props: {} };
}

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
	const [networkError, setNetworkError] = useState<string | undefined>(
		undefined
	);

	//Ajax call to sign authorized user in and get authorization tokens
	const submitHandler: SubmitHandler<LoginCredentials> = async (data) => {
		setIsLoading(true);

		const axiosOptions = { withCredentials: true };

		try {
			const res = await axios.post<LoginResponse>(LOGIN_URI, data, axiosOptions);

			if (res.status === 200 && res.data.Status === 'SUCC') {
				if (!res.data.profile) return;

				router.push(
					{
						pathname: '/dashboard',
						query: {
							token: res.data.token,
							profile: JSON.stringify(res.data.profile[0]),
						},
					},
					'/dashboard'
				);

				return;
			}

			setIsLoading(false);

			setNetworkError(res.data.Message);
		} catch (error) {
			console.log(error);

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
									errorPosition: 'relative',
								}}
								label=''
								placeholder='Enter your email address'
								rules={{
									required: 'Please enter email',
									validate: (value) =>
										validator.isEmail(value) ||
										'Email must be of the format: name@example.com',
								}}
							/>
							<FormPasswordInput
								name={'password'}
								componentProps={{
									errorPosition: 'relative',
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
								Next
							</Button>
						</HomeLayout.Footer>
					</HomeLayout.Main>
				</form>
			</Form>
		</HomeLayout.Layout>
	);
}

// const cookies = req.headers.cookie;
// if (cookies) {
//   const token = cookies.split("=")[1];
//   const tk = cookies.split("=")[0];
//   if (token && tk === "token") {
//     return {
//       redirect: {
//         destination: "/dashboard/broker",
//         permanent: false,
//       },
//     };
//   }
// }

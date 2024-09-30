import { useState } from 'react';
import type { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import {
	Form,
	FormField,
	FormControl,
	FormLabel,
	FormMessage,
	FormItem,
} from '@/components/UIcomponents/ui/form';
import { Input } from '@/components/UIcomponents/ui/input';
import { Button } from '@/components/UIcomponents/ui/button';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import validator from 'validator';
import axios from 'axios';
import { BASE_URL } from '@/utils/vars/uri';
import { LoginResponse } from '@/types/accounts/user';
import { useRouter } from 'next/router';
import { LoaderCircle } from 'lucide-react';

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
	const cookies = req.cookies;

	if (cookies.token && cookies.tk === 'token') {
		return {
			redirect: {
				destination: '/dashboard/broker',
				permanent: false,
			},
		};
	}

	return { props: {} };
}

interface LoginCredentials {
	username: string;
	password: string;
}

const LOGIN_URI = BASE_URL + '/login';

export default function Home() {
	const router = useRouter();
	const form = useForm<LoginCredentials>({
		defaultValues: {
			username: '',
			password: '',
		},
		reValidateMode: 'onSubmit',
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
			const res = await axios.post<LoginResponse>(
				LOGIN_URI,
				data,
				axiosOptions
			);

			if (res.status === 200 && res.data.Status === 'SUCC') {
				//?? needs clarification on why cookies are set client side
				document.cookie = `token=${res.data.token}`;

				if (!res.data.profile) return;

				//?? use profile in local storage could be a security vulnerability
				localStorage.setItem('user', JSON.stringify(res.data.profile[0]));

				router.push('/dashboard');

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
		<div className='w-screen h-screen flex flex-col justify-center items-center'>
			<div className='flex flex-col items-center w-full h-full p-5'>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(submitHandler)}
						className='w-[510px] flex flex-col justify-center mt-[144px] mb-5 mx-5 bg-white py-16 md:px-10 my-10 space-y-10'>
						<h1 className='text-3xl font-semibold mx-auto'>Login</h1>
						<div className='space-y-5'>
							<FormField
								control={form.control}
								name={'username'}
								rules={{
									required: 'Email cannot be empty',
									validate: (value) =>
										validator.isEmail(value) ||
										'Invalid email format. Email must be of the format: johnsmith@mail.com',
								}}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={'password'}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												{...field}
												type='password'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Button
							disabled={isLoading}
							variant={'default'}
							size={'lg'}
							className='w-full'
							type={'submit'}>
							{isLoading ? <LoaderCircle className='animate-spin' /> : 'Login'}
						</Button>

						<div className='text-center mt-[12px]'>
							<Link
								href='/forgot-password'
								className='text-primary-500 paragraph2Medium'>
								Forgot Password
							</Link>
						</div>
						{networkError && (
							<p className='text-error-500 mt-3 mx-auto'>{networkError}</p>
						)}
					</form>
				</Form>
			</div>
		</div>
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

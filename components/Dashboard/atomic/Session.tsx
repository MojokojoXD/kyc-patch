import {
	sessionContext,
	type SessionContextSchema,
} from '../_contexts/sessionContext';
import { type ReactNode, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import type { BaseSSXResponse } from '@/types/server/SSX';
import { type Method, AxiosError } from 'axios';
import { protectedAxiosInstance } from '@/lib/http/axios';

interface SessionProviderProps extends Pick<SessionContextSchema, 'profile'> {
	token: string;
	children: ReactNode;
}

export function Session({ children, token, profile }: SessionProviderProps) {
	const router = useRouter();
	const [isLoggedIn, _setIsLoggedIn] = useState(
		() =>
			(typeof sessionStorage !== 'undefined' &&
				sessionStorage?.getItem('token') !== undefined) ||
			token !== ''
	);
	const [userProfile, _setUserProfile] = useState<typeof profile>(profile);

	const request = useCallback(
		async <T extends BaseSSXResponse>(
			url: string,
			method: Method,
			data?: { [index: string]: unknown }
		) => {
			const accessToken = sessionStorage.getItem('token') ?? token;
			try {
				const res = await protectedAxiosInstance.request<T>({
					url,
					method,
					data,
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});

				if (res.status === 200) return res.data;
			} catch (error) {
				if (error instanceof AxiosError && error.status === 401) {
					const res = protectedAxiosInstance.request<T>({
						url: 'refresh',
					});

					console.log(res);
				}
			}
		},
		[token]
	);

	const logout = useCallback(() => {
		sessionStorage.removeItem('token');
		router.replace('/');
	}, [router]);

	useEffect(() => {
		(() => {
			if (token) {
				sessionStorage.setItem('token', token);
				return;
			} else if (!sessionStorage.getItem('token')) logout();
		})();
	}, [logout, token]);

	return (
		<sessionContext.Provider
			value={{
				profile: userProfile,
				isLoggedIn,
				request,
				logout,
			}}>
			{children}
		</sessionContext.Provider>
	);
}

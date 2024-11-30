import { BASE_URL } from '@/utils/vars/uri';
import axios, { type Method } from 'axios';
// import { BASE_URL } from '@/utils/vars/uri';
export const protectedAxiosInstance = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
	validateStatus(status) {
		return status === 200 || status === 401 || status === 304;
	},
	timeout: 30_000,
	headers: {
		'Content-Type': 'application/json',
	},
	timeoutErrorMessage:
		'Request failed because the connection timed out. Check you internet connection.',
});

interface ProtectedServerRequestParams {
	endpoint: string;
	method: Method;
	securityHeaders: Partial<{ [index: string]: string }>;
	data?: unknown;
}

let refreshTokenRetries = 3;

export async function protectedServerRequest({
	endpoint,
	method,
	securityHeaders,
	data,
}: ProtectedServerRequestParams): Promise<
	[unknown, string | null ] | string
  >
{
  //covert the record of cookie headers from the request into a single string and remove the token cookie
	const securityCookies = Object.keys(securityHeaders).reduce(
	(prevKey, currentKey) =>
		currentKey !== 'token'
			? prevKey +
			  `${currentKey}=${securityHeaders[currentKey]};`
			: prevKey,
	''
);

	try {
		//initial request which is configured not to throw an error if response is 200, 304 or 401
		const res = await protectedAxiosInstance({
			url: endpoint,
			method,
			data: method === 'POST' ? data : undefined,
			headers: {
				cookie: securityCookies,
				Authorization: `Bearer ${securityHeaders['token']}`,
			},
		});

		if (res.status === 200) {
      // request is successful. We return the data property.
			return [res.data, null];
		}

    let newAccessToken: string = '';
    let newSecurityCookies: string = ''

		while (refreshTokenRetries > 0) {
			// try to get a new access token from refresh token endpoint
			const retryRes = await protectedAxiosInstance({
				url: '/refresh-token',
				method: 'GET',
				headers: {
					cookie: `securedRefreshtokenCookie=${securityHeaders['securedRefreshtokenCookie']};`,
				},
			});

			if (retryRes.status === 200) {
        newAccessToken = retryRes.data.token;
        newSecurityCookies = (retryRes.headers[ 'set-cookie' ] as string[]).reduce(( a, c ) => a + ';' + c);
				break;
			}

			refreshTokenRetries--;

			if (refreshTokenRetries === 0) return 'failed to refresh access token'; // return if we don't get a new access token
		}

		// use new access token to retry the initial request

		const resentRequest = await protectedAxiosInstance({
			url: endpoint,
			method,
			data,
			headers: {
				cookie: newSecurityCookies,
				Authorization: `Bearer ${newAccessToken}`,
			},
		});

		if (resentRequest.status === 200)
			return [resentRequest.data, newSecurityCookies + `token=${newAccessToken};Same-Site=Strict;Secure;HttpOnly;Path=/` ];

		throw resentRequest
	} catch (error) {
		console.log(error);
		return 'critical error reaching ssx servers';
	}
}

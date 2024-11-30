import axios, { type Method } from 'axios';
// import { BASE_URL } from '@/utils/vars/uri';
export const protectedAxiosInstance = axios.create({
	baseURL: '/api/dashboard/proxy/',
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
	securityHeaders: { [index: string]: string };
	data?: unknown;
}

let refreshTokenRetries = 3;

export async function protectedServerRequest({
	endpoint,
	method,
	securityHeaders,
	data = {},
}: ProtectedServerRequestParams) {
	const securityCookies = Object.keys(securityHeaders).reduce(
		(prevKey, currentKey) =>
			currentKey !== 'token'
				? (prevKey as string) + `${currentKey}=${securityHeaders[currentKey]};`
				: '',
		''
	);

	try {
		//initial request which is configured not to throw an error if response is 200, 304 or 401
		const res = await protectedAxiosInstance({
			url: endpoint,
			method,
			data,
			headers: {
				cookie: securityCookies,
				Authorization: `Bearer ${securityHeaders['token']}`,
			},
		});

		if (res.status === 200) {
			// request is successful. We return the data property.
			return [res.data, res.headers];
		}

		let newAccessToken: string = '';

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
				cookie: securityCookies,
				Authorization: `Bearer ${newAccessToken}`,
			},
		});

		if (resentRequest.status === 200)
      return [ resentRequest.data, { ...securityHeaders, token: newAccessToken } ];
    
    return 'unknown error trying to resend initial request';
  } catch ( error )
  {
    console.log( error );
    return 'critical error reaching ssx servers';
  }
}

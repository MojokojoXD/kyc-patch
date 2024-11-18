import axios from 'axios'
export const protectedAxiosInstance = axios.create( {
	baseURL: '/api/dashboard/',
	withCredentials: true,
	timeout: 30_000,
	timeoutErrorMessage:
		'Request failed because the connection timed out. Check you internet connection.',
});

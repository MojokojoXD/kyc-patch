import axios from 'axios'
export const protectedAxiosInstance = axios.create( {
	baseURL: '/api/dashboard/proxy',
    withCredentials: true,
    validateStatus( status )
    {
        return status === 200 || status === 401 || status === 304;
    },
    timeout: 30_000,
    headers: {
        common: {
            'Content-Type': 'application/json'
        }
    },
	timeoutErrorMessage:
		'Request failed because the connection timed out. Check you internet connection.',
});

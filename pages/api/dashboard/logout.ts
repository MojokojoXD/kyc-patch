import type { NextApiHandler } from 'next';
import { protectedAxiosInstance } from '@/lib/http/axios';
import { AxiosError } from 'axios';
import { BASE_URL } from '@/utils/vars/uri';

const LOGOUT_ENDPOINT = BASE_URL + '/logout';

const handler: NextApiHandler = async (req, res) => {
	try {
		const token = req.cookies['token'];
		const ssxRes = await protectedAxiosInstance.post<{
			Status: 'OK';
		}>(
			LOGOUT_ENDPOINT,
			{},
			{
				baseURL: '',
				headers: {
					cookie: req.headers.cookie,
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (ssxRes.status === 200 && ssxRes.data.Status === 'OK') {
			const newCookies = [
				...ssxRes.headers['set-cookie']!,
				`token=;expires=${new Date(0).toUTCString()};Path=/`,
			];
			res.setHeader('Set-Cookie', newCookies);  
			res.status(200).json(ssxRes.data);
			return;
		}

		res.status(ssxRes.status).json(ssxRes.data);
	} catch (error) {
		console.log(error);
		if (error instanceof AxiosError) {
			res
				.status(error.status as number)
				.json({ Status: 'FAIL', Message: error.message });
			return;
		}

		res.status(500).json({ Status: 'FAIL', Message: 'critical failure on server' });
	}
};

export default handler;

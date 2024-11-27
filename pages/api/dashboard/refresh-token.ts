import type { NextApiHandler } from 'next';
import { protectedAxiosInstance } from '@/lib/http/axios';
import { AxiosError } from 'axios';
import { BASE_URL } from '@/utils/vars/uri';

const REFRESH_TOKEN_ENDPOINT = BASE_URL + '/refresh-token';

const handler: NextApiHandler = async (req, res) => {
	try {
		const ssxRes = await protectedAxiosInstance.get<{
			Status: 'SUCC' | 'FAIL';
			token: string;
		}>(REFRESH_TOKEN_ENDPOINT, {
			headers: {
				cookie: req.headers.cookie,
			},
		});

		if (ssxRes.status === 200 && ssxRes.data.Status === 'SUCC') {
			const newCookies = ssxRes.headers['set-cookie']!.push(
				`token=${ssxRes.data.token};HttpOnly;Secure;SameSite-String;`
			);
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

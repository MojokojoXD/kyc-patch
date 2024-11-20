import type { NextApiHandler } from 'next';
import { protectedAxiosInstance } from '@/lib/http/axios';
import { AxiosError } from 'axios';
import { BASE_URL } from '@/utils/vars/uri';

const USER_PROFILE_ENDPOINT = BASE_URL + '/users/self';

const handler: NextApiHandler = async (req, res) => {
    try
    {
		const ssxRes = await protectedAxiosInstance.get( USER_PROFILE_ENDPOINT, {
            headers: {
				cookie: req.headers.cookie,
			},
		});

		if (ssxRes.status === 200) {
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

		res
			.status(500)
			.json({ Status: 'FAIL', Message: 'critical failure on server' });
	}
};

export default handler;

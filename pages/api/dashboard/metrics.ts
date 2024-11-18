import type { NextApiHandler } from 'next';
import { protectedAxiosInstance } from '@/lib/http/axios';
import { BASE_URL } from '@/utils/vars/uri';

const METRICS_URL = BASE_URL + '/kyc/dashboard/metrics';

const handler: NextApiHandler = async (req, res) => {
	try {
		const ssxServerRes = await protectedAxiosInstance.get(METRICS_URL, {
			headers: {
				Authorization: req.headers.authorization,
			},
		});

		if (ssxServerRes.status === 200 && ssxServerRes.data.Status === 'SUCC') {
			res.status(200).json(ssxServerRes.data);
		}

		res.status(ssxServerRes.status).json(ssxServerRes.data);
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ Status: 'FAIL', Message: 'Critical failure in the server' });
	}
};

export default handler;

import type { NextApiHandler } from 'next';
import axios from 'axios';
import { BASE_URL } from '@/utils/vars/uri';

const handler: NextApiHandler = async (req, res) => {
	const body = req.body;

	try {
		const ssxResponse = await axios.patch(`${BASE_URL}/kyc/reset-pwd`, body);

		if (ssxResponse.status === 200) {
			res.status(200).json(ssxResponse.data);
			return;
		}

		res.status(ssxResponse.status).json(ssxResponse.data);
	} catch (error) {
		res.status(500);

		if (axios.isAxiosError(error)) {
			res.json({ Status: 'FAIL', Message: 'failed to contact ssx servers' });
			return;
		}

		res.json({ Status: 'FAIL', Message: 'critical server error' });
	}
};

export default handler;

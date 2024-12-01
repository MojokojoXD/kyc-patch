import type { NextApiHandler } from 'next';
import { AxiosError } from 'axios';

const handler: NextApiHandler = async (req, res) => {
	try {
		const expiredCookies = Object.keys(req.cookies).map(
			(k) => `${k}=;expires=${new Date(0).toUTCString()};Path=/`
		);

		const newCookies = [...expiredCookies];
		res.setHeader('Set-Cookie', newCookies);
		res.status(200).json({ Status: 'SUCC', Message: 'user logged out' });
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

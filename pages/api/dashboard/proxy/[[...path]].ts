import type { NextApiHandler } from 'next';
import { protectedAxiosInstance } from '@/components/Dashboard/lib/http/axios';
import { BASE_URL } from '@/utils/vars/uri';
import { AxiosError } from 'axios';

const handler: NextApiHandler = async (req, res) => {
	const { path } = req.query;

  const ssxURL = BASE_URL + '/' + ( path as string[] ).join( '/' );
  
  const authToken = req.cookies[ 'token' ] ?? '';

	try {
		const ssxServerRes = await protectedAxiosInstance({
			url: ssxURL,
			method: req.method,
			data: req.method === 'POST' ? req.body : undefined,
			headers: {
        cookie: req.headers.cookie,
        'Authorization': `Bearer ${authToken}`
			},
		});

		if (ssxServerRes.status === 200) {
			res.setHeader('Set-Cookie', ssxServerRes.headers['set-cookie'] as string[]);
			res.status(200).json(ssxServerRes.data);
			return;
		}

		res.status(ssxServerRes.status).json(ssxServerRes.data);
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

import type { NextApiHandler } from 'next';
import { protectedAxiosInstance } from '@/lib/http/axios';
import { BASE_URL } from '@/utils/vars/uri';
import { AxiosError } from 'axios';

const ALL_CLIENTS_URL = BASE_URL + '/kyc/dashboard/getall';

const handler: NextApiHandler = async ( req, res ) =>
{
    
    const { path } = req.query;
	const pathParts = (req.url as string).split('/');
	const sliceEndIndex = pathParts.findIndex((segment) => segment === 'proxy');

    const ssxURL = BASE_URL + '/' + ( path as string[] ).join( '/' );

	try {
		const ssxServerRes = await protectedAxiosInstance({
			url: ssxURL,
			method: req.method,
			data: req.method === 'POST' ? req.body : undefined,
			headers: {
				cookie: req.headers.cookie,
			},
		});

		if (ssxServerRes.status === 200) {
			res.status(200).json(ssxServerRes.data);
			return;
		}
		res.status(ssxServerRes.status).json(ssxServerRes.data);
	} catch (error) {
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

import type { NextApiHandler } from 'next';
import type { LoginResponse } from '@/types/accounts/user';
import axios from 'axios';
import { BASE_URL } from '@/utils/vars/uri';

const defaultResponse: LoginResponse = {
	Status: 'FAIL',
	Message: 'failed to contact SSX servers',
	profile: [],
	Code: '',
	token: '',
}; 

const handler: NextApiHandler<LoginResponse> = async (req, res) => {
	const body = req.body;

	try {
		const ssxServerRes = await axios.post<LoginResponse>(
			BASE_URL + '/login',
			body,
			{
				withCredentials: true,
			}
		);

        if ( ssxServerRes.status === 200 && ssxServerRes.data.Status === 'SUCC' )
        {
            const ssxCookies = ssxServerRes.headers[ 'set-cookie' ];
            
			Array.isArray(ssxCookies) && res.setHeader('Set-Cookie', [ ...ssxCookies ] );
            
			res.status(200).json(ssxServerRes.data);
		}

		res.status(ssxServerRes.status).json({ ...defaultResponse, Message: 'SSX servers unable to process request'});
    } catch ( error )
    {
        res.status( 500 );
		if (axios.isAxiosError(error)) {
            res.json( { ...defaultResponse, Message: 'Unable to reach SSX servers' } );
            return;
        }
        
        res.json({ ...defaultResponse, Message: 'API route experienced unknown error' })
	}
};

export default handler;

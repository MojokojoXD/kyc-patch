import type { NextApiHandler } from 'next';
import { BASE_URL } from '@/utils/vars/uri';
import axios from 'axios';

const handler: NextApiHandler = async (req, res) => {
	if (req.method !== 'POST') {
		res.status(400).json({ Status: 'FAIL', Message: 'bad request' });
		return;
	}

	const body: { email: string } = req.body;

	try {
		const ssxServerRes = await axios.patch(
			`${BASE_URL}/kyc/forgot-pwd`,
			{ usrEmail: body.email },
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Accept-Language': 'en',
					'X-App-Identifier': 'kyc',
				},
			}
        );
        
        if ( ssxServerRes.status === 200 )
        {
            res.status( 200 ).json( ssxServerRes.data );
            return;
        }

        res.status( ssxServerRes.status ).json( ssxServerRes.data )

    } catch ( error )
    {
        res.status( 500 );

        if ( axios.isAxiosError( error ) )
        {
            res.json( { Status: 'FAIL', Message: 'failed to contact ssx servers' } );
            return
        }

        res.json( { Status: 'FAIL', Message: 'critical server error' } )

    }
};

export default handler;

import type { NextApiHandler } from 'next';
import axios from 'axios';

const handler: NextApiHandler = async (req, res  ) => {
	const body = req.body;

	try {
		const ssxRes = await axios.post(
			'https://kycapi.dev.secondstax.com/kyc/client/submit/ind',

			JSON.parse( body )
        );
        
        if ( ssxRes.status === 200 )
        {
            console.log( ssxRes.data )
        }
        res.status( ssxRes.status ).json( ssxRes.data )
    } catch ( error )
    {
        // if ( axios.isAxiosError( error ) )
        console.log( error );
        res.status( 500 ).send( 'some error' )
    }
};


export default handler;
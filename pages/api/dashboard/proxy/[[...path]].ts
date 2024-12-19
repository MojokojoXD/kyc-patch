import type { NextApiHandler } from 'next';
import { protectedServerRequest } from '@/components/Dashboard/lib/http/axios';
import { AxiosError,Method } from 'axios';

const handler: NextApiHandler = async (req, res) => {
	const { path } = req.query;

  const ssxURL = '/' + ( path as string[] ).join( '/' );

	try {
		const ssxServerRes = await protectedServerRequest({
			endpoint: ssxURL,
			method: <Method>req.method,
			data: req.method === 'POST' ? req.body : undefined,
			securityHeaders:  req.cookies,
    } );
    
    if ( typeof ssxServerRes !== 'string' )
    {
      const [ data, headers ] = ssxServerRes;

      if ( headers )
      {
        res.setHeader('Set-Cookie', headers);      
      }

			res.status(200).json(data);
			return;
		}

    res.statusMessage = ssxServerRes
    res.status( 400 ).send( ssxServerRes );
    
	} catch (error) {
		
    if ( error instanceof AxiosError )
    {
      console.log( error.response )
			res
				.status(error.status as number)
				.json({ Status: 'FAIL', Message: error.message });
			return;
		}

		res.status(500).json({ Status: 'FAIL', Message: 'critical failure on server' });
	}
};

export default handler;

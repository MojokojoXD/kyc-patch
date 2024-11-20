import type { NextApiHandler } from "next";
import { protectedAxiosInstance } from "@/lib/http/axios";
import { AxiosError } from "axios";
import { BASE_URL } from "@/utils/vars/uri";

const REFRESH_TOKEN_ENDPOINT = BASE_URL + '/refresh-token';

const handler: NextApiHandler = async( req, res  ) =>
{
    try
    {
        const ssxRes = await protectedAxiosInstance.get( REFRESH_TOKEN_ENDPOINT, {
            headers: {
                'cookie': req.headers.cookie
            }
        } );

        if ( ssxRes.status === 200 )
        {
            const newTokenCookies = ( ssxRes.headers[ 'set-cookie' ] as string[] ).map( c =>
            {
                    return c + ';Max-Age=1800';
            });
            
            res.setHeader( 'Set-Cookie', newTokenCookies )
            res.status( 200 ).json( ssxRes.data );
            return;
        }

        res.status( ssxRes.status ).json( ssxRes.data );
        
    } catch ( error )
    {
        console.log( error )
        if ( error instanceof AxiosError )
        {
            res.status( error.status as number ).json( {Status: 'FAIL', Message: error.message} );
            return;
        }

        res.status( 500 ).json( { Status: 'FAIL', Message:'critical failure on server' } )

        
    }
};


export default handler;
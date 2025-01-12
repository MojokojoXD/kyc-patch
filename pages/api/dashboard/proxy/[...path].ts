import { createProxyMiddleware,fixRequestBody } from 'http-proxy-middleware';
import { BASE_URL } from '@/utils/vars/uri';
import type { NextApiHandler } from 'next';


const proxy = createProxyMiddleware( {
  target: BASE_URL,
  secure: true,
  changeOrigin: true,
  pathRewrite: { '^/api/dashboard/proxy': '' },
} );

const handler: NextApiHandler = async( req, res ) =>
{
  proxy( req, res, ( err ) =>
  {
    if ( err ) console.log( err )
    
    res.status( 500 ).send( `${ req.url } cannot be proxied` );
  } )
}

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  }
};


export default handler;
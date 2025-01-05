import { createProxyMiddleware,responseInterceptor } from 'http-proxy-middleware';
import { BASE_URL } from '@/utils/vars/uri';
import type { NextApiHandler } from 'next';


const proxy = createProxyMiddleware( {
  target: BASE_URL,
  secure: true,
  changeOrigin: true,
  pathRewrite: { '^/api/dashboard/proxy': '' },
  selfHandleResponse: true,
  on: {
    proxyReq: ( proxReq, req, res ) =>
    {
        console.log( proxReq.getHeaders() )
    },
    proxyRes: responseInterceptor( async ( buff, proxyRes, req, _res ) =>
    {
      if ( proxyRes.statusCode === 401 )
      {
      }
      return buff;
    } ),
    error: ( err, req, res ) =>
    {
        console.log( err )
    } 
  }
} );

const handler: NextApiHandler = async( req, res ) =>
{
  proxy( req, res, ( err ) =>
  {
    if( err ) console.log( err )
    console.log( req.statusCode )
    res.status(200).send('here')
  } )
  
}

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  }
};


export default handler;
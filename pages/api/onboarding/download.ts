// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { BASE_URL } from '@/utils/vars/uri';

const SIGNATURE_DOWNLOAD_URL = BASE_URL + '/download';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Buffer | { message: string; }>
) {
	if (req.method !== 'GET') {
		res.status(400).send({message: ""});
	}

    const { file } = req.query;
    try
    {
        if ( !file )
        {
            res.status( 400 ).send( {message:'file name is missing'} );
        }
        
        const imageRes = await fetch( SIGNATURE_DOWNLOAD_URL, {
            method: "POST",
            body: JSON.stringify({ fileName: file }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
        } )

        if ( imageRes.ok )
        {
            const data = await imageRes.blob();

            const arrBuf = await data.arrayBuffer();

            const buff = Buffer.from( arrBuf );

            res.setHeader("Content-Type", "application/octet-stream")
    
            res.status( 200 ).send(buff);
        }
        

        res.status(404).json({ message: imageRes.statusText });

    } catch ( error: any )
    {
        
        console.log( error );
        
        res.status(500).json({message: error.message})
	}

}

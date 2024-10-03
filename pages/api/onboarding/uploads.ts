// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { BASE_URL } from '@/utils/vars/uri';
import { SignatureProcessor } from '@/utils/clientActions/signatureHelpers';
import formidable from 'formidable';
import fs from 'node:fs/promises';
import { Blob } from 'node:buffer';

export const config = {
	api: {
		bodyParser: false,
	},
};

const SIGNATURE_UPLOAD_URL = BASE_URL + '/upload';
const SIGNATURE_DOWNLOAD_URL = BASE_URL + '/download';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ url: string; }>
) {
	if (req.method !== 'POST') {
		res.status(400);
		return;
	}

    const { clientId } = req.query;

	const form = formidable();

    const [ _,files ] = await form.parse( req );
    
    if ( !files.file  )
    {
        res.status( 400 ).send({url: ""});
        return;
    }

    const buffer = await fs.readFile( files.file[ 0 ].filepath );

	const file = new File([buffer], files.file[0].originalFilename as string, {
		type: files.file[0].mimetype as string,
    } );
    
    try
    {   
        const googleCloudURL = await SignatureProcessor.upload( file, clientId as string );

        if ( !googleCloudURL )
        {
            throw new Error( 'failed to generate cloud url' );
        }

        const signatureStorageURL = new URL( googleCloudURL );

        const signatureFileName = signatureStorageURL.pathname.split( '/' ).pop();

        res.status(200).json({ url: signatureFileName as string });

    } catch ( error: any )
    {
        
        console.log( error );
        
        res.status( 500 ).send({ url: "" });
	}

}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { SignatureProcessor } from '@/utils/clientActions/signatureHelpers';
import formidable from 'formidable';
import fs from 'node:fs/promises';

export const config = {
	api: {
		bodyParser: false,
	},
};


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

    const [ _, files ] = await form.parse( req );
    
    delete _;
    
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

    } catch ( error )
    {
        
        console.log( error );
        
        res.status( 500 ).send({ url: "" });
	}

}

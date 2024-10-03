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
    res: NextApiResponse<Buffer | { message: string; }>
) {
	if (req.method !== 'POST') {
		res.status(400);
		return;
	}

    const { clientId } = req.query;
    
	const form = formidable();

    const [ fields, files ] = await form.parse( req );
    
    if ( !files.file || !fields.fileName )
    {
        res.status( 400 );
        return;
    }

    const buffer = await fs.readFile( files.file[ 0 ].filepath );


	const file = new File([buffer], fields.fileName[0], {
		type: files.file[0].mimetype as string,
    } );


    
    try
    {
        
        const googleCloudURL = await SignatureProcessor.upload( file, clientId as string );

        if ( !googleCloudURL )
        {
            throw new Error( 'failed to generate cloud url' );
        }

        const signatureStorageURL = new URL(googleCloudURL);

        const signatureFileName = signatureStorageURL.pathname.split( '/' ).pop();
        
        const imageBlob = await fetch( SIGNATURE_DOWNLOAD_URL, {
            method: "POST",
            body: JSON.stringify({ fileName: signatureFileName }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        } )

        if ( imageBlob.ok )
        {
            const data = await imageBlob.blob();

            const arrBuf = await data.arrayBuffer();

            const buff = Buffer.from( arrBuf );

            res.setHeader("Content-Type", "application/octet-stream")
    
            res.status( 200 ).send(buff);
        }
        

        res.status(404).json({ message: imageBlob.statusText });

        return;
	} catch (error: any) {
        console.log( error );
        
        res.status(500).json({message: error.message})
	}

}

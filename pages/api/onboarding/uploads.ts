// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { FileHelpers } from '@/utils/clientActions/fileHelpers';
import formidable from 'formidable';
import type { File as FormidableFile } from 'formidable';
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

	const form = formidable();

    const parsedForm = await form.parse( req );
    
    const files = parsedForm.at( 1 );
    
    if ( !files || !files.file  )
    {
        res.status( 400 ).send({url: ""});
        return;
    }

    const parsedFile = files.file[ 0 ] as FormidableFile;

    const buffer = await fs.readFile( parsedFile.filepath );

	const file = new File([buffer], parsedFile.originalFilename as string, {
		type: parsedFile.mimetype as string,
    } );
    
    try
    {   
        const googleCloudURL = await FileHelpers.upload( file as File);

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

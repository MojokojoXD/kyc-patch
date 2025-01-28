import type { NextApiRequest, NextApiResponse } from 'next';
import { FileHelpers } from '@/utils/clientActions/fileHelpers';
import formidable from 'formidable';
import type { File as FormidableFile } from 'formidable';
import fs from 'node:fs/promises';
import { z } from 'zod';

const uploadURLQuerySchema = z.object({
  fileName: z.string(),
  credentials: z.string(),
  timestamp: z.string(),
});

type UploadURLQuery = z.infer<typeof uploadURLQuerySchema>;
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
  if (req.method !== 'POST') {
    res.status(400);
    return;
  }

  const parseResult = uploadURLQuerySchema.safeParse(req.query);

  if (!parseResult.success) {
    res.status(400).send('Malformed url query');
    return;
  }

  const form = formidable();

  const parsedForm = await form.parse(req);

  const files = parsedForm.at(1);

  if (!files || !files.file) {
    res.status(400).send({ url: '' });
    return;
  }

  const parsedFile = files.file[0] as FormidableFile;

  const buffer = await fs.readFile(parsedFile.filepath);

  const {
    fileName,
    credentials,
    timestamp,
  } = <UploadURLQuery>req.query;

  const extension = parsedFile.originalFilename?.split( '.' ).pop();

  if ( !extension ) throw new Error( 'Missing file extension' );

  const composedFileName = fileName + '$' + credentials + '$' + timestamp + '.' + extension;

  const file = new File([buffer], composedFileName, {
    type: parsedFile.mimetype as string,
  });

  try {
    const googleCloudURL = await FileHelpers.upload(file as File);

    if (!googleCloudURL) {
      throw new Error('failed to generate cloud url');
    }

    const signatureStorageURL = new URL( googleCloudURL );
    
    const signatureFileName = signatureStorageURL.pathname.split('/').pop();

    res.status(200).json({ url: signatureFileName as string });
  } catch (error) {
    console.log(error);

    res.status(500).send({ url: '' });
  }
}

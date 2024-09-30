// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { BASE_URL } from "@/utils/vars/uri";

type Data = {
  name: string;
};

const SIGNATURE_UPLOAD_URL = BASE_URL + '/upload';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
)
{
    if ( req.method === "POST" )
    {
        console.log(req.body)
    }

  res.status(200).json({ name: "John Doe" });
}

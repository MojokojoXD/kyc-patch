import type { NextApiHandler } from 'next';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import axios from 'axios';

const handler: NextApiHandler = async (req, res) => {
	const body = req.body;

	const transformedFormData = FormHelpers.transformIndividualSchemaToServerSchema(
		body.data
	);

	const payload = {
		...body,
		data: transformedFormData,
  };

  try
  {
    const ssxRes = await axios.post(
      'https://kycapi.uat.secondstax.com/kyc/client/submit/ind',
      payload
    );
    res.status( 200 ).json( ssxRes.data );
	} catch (error) {
    if ( axios.isAxiosError( error ) )
      {
      console.log( error.response )
			res.status(error.status ?? 500).send( error.message );
			return;
		}
		res.status(500).send('unknown error when submitting form');
	}
};

export default handler;

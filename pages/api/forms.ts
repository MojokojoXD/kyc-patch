import type { NextApiHandler } from 'next';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import axios from 'axios';
import type { CorporateFormSchema } from '@/types/forms/corporateSchema';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';

export interface KYCFormPayload
{
  submissionID: string;
  clientID: string;
  data: CorporateFormSchema | IndividualFormSchema;
}

const handler: NextApiHandler = async (req, res) => {
  const body: KYCFormPayload = req.body;
  
  const { form } = req.query
  
  let transformedFormData: ReturnType<typeof FormHelpers.transformIndividualSchemaToServerSchema> | ReturnType<typeof FormHelpers.transformCorporateSchemaToServerSchema> | undefined = undefined;

  switch ( form )
  {
    case 'individual':
      transformedFormData = FormHelpers.transformIndividualSchemaToServerSchema( <IndividualFormSchema> body.data );
      break;
    case 'corporate':
      transformedFormData = FormHelpers.transformCorporateSchemaToServerSchema( <CorporateFormSchema> body.data );
      break;
    default:
      res.status( 400 ).send( 'form type not supported' );
      return;
  }


	const payload = {
		...body,
		data: transformedFormData,
  };

  try
  {
    const ssxRes = await axios.post(
      `https://kycapi.uat.secondstax.com/kyc/client/submit/${ form === 'individual' ? 'ind' : 'corp' }`,
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

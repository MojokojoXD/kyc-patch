import type { NextApiHandler } from "next";
import type { Country } from "@/types/forms/common";
import type { BaseSSXResponse } from "@/types/server/SSX";
import { BASE_URL } from "@/utils/vars/uri";
import axios from 'axios'

export interface CountryListResponse extends BaseSSXResponse
{
  data: Country[];
}




const COUNTRY_LIST_URL = BASE_URL + '/kyc/lov/country';

const handler: NextApiHandler = async( _req, res ) =>
{
  
    try {
      
      const ssxRes = await axios.get<CountryListResponse>( COUNTRY_LIST_URL );

      res.status( ssxRes.status ).json( ssxRes.data )

    } catch (error) {
      console.log( error );

      if ( axios.isAxiosError( error ) )
      {
        res.status( error.status ?? 500 ).json( { Status: 'FAIL', Message: error.message } );
        return;
      }

      res.status( 500 ).json( { Status: 'FAIL', Message: 'unknown error reaching ssx servers' } );
    }

};

export default handler;
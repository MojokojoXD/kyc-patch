import type { CountryList, Country } from '@/types/forms/common';
import type { CountryListResponse } from '@/pages/api/get-country-list';
import axios from 'axios';

export const priorityCountries = ['GH', 'NG', 'KE'];

export const getCountryList = async (): Promise<CountryList> =>
{
  try
  {
    
    const res = await axios.get<CountryListResponse>( '/api/get-country-list' );
    
      const priorityList: Country[] = res.data.data.filter((c) =>
        priorityCountries.includes(c.cty_code)
      );
      const mainList: Country[] = res.data.data.filter(
        (c) => !priorityCountries.includes(c.cty_code)
      );
    
      return [priorityList, mainList];
  } catch ( error )
  {
    console.log(error)
    return [[],[]]
  }

};

import type { CountryCode } from "@/types/forms/universal";
import type { Country } from "@/types/forms/universal";
import rawCountriesData = require( '@/utils/vars/_formDefaults/countries.json' );

const priorityCountries: CountryCode[] = [ 'GH', 'NG', 'KE' ];

const getCountryList = async (): Promise<Country[]> => rawCountriesData.data;

export { priorityCountries, getCountryList }
import type { Country } from "@/types/forms/universal";
import rawCountriesData from '@/utils/vars/_formDefaults/countries.json';

const priorityCountries = [ 'GH', 'NG', 'KE' ];

const getCountryList = async (): Promise<Country[]> => rawCountriesData.data;

export { priorityCountries, getCountryList }
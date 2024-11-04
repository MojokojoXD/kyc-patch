import type { CountryList, Country } from '@/types/forms/common';
import rawCountriesData from '@/utils/vars/_formDefaults/countries.json';

export const priorityCountries = ['GH', 'NG', 'KE'];

export const getCountryList = async (): Promise<CountryList> => {
	const priorityList: Country[] = rawCountriesData.data.filter((c) =>
		priorityCountries.includes(c.cty_code)
	);
	const mainList: Country[] = rawCountriesData.data.filter(
		(c) => !priorityCountries.includes(c.cty_code)
	);

	return [priorityList, mainList];
};

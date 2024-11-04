import type { Country } from '@/types/forms/common';
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';



export class FormHelpers {
	static getFlagURL = (country: string, countryList: Country[]) =>
		!country || countryList.length === 0
			? ''
			: (countryList.filter((c) => c.cty_code == country).at(0) as Country)
					.cty_flag_name;

	static getCodeFromFullCountryName(
		country: string,
		countryList: Country[] = []
	) {
		const target = countryList.filter((c) => c.cty_name === country).at(0);

		if (!target) return;

		return target.cty_code;
	}

	static getCountryAreaCode = (country: string, countryList: Country[]) =>
		!country
			? ''
			: (countryList.filter((c) => c.cty_name === country).at(0) as Country)
					.call_code;

	static recursiveFormSearch(path: string, target: unknown): unknown {
		if (path === '') return target;

		const accessors = path.split('.');

		//@ts-expect-error target type is unknown
		const value = target[accessors[0]];

		if (typeof value === 'object') {
			accessors.shift();
			return this.recursiveFormSearch(accessors.join('.'), value);
		}

		return value;
	}

	static async statelessRequest<TRequest = unknown, TResponse = unknown>(
		url: string,
		options: AxiosRequestConfig<TRequest> = {
			method: 'GET',
			withCredentials: true,
		}
	) {
		try {
			const res = await axios<TResponse>(url, { ...options });

			if (res.status === 200) {
				return res.data;
			}

			throw new Error('Status: ' + res.status + ', Message: ' + res.statusText);
		} catch (error) {
			throw error;
		}
	}

	static currencyInputFormatter(value: string): string {
		const formatter = new Intl.NumberFormat('en-GB', {
			useGrouping: 'always',
		});

		return formatter.format(parseInt(value));
	}

	static generateUniqueIdentifier() {
		return Math.random().toString(36).substr(2, 7);
	}
    
}

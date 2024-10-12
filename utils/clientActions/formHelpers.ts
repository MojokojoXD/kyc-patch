import type { Country } from '@/types/forms/universal';
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import type { ReviewStepMetadata } from '@/types/forms';

export class FormHelpers {
	static getFlagURL = (country: string, countryList: Country[]) =>
		!country
			? ''
			: (
					countryList.filter((c) => c.cty_code == country).at(0) as Country
            ).cty_flag_name;
    
	static getCodeFromFullCountryName(
		country: string,
		countryList: Country[] = []
	) {
		const target = countryList
			.filter((c) => c.cty_name === country)
			.at(0);

		if (!target) return;

		return target.cty_code;
	}

	static getCountryAreaCode = (
		country: string,
		countryList: Country[]
	) =>
		!country
			? ''
			: (
					countryList
						.filter((c) => c.cty_name === country)
						.at(0) as Country
			  ).call_code;

	static recursiveFormSearch(path: string, target: unknown): unknown {
		if (path === '') return target;

		const accessors = path.split('.');

		const value = target[accessors[0]];

		if (typeof value === 'object') {
			accessors.shift();
			return this.recursiveFormSearch(accessors.join('.'), value);
		}

		return value;
	}

	static async statelessRequest<
		TRequest = unknown,
		TResponse = unknown
	>(
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

			throw new Error(
				'Status: ' + res.status + ', Message: ' + res.statusText
			);
		} catch (error) {
			throw error;
		}
	}

	static generateAllStepFields = <TFormSteps>(
		stepFields: ReviewStepMetadata<TFormSteps> | undefined,
		currentNumberOfApplicants: number
	) => {
		if (!stepFields) return [];

		const temp: (string | string[])[] = [];
		let allFieldNames: string[] = [];

		for (let i = 0; i < currentNumberOfApplicants; i++) {
			for (let j = 0; j < stepFields.field.length; j++) {
				const { path } = stepFields.field[j];

				if (typeof path === 'function') {
					const value = path(i);
					temp.push(value);
					continue;
				}

				temp.push(path);
			}
		}

		for (let i = 0; i < temp.length; i++) {
			if (Array.isArray(temp[i])) {
				allFieldNames = allFieldNames.concat(...temp[i]);
				continue;
			}

			allFieldNames.push(temp[i] as string);
		}

		return [...new Set(allFieldNames).values()];
	};
}

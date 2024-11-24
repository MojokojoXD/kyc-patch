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

	static recursiveObjectSearch(path: string, target: unknown): unknown {
		if (path === '') return target;

		const accessors = path.split('.');

		//@ts-expect-error target type is unknown
		const value = target[accessors[0]];

		if (typeof value === 'object') {
			accessors.shift();
			return this.recursiveObjectSearch(accessors.join('.'), value);
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static helper( obj: Record<string,any>, path: string[], value: unknown )
    {
        // get the current and the remaining keys from the path
        const [current, ...rest] =  path;
      
        // if there are more keys
        // add the value as an object or array
        // depending upon the typeof key
        if(rest.length > 0){
            // if there is no key present
            // create a new one
            if(!obj[current]){
              // if the key is numeric
              // add an array
              // else add an object
              const isNumber = `${+rest[0]}` === rest[0];
              obj[current] = isNumber ? [] : {};
            }
                
            // recurisvely update the remaining path
            // if the last path is not of object type
            // but key is then
            // create an object or array based on the key
            // and update the value
            if(typeof obj[current] !== 'object'){
              // determine if the key is string or numeric 
              const isNumber = `${+rest[0]}` === rest[0];
              obj[current] = this.helper(isNumber ? []  : {}, rest, value)
            }
            // else directly update value
            else{
              obj[current] = this.helper(obj[current], rest, value);
            }
        }
        // else directly assign the value to the key
        else{
          obj[current] = value;
        }
      
        // return the updated obj
        return obj;
     }
    
    static set( obj: Record<string, unknown>, path: string, value: unknown ) 
    {
       let pathArr: string[] = [];
      
       // if path is of string type
       // replace the special characters
       // and split the string on . to get the path keys array
       if(typeof path === 'string'){
         pathArr = path.split('.')
       }
       
       // use the helper function to update
       this.helper(obj, pathArr, value);
    };
}

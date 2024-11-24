import type { Path } from 'react-hook-form';
import { useMemo } from 'react';
import { FormHelpers } from '@/utils/clientActions/formHelpers';

export function useSorter<TData extends object = object>(
	sortProperty: Path<TData> | undefined,
	data: TData[]
)
{

	return useMemo(() => {
		if (!sortProperty) return data;

		return data.sort((a, b) => {
			const valueA = FormHelpers.recursiveObjectSearch(sortProperty, a);
			const valueB = FormHelpers.recursiveObjectSearch(sortProperty, b);

			if (!valueA || !valueB) return 0;

			switch (typeof valueA) {
				case 'number':
					return valueA - (valueB as number);
				case 'string':
					const isDate = !Number.isNaN(Date.parse(valueA));

					if (isDate) return Date.parse(valueB as string) - Date.parse(valueA);

					return valueA.toLowerCase().localeCompare(valueB as string) ;
				default:
					throw new Error(
						'Cannot sort the property ' + sortProperty + ' in input collection'
					);
			}
		});
	}, [sortProperty, data]);
}

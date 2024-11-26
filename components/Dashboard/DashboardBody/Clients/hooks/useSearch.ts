import { useMemo } from 'react';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import type { Path } from 'react-hook-form';

export function useSearch<
	TData extends object = object
>(searchStr: string, collection: TData[], properties: (Path<TData>)[]  ) {
    
	return useMemo(() => {
        if ( (properties.length === 0 || !searchStr) ) return collection;
        
		return collection.filter((data) => {
            let isMatch = false;

            for ( const prop of properties )
            {
                const propValue = FormHelpers.recursiveObjectSearch( prop, data );
                
                if ( typeof propValue !== 'string' ) continue;

                isMatch = new RegExp( searchStr.toLowerCase() ).test( propValue.toLowerCase() );

                if ( isMatch ) break;
            };
            
            return isMatch;
        } );

	}, [searchStr,collection, properties]);
}

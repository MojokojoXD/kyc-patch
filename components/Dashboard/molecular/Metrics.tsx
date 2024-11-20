import { useEffect } from 'react';
import { useSession } from '../hooks/useSession';
// import type { Metric } from '../types/dashboard';
// import { BaseSSXResponse } from '@/types/server/SSX';
export function Metrics() {
	const { request } = useSession();

	useEffect(() => {
		
        request( { url: 'metrics', method: 'GET' }, function ( res )
        {
            console.log( res )
        } )

	}, []);

	return null;
}

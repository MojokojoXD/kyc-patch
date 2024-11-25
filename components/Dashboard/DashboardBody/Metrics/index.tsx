import * as ViewContent from '../Layout/ViewContent';
import { Button } from '@/components/ui/button';
import { MetricDataCard } from './MetricDataCard';
import type { Portal } from '../Layout';
import type { MetricDataPoint } from './metrics';
import type { BaseSSXResponse } from '@/types/server/SSX';
import { useSession } from '../../hooks/useSession';
import { useEffect, useState } from 'react';
import Loading from '@/components/ui/Loading';

interface MetricsEndpointResponse extends BaseSSXResponse {
	metrics: MetricDataPoint[];
}

interface MetricsProps {
	onPortalChange: (portal: Portal) => void;
}

export function Metrics({ onPortalChange }: MetricsProps) {
	const { request } = useSession<MetricsEndpointResponse>();
	const [metricsData, setMetricsData] = useState<MetricDataPoint[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		request(
			{ url: '/kyc/dashboard/metrics', method: 'GET' },
			function (data, error, status) {
				if (status === 'COMPLETED') {
					setMetricsData([...data!.metrics]);
					setIsLoading(false);
					return;
				}

				error && status === 'FAILED' && setError(error);
				setIsLoading(false);
			}
		);
    }, [] );
    

    if ( error )
    {
        console.error( error );
        return <p className='p-10'>Something went wrong. Please try again later!</p>
    }

	return (
		<div className='bg-white p-8 space-y-4 rounded-lg h-full'>
			<Loading
				absolute
				reveal={isLoading}
			/>
			<ViewContent.Header className='flex justify-between items-center'>
				<h1 className='heading6Bold'>Applications Stats by Status</h1>
				<Button
					variant={'outline'}
					onClick={onPortalChange.bind(this, 'clientele')}>
					View Applications
				</Button>
			</ViewContent.Header>
            <ViewContent.Body className='grid grid-cols-2 gap-[16px]'>
                { metricsData.map( d => (
                    <div key={d.status}>
                        <MetricDataCard status={ d.status.toLowerCase() }  amount={ d.nbr }/>
                   </div>
               ) ) }
            </ViewContent.Body>
		</div>
	);
}

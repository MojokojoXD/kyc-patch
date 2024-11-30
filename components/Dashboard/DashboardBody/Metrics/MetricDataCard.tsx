import { SSXStatusBadge } from '@/components/ui/SSXStatusBadge';

interface MetricDataCardProps {
	status: string;
	amount: string;
}

export function MetricDataCard({ status, amount }: MetricDataCardProps) {
	return (
		<div className='p-[16px] border border-neutral-100 rounded-lg'>
			<div className='pt-[16px]'>
				<h2 className='heading3Bold'>{amount}</h2>
				<div className='flex justify-between'>
					<span className='capitalize paragraph2Regular text-neutral-600'>{status}</span>
					<SSXStatusBadge
						status={'initiated'}
						label={status}
					/>
				</div>
			</div>
		</div>
	);
}

import { Skeleton } from '../../skeleton';

export function DisclosuresSkeleton() {
	return (
		<div className='space-y-2'>
			<Skeleton className='bg-neutral-200 h-4' />
			<Skeleton className='bg-neutral-200 h-4' />
			<Skeleton className='bg-neutral-200 h-4' />
			<Skeleton className='bg-neutral-200 h-4' />
		</div>
	);
}

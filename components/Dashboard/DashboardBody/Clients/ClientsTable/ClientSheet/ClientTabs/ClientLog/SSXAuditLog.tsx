import type { ClientLogEntry } from '../../../../clients';
import { cn } from '@/lib/utils';

interface SSXAuditLogProps {
	timestamp?: string;
	user?: string;
	description: string;
	reference?: string;
	jsxCode?: React.ReactNode;
	variant?: 'default' | 'grey';
}

export function SSXAuditLog({
	description,
	variant = 'default',
	reference = '',
	user = 'false',
	timestamp = '',
	jsxCode,
}: SSXAuditLogProps) {
	return (
		<div className='relative p-[8px_16px_40px_16px] w-full'>
			<div>
				<div
					className={cn(
						'absolute h-full border-l left-0',
						variant === 'default' ? 'border-success-500' : 'border-neutral-300'
					)}
				/>
				<div
					className={cn(
						'absolute h-[8px] w-[8px] rounded-full top-[8px] left-[-3px]',
						variant === 'default' ? 'bg-success-500' : 'bg-neutral-300'
					)}
				/>
			</div>
			<div className='flex flex-col gap-[4px] text-neutral-600 text-[14px]'>
				{timestamp && <p className='captionBook'>{timestamp}</p>}
				{user && <p className='captionBook'>User: {user}</p>}
				<p className='log-description paragraph2Medium text-neutral-700'>
					{description}
				</p>
				{reference && <p className='paragraph1Regular'>Reference: {reference}</p>}
				{jsxCode && <>{jsxCode}</>}
			</div>
		</div>
	);
}

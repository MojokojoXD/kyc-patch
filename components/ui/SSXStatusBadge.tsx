import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const statusBadgeVariants = cva(
	'flex justify-center items-center text-center p-[8px] rounded-[4px] capitalize captionBook',
	{
		variants: {
			status: {
				default: 'bg-neutral-50 text-neutral-900',
				warning: 'bg-neutral-50 text-warning-500',
				primary: 'bg-neutral-50 text-primary-500',
				neutral: 'bg-neutral-50 text-neutral-500',
				success: 'bg-neutral-50 text-success-500',
				error: 'bg-neutral-50 text-error-500',
				initiated: 'bg-neutral-100 text-neutral-700',
				'in-progress': 'bg-warning-50 text-warning-700 border border-warning-100',
				pending: 'bg-neutral-400 text-neutral-900',
				approved: 'bg-neutral-50 text-primary-500',
				uploaded: 'bg-neutral-100 text-success-700',
				denied: 'bg-neutral-100 text-error-700',
				completed: 'bg-success-100 text-neutral-700',
                cancelled: 'bg-neutral-50 text-error-500',
                unknown: 'text-warning-700 bg-warning-100'
			},
			size: {
				sm: 'w-[130px]',
				lg: 'w-full h-[45px] font-medium',
			},
        },
        defaultVariants: {
            status: 'initiated',
            size: 'sm'
        }
	}
);

interface SSXStatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
	label: string;
}

export type BadgeStatus = VariantProps<typeof statusBadgeVariants>[ 'status' ];

export function SSXStatusBadge({ status, label, size }: SSXStatusBadgeProps) {
	return (
		<span className={cn(statusBadgeVariants({ status, size }))}>{label}</span>
	);
}

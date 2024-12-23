import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		return (
			<input
				className={cn(
					'flex h-12 w-full rounded-lg border border-neutral-200 text-neutral-700 bg-white px-4 py-6 paragraph2Regular file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-neutral-300 placeholder:paragraph2Regular focus-visible:outline-none disabled:cursor-not-allowed hover:border-primary-300 transition-[border] ease-in-out focus-visible:border-primary-300 disabled:hover:border-neutral-100 disabled:border-neutral-100 disabled:bg-neutral-50/80 disabled:text-neutral-700/70',
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Input.displayName = 'Input';

export { Input };

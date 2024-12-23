import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center space-x-[.5rem] whitespace-nowrap rounded-md paragraph3Medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
	{
		variants: {
			variant: {
				default:
					'bg-primary-500 text-white hover:bg-primary-500/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90',
				destructive:
					'bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90',
				outline:
					'border border-primary-500 bg-white text-primary-500 hover:bg-neutral-50 hover:text-primary-500 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50',
				secondary:
					'bg-white text-neutral-700 font-normal justify-start border border-neutral-200 hover:border-primary-300 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80 focus:border-primary-300',
				ghost:
					'hover:bg-neutral-50 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50',
				link:
					'text-neutral-700 underline-offset-4 hover:underline dark:text-slate-50',
			},
			size: {
				lg: 'h-[50px] px-[20px] py-[14px] rounded-[8px]',
			    default: 'h-[43px] py-[12px] px-[18px] rounded-[8px] min-w-[9.5rem]',
				sm: 'h-9 rounded-md px-3',
				// lg: 'h-12 rounded-lg px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };

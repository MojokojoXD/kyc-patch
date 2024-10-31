import { Check } from 'lucide-react';
import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	selected: boolean;
	readonly?: boolean;
}

const CustomToggle = forwardRef<HTMLInputElement, InputProps>(
	(
		{ className, label, selected, type = 'radio', readonly = false, ...props },
		ref
	) => {
		const clx =
			'border border-neutral-100 bg-white hover:bg-primary-50 hover:border-primary-500 hover:text-neutral-700 w-full rounded-[8px] transition-all block w-full transition-all scale-100 active:scale-[.99] disabled:hover:border-neutral-100 disabled:hover:bg-white disabled:active:scale-100 disabled:opacity-80 disabled:cursor-not-allowed';

		return (
			<button
				type='button'
				title={label}
				disabled={readonly}
				className={cn(clx, selected && 'border-primary-300 bg-primary-50 disabled:bg-neutral-100 disabled:hover:bg-neutral-100 disabled:hover:border-neutral-300 disabled:border-neutral-300')}>
				<div>
                    <label
						className={cn(
							'paragraph2Regular p-[16px] w-full relative flex items-center justify-center text-neutral-700 text-left gap-[12px] capitalize cursor-pointer', readonly && 'cursor-not-allowed',
							className
						)}>
						<div className='grow'>
							<p className='w-full'>{label}</p>
						</div>
						<input
                            ref={ ref }
                            disabled={readonly}
							{...props}
							type={type}
							checked={selected}
							className={'appearance-none disabled:cursor-not-allowed'}
						/>
						<div className='w-5 flex justify-end'>
							<Check
								className={cn(
									'text-primary-300 w-[20px] h-[16px] grow-0',
									selected && 'text-primary-500', readonly && 'text-neutral-500'
								)}
							/>
						</div>
					</label>
				</div>
			</button>
		);
	}
);

CustomToggle.displayName = 'CustomToggle';

export { CustomToggle };

import { Check } from 'lucide-react';
import {
	forwardRef,
	InputHTMLAttributes,
} from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>
{
    label: string;
    selected: boolean;
}

const CustomToggle = forwardRef<HTMLInputElement, InputProps>(
	({ className,label,selected,type = 'radio', ...props }, ref) => {
        const clx = 'border border-neutral-100 bg-white hover:bg-primary-50 hover:border-primary-500 hover:text-neutral-700 w-full rounded-[8px] transition-all block w-full transition-all scale-100 active:scale-[.99]';
        
        return (
            <button type='button' title={label} className={cn(clx, selected && "border-primary-300 bg-primary-50")}>
                <div >
                    <label className={ cn( 'paragraph2Regular p-[16px] w-full relative flex items-center justify-center text-neutral-700 text-left gap-[12px] capitalize cursor-pointer', className ) }>
                        <div className='grow'>
                            <p className='w-full'>{label}</p>
                        </div>
                        <input
                            ref={ref}
                            { ...props }
                            type={ type }
                            checked={ selected }
                            className={"appearance-none"}
                        />
                        <div className='w-5 flex justify-end'>
                            <Check className={cn(
                                'text-primary-300 w-[20px] h-[16px] grow-0',
                                selected && 'text-primary-500'
                            )}/>
                        </div>
                    </label>
                </div>
            </button>
		)
	}
);

CustomToggle.displayName = 'CustomToggle';

export { CustomToggle }

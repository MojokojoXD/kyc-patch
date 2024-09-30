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
        const clx = 'border border-neutral-100 bg-white hover:bg-primary-50 hover:border-primary-500 hover:text-neutral-700 w-full rounded-lg transition-all';
        
        return (
            <div className={cn(clx, selected && "border-primary-500 bg-primary-50 hover:bg-primary-100")}>
                <label className={ cn( 'text-base p-[16px] w-full relative flex items-center justify-center text-neutral-700 text-left', className ) }>
                    <div className='grow'>
                        <p className='capitalize'>{label}</p>
                    </div>
                    <input
                        ref={ref}
                        { ...props }
                        type={ type }
                        checked={ selected }
                        className={"appearance-none"}
                    />
                    <Check className={cn(
                        'text-primary-300 w-[16px] h-[16px]',
                        selected && 'text-primary-500'
                    )}/>
                </label>
            </div>
		)
	}
);

CustomToggle.displayName = 'CustomToggle';

export { CustomToggle }

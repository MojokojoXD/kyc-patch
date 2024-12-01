import { ComponentPropsWithRef } from 'react';
import { Grid2X2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuBtnProps extends ComponentPropsWithRef<'button'> {
	icon?: typeof Grid2X2;
	label: string;

}

export function MenuBtn({
	children,
	className,
	icon: Icon,
	label,
	...props
}: MenuBtnProps) {
	const menuBtnClx =
		'group w-full rounded-none bg-transparent paragraph2Medium capitalize text-neutral-700 flex justify-between items-center border-r border-white p-x-dashboard hover:bg-neutral-50 hover:text-primary-500 transition-[text_border] duration-150 ease-in-out hover:border-primary-500 h-12 px-3 py-4 overflow-hidden';
	const iconClx =
		'h-5 aspect-square';

	return (
		<button
			className={cn(menuBtnClx, className)}
			{...props}>
			<div className='flex items-center space-x-4'>
				{Icon ? (
					<Icon
						className={cn(
							iconClx,
						)}
					/>
				) : (
					<Grid2X2 className={iconClx} />
				)}

				<span>{label}</span>
			</div>
			<span>
				<ChevronRight className='h-4 aspect-square opacity-40 self-end' />
			</span>
		</button>
	);
}

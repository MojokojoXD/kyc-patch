import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import logo from 'public/images/secondStax.webp';
import Image from 'next/image';
import { RotateCw } from 'lucide-react';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

export function Header({ className, children, ...props }: HeaderProps) {
	return (
		<div
			className={cn(
				'fixed top-0 z-10 inset-x-0 flex items-center justify-between h-dashboard-header p-x-dashboard py-[16px] border-b border-neutral-100 bg-white',
				className
			)}
			{...props}>
			{children}
		</div>
	);
}
interface NavWidgetProps extends HTMLAttributes<HTMLDivElement> {}

export function WidgetArea({ className, children, ...props }: NavWidgetProps) {
	return (
		<div
			className={cn('flex items-center gap-6', className)}
			{...props}>
			{children}
		</div>
	);
}

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
	isRequesting: boolean;
}

export function Logo({ isRequesting }: LogoProps) {
	return (
		<div className='flex space-x-2'>
			<Link href={'/'}>
				<Image
					src={logo}
					height={150}
					width={150}
					priority
					alt='ssx logo'
				/>
			</Link>
			<RotateCw
				className={cn(
					'self-center animate-spin hidden text-neutral-700/50 h-5 aspect-square',
					isRequesting && 'block'
				)}
			/>
		</div>
	);
}

export function NavAreaDivider() {
	return <div className='h-[40px] w-[1px] bg-neutral-100' />;
}

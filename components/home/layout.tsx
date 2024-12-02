import { HTMLAttributes, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/images/logo-mini.png';
import { cn } from '@/lib/utils';

type BaseProps = {
	children: ReactNode;
};

type LayoutProps = BaseProps & Record<string, unknown>;
export function Layout({ children }: LayoutProps) {
	return (
		<main className='min-h-screen flex justify-center items-center py-24 bg-neutral-50'>
			{children}
		</main>
	);
}

type MainProps = BaseProps & {
    noLogo?: boolean;
};

export function Main({ children, noLogo = false }: MainProps) {
	return (
		<div className='w-[508px] bg-white p-[24px] space-y-[32px] rounded-xl shadow-sm border border-neutral-50 text-neutral-700'>
            <div className={ cn( 'relative h-[56px] w-[57px]', noLogo && 'hidden' ) }>
                <Link href={'/'}>
                    <Image
                        src={logo}
                        fill
                        alt='secondstax mini logo'
                    />
                </Link>
			</div>
			{children}
		</div>
	);
}

type HeaderProps = {
	title?: string;
	tagline?: string;
};

export function Header({ title = '', tagline = '' }: HeaderProps) {
	return (
		<div className='space-y-[8px]'>
			<h1 className='heading5Bold'>{title}</h1>
			<p className='paragraph2Regular text-neutral-500'>{tagline}</p>
		</div>
	);
}

type BodyProps = BaseProps & {
    error?: string;
};
export function Body({ children, error = '' }: BodyProps) {
	return (
		<div className='space-y-[8px]'>
			{children}
			{error && <p className='paragraph2Regular text-error-500'>{error}</p>}
		</div>
	);
}

type FooterProps = HTMLAttributes<HTMLDivElement>;
export function Footer({ children, className }: FooterProps) {
	return <div className={cn('flex justify-between', className)}>{children}</div>;
}

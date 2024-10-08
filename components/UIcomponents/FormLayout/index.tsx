import Image from 'next/image';
import logo from '@/public/images/logo.png';
import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef } from 'react';

interface FormHeaderProps {
	children: React.ReactNode;
}

function FormHeader({ children }: FormHeaderProps) {
	return (
		<div className='rounded-t-xl row-span-4 bg-white sticky top-0 overflow-hidden z-10'>
            <div className='h-[98px] bg-neutral-100 flex justify-center items-center'>
                <div className='h-[150px] w-[149px] relative'>
                    <Image
                        priority
                        src={ logo }
                        fill
                        className='object-contain'
                        sizes="(max-width: 768px) 200px"
                        alt='SSX Logo'
                    />

                </div>
			</div>
			<div className='flex flex-col pt-[40px] px-[40px] pb-[20px] justify-center'>
				<div className='space-y-[8px]'>{children}</div>
			</div>
		</div>
	);
}

type FormTitleProps = FormHeaderProps & object;

function FormTitle({ children }: FormTitleProps) {
	return <h1 className={`heading5Bold`}>{children}</h1>;
}

type FormSubHeaderProps = FormHeaderProps & object;

function FormSubHeader({ children }: FormSubHeaderProps) {
	return (
		<p className='max-w-prose text-neutral-500 paragraph2Regular'>{children}</p>
	);
}

type FormContentProps = FormHeaderProps & ComponentPropsWithoutRef<'div'>;

export function FormContent({
	children,
	className,
	...props
}: FormContentProps) {
	return (
		<div
			className={cn(
				'bg-white px-[40px] pb-[40px] pt-[20px] space-y-8 grow',
				className
			)}
			{...props}>
			{children}
		</div>
	);
}

type FormLayoutProps = FormHeaderProps & object;

function FormLayout({ children }: FormLayoutProps) {
	return (
		<div className='w-full h-screen'>
            <div className='relative w-full bg-neutral-50 h-screen flex justify-center'>
                <div className='w-full max-w-[716px] h-fit min-h-80 absolute top-[5%] rounded-xl bg-white'>
                    { children }
                </div>
            </div>
		</div>
	);
}

export { FormHeader, FormSubHeader, FormTitle, FormLayout };

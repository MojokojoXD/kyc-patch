import Image from 'next/image';
import logo from '@/public/images/logo.png';
import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef } from 'react';

interface FormHeaderProps {
	children: React.ReactNode;
}

function FormHeader({ children }: FormHeaderProps) {
	return (
		<div className={`rounded-xl overflow-hidden sticky row-span-4 top-0 z-10 bg-white ${children ? "" : ""}`}>
			<div className='h-[98px] bg-neutral-100 flex justify-center items-center overflow-hidden'>
				<Image
					priority
                    src={ logo }
                    width={ 150 }
					alt='SSX Logo'
				/>
			</div>
            <div className='px-10 py-5 space-y-3 min-h-16'>
                { children }
            </div>
		</div>
	);
}

type FormTitleProps = FormHeaderProps & object;

function FormTitle({ children }: FormTitleProps) {
	return <h1 className={`text-2xl font-bold text-neutral-700`}>{children}</h1>;
}

type FormSubHeaderProps = FormHeaderProps & object;

function FormSubHeader({ children }: FormSubHeaderProps) {
	return (
		<p className='max-w-prose leading-relaxed text-neutral-500 text-base'>
			{children}
		</p>
	);
}

type FormContentProps = FormHeaderProps & ComponentPropsWithoutRef<'div'>;

export function FormContent({ children,className, ...props }: FormContentProps) {
	return (
		<div className={cn('px-10 pt-5 space-y-8 border-t border-neutral-100 grow oveflow-auto min-h-[20rem]',className)} {...props}>{children}</div>
	);
}

type FormLayoutProps = FormHeaderProps & object;

function FormLayout({children}: FormLayoutProps) {
	return (
        <div className='h-screen grid grid-cols-3 w-full bg-neutral-50 '>
            <div className='col-start-2 w-full col-span-2 overscroll-none h-full mt-5'>
                <div className='w-full max-w-2xl bg-white rounded-xl'>
                    {children}
                </div>
            </div>
		</div>
	);
}

export { FormHeader, FormSubHeader, FormTitle, FormLayout };

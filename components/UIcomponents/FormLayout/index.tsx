import Image from 'next/image';
import logo from '@/public/images/logo.png';
import { cn } from '@/lib/utils';
import {
	ComponentPropsWithoutRef,
	useEffect,
	useRef,
} from 'react';

interface FormHeaderProps extends ComponentPropsWithoutRef<'div'> {
	children: React.ReactNode;
}

function FormHeader({ children }: FormHeaderProps) {
	
	return (
		<div className='row-span-4 bg-white overflow-hidden z-[60] sticky top-0'>
			<div className='h-[98px] bg-neutral-100 flex justify-center items-center'>
				<div className='h-[150px] w-[149px] relative'>
					<Image
						priority
						src={logo}
						fill
						className='object-contain'
						sizes='(max-width: 768px) 200px'
						alt='SSX Logo'
					/>
				</div>
			</div>
			<div
				className='flex flex-col pt-[40px] px-[40px] pb-[20px] justify-center'>
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
		<p className='max-w-prose text-neutral-500 paragraph2Regular'>
			{children}
		</p>
	);
}

type FormContentProps = FormHeaderProps & Record<string,unknown>;

export function FormContent({
	children,
	className,
	...props
}: FormContentProps )
{
    const contentRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		contentRef.current?.scrollIntoView(true);
	}, [props.content]);

	return (
        <div
            ref={ contentRef }
			className={cn(
				'px-[40px] pb-[40px] pt-[20px] space-y-8 grow bg-white min-h-72',
				className
			)}
			{...props}>
			{children}
		</div>
	);
}

type FormLayoutProps = FormHeaderProps & object;

function FormLayout( { children }: FormLayoutProps )
{
    
	return (
		<div className='h-screen w-full grid grid-cols-3'>
			<div className='flex items-center col-start-2 col-span-full'>
				<div className='w-full max-w-[712px] h-[90vh] bg-white'>
					{children}
				</div>
			</div>
		</div>
	);
}

export { FormHeader, FormSubHeader, FormTitle, FormLayout };

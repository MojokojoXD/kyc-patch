import Image from 'next/image';
import logo from '@/public/images/secondStax.webp';
import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef, useEffect, useRef } from 'react';
import FormProgressSheet from '../CompoundUI/FormProgressSheet';
import { Button } from '../ui/button';
import { useKYCFormContext } from '@/components/pages/onboarding/forms/utils/formController';

interface FormHeaderProps extends ComponentPropsWithoutRef<'div'> {
	children: React.ReactNode;
}

function FormHeader({ children, ...props }: FormHeaderProps) {
	const contentRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		contentRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [props.content]);

	return (
		<div className='row-span-4 bg-white overflow-hidden'>
			<div
				className='h-[98px] bg-neutral-100 flex justify-center items-center '
				ref={contentRef}>
				<div className='h-[98px] w-[149px] relative'>
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

type FormContentProps = FormHeaderProps & Record<string, unknown>;

export function FormContent({
	children,
	className,
	...props
}: FormContentProps) {
	return (
		<div
			className={cn(
				'px-[40px] pb-[40px] pt-[20px] space-y-8 grow bg-white min-h-72',
				className
			)}
			{...props}>
			{children}
		</div>
	);
}

type FormLayoutProps = FormHeaderProps & Record<string, unknown>;

function FormNavButtons() {
	const { next, prev, formNav } = useKYCFormContext();

	return (
		<div className='flex items-center justify-end px-10 space-x-2 pb-16 pt-5 grow-0 bg-white'>
			{formNav.currentStage !== 'introduction' && (
				<Button
					type='button'
					variant={'outline'}
					onClick={prev}>
					Go Back
				</Button>
			)}
			<Button
				type='button'
				onClick={next}>
				{formNav.currentStage === 'introduction'
					? 'Begin Process'
					: 'Save & Continue'}
			</Button>
		</div>
	);
}

type FormTextProps = FormHeaderProps & Record<string, unknown>;

function FormText( { children, className }: FormTextProps )
{
	return (
		<div
			className={cn(
				'paragraph2Regular px-8 py-5 bg-neutral-50 rounded-md border border-neutral-100 space-y-2.5 [&_li]:max-w-prose text-neutral-700 [&>ol]:list-inside [&_li>ol]:pl-6 [&_li>ul]:pl-6 [&_h4]:heading7Medium [&_ul]:space-y-[16px]',
				className
			)}>
			{children}
		</div>
	);
}

function FormLayout({ children }: FormLayoutProps) {
	return (
		<div className='h-screen w-full grid grid-cols-3'>
			<div className='flex items-center col-start-2 col-span-full'>
				<div className='w-full max-w-[716px] bg-white '>
					<div className='rounded-xl overflow-hidden relative'>{children}</div>
				</div>
			</div>
		</div>
	);
}

function FormNav() {
	const { formNav, formAction } = useKYCFormContext();

	return (
		<FormProgressSheet
			formStages={formNav.allStages}
			formAction={formAction}
			stage={formNav.currentStage}
			step={formNav.currentStep}
		/>
	);
}

export {
	FormHeader,
	FormSubHeader,
	FormTitle,
	FormLayout,
	FormNavButtons,
	FormText,
	FormNav,
};

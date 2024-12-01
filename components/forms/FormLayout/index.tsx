import Image from 'next/image';
import logo from '@/public/images/secondStax.webp';
import { cn } from '@/lib/utils';
import {
	ComponentPropsWithoutRef,
	useEffect,
	useRef,
	useState,
	ReactNode,
	useCallback,
} from 'react';
import FormProgressSheet from '@/components/ui/CompoundUI/FormProgressSheet';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useKYCFormContext } from '@/components/forms/utils/formController';
import type { FormFactoryProps } from '@/types/Components/formFactory';
import { FormHelpers } from '@/utils/clientActions/formHelpers';

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

type FormTitleProps = FormHeaderProps & Record<string, unknown>;

function FormTitle({ children }: FormTitleProps) {
	return <h1 className={`heading5Bold`}>{children}</h1>;
}

type FormSubHeaderProps = FormHeaderProps & Record<string, unknown>;

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
				type={formNav.currentStep === 'submit' ? 'submit' : 'button'}
				onClick={next}>
				{formNav.currentStage === 'introduction'
					? 'Begin Process'
					: 'Save & Continue'}
			</Button>
		</div>
	);
}

type FormTextProps = FormHeaderProps & Record<string, unknown>;

function FormText({ children, className }: FormTextProps) {
	return (
		<div
			className={cn(
				'max-h-96 overflow-auto bg-neutral-50 space-y-[16px]  max-w-prose text-neutral-700 paragraph2Regular py-[16px] px-8 [&_h2]:paragraph2Medium [&_h2]:text-neutral-800 [&_h3]:paragraph2Medium [&_ul_ol]:space-y-[16px] [&_li]:space-y-[16px] [&>ul_ol]:list-decimal [&>ul_ol]:ml-7 [&>ul_ul]:ml-7 [&_ol_ol_ol_ol]:list-[lower-alpha] [&>ul]:space-y-[16px] [&_ul_ul]:list-disc',
				className
			)}>
			{children}
		</div>
	);
}

function FormLayout({ children }: FormLayoutProps) {
	return (
		<div className='min-h-screen w-full bg-white py-24 flex items-center justify-center'>
				<div className='w-full max-w-[716px] bg-white rounded-xl border border-neutral-100'>
					<div className='rounded-xl overflow-hidden relative'>{children}</div>
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

interface FormAutopopulateProps {
	formIndex: number;
	render: (index: number) => ReactNode;
	srcPath: string;
	srcFields: FormFactoryProps[];
	fromIndex?: number;
}

function FormAutopopulate({
	render,
	formIndex,
	srcPath,
	srcFields,
}: // fromIndex = 0,
FormAutopopulateProps) {
	const {
		form: { getValues, setValue },
		toggleLoading,
		isLoading,
	} = useKYCFormContext();

	const [populatedValues, setPopulatedValues] = useState<object[] | undefined>(
		undefined
	);

	const buildNewSource = useCallback(() => {
		toggleLoading(true);
		const applicantsData = (getValues(srcPath) as object[]) ?? [];

		const sourceApplicant: Record<string, unknown> = {};

		srcFields.forEach((f) => {
			const value = getValues(f.name) as unknown;

			FormHelpers.set(sourceApplicant, f.name, value);
		});

		applicantsData[formIndex] = {
			...applicantsData[formIndex],
			...((sourceApplicant[srcPath] as unknown[])[0] as object),
		};

		setPopulatedValues([...applicantsData]);
	}, [srcPath, getValues, formIndex, toggleLoading, srcFields]);

	useEffect(() => {
		let timerID: ReturnType<typeof setTimeout>;
		if (populatedValues) {
			setValue(srcPath, populatedValues, {
				shouldValidate: false,
				shouldDirty: true,
			});

			timerID = setTimeout(() => toggleLoading(false), 1000);
		}

		return () => clearTimeout(timerID);
	}, [populatedValues, srcPath, setValue, toggleLoading]);

	if (formIndex === 0) return render(formIndex);

	return (
		<>
			<div className='flex justify-end'>
				<Button
					type='button'
					onClick={buildNewSource}
					size={'sm'}
					className='text-sm bg-error-400 text-white hover:bg-error-400 hover:opacity-80 transition-all'>
					<span>
						{isLoading ? (
							<>
								Populating
								<Loader2 className='ml-1.5 h-5 w-5 animate-spin inline' />
							</>
						) : (
							'Same as 1'
						)}
					</span>
				</Button>
			</div>

			{isLoading ? <></> : render(formIndex)}
		</>
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
	FormAutopopulate,
};

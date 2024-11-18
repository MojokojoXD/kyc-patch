import { useEffect, ReactNode, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface SideModalProps {
	disabledNav?: boolean;
	showNavigation?: boolean;
	modalTitle?: string;
	modalSubText?: string;
	closeModal: (a: boolean) => void;
	children?: ReactNode;
	navAreaText?: string;
	navButtonAction?: () => void;
	showModal: boolean;
	/**
	 * Specify custom label for text displayed throughout component
	 */
	labelOverrides?: {
		goBack?: string;
	};
}

let modalOpenedBefore = false;

const SideModal = (props: SideModalProps) => {
	const {
		disabledNav,
		modalTitle,
		modalSubText,
		closeModal,
		children,
		navAreaText,
		showNavigation,
		navButtonAction,
		labelOverrides,
		showModal = false,
	} = props;

	const backdropRef = useRef<HTMLDivElement | null>(null);

	const mouseEv = useCallback(function (e: MouseEvent) {
		if (e.target !== backdropRef.current) return;
		closeModal(false);
	}, [closeModal]);

	useEffect(() => {
		const backDropElement = backdropRef.current!;

		if (showModal) {
			document.body.style.overflow = 'hidden';
			backDropElement.addEventListener('click', mouseEv);
			closeModal(true);
			modalOpenedBefore = true;
			return;
		}

		if (modalOpenedBefore) {
			backDropElement && backDropElement!.removeEventListener('click', mouseEv);
			document.body.style.overflow = 'auto';
			modalOpenedBefore = false;
		}

		return () => {
			backDropElement && backDropElement!.removeEventListener('click', mouseEv);
		};
	}, [showModal, closeModal, mouseEv]);

    return (
        <div>
            <div
                ref={backdropRef}
                className={cn(
                    'fixed bg-black/30 inset-0 transition-[z_opacity] duration-300 ease-in-out delay-500 ring opacity-0 z-[-100]',
                    showModal && 'delay-300 opacity-100 z-[99]'
                )}>
            </div>
            <div
                className={cn(
                    'fixed inset-y-0 right-[-510px] top-0 w-[510px] bg-[white] flex flex-col transition-[transform_opacity] duration-300 ease-in-out translate-x-0 delay-300 z-[100] opacity-0',
                    showModal && 'translate-x-[-510px] delay-300 opacity-1'
                )}>
                <div className='flex justify-between items-center bg-white border-b border-neutral-100 px-[38px] py-[32px] h-[88px] box-border'>
                    <div>
                        {showNavigation && !navAreaText && (
                            <Button
                                disabled={disabledNav}
                                variant={'ghost'}
                                size={'icon'}
                                onClick={() => {
                                    if (navButtonAction) {
                                        navButtonAction();
                                    }
                                }}
                                className='paragraph2Regular'>
                                {/*arrow-left*/}
                                {!disabledNav && (
                                    <svg
                                        width='12'
                                        height='14'
                                        viewBox='0 0 12 14'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            d='M11 6H3.41L6.71 2.71C6.89831 2.5217 7.00409 2.2663 7.00409 2C7.00409 1.7337 6.89831 1.47831 6.71 1.29C6.5217 1.1017 6.2663 0.995911 6 0.995911C5.7337 0.995911 5.47831 1.1017 5.29 1.29L0.290003 6.29C0.198963 6.38511 0.127598 6.49725 0.0800031 6.62C-0.0200149 6.86346 -0.0200149 7.13654 0.0800031 7.38C0.127598 7.50275 0.198963 7.6149 0.290003 7.71L5.29 12.71C5.38297 12.8037 5.49357 12.8781 5.61543 12.9289C5.73729 12.9797 5.86799 13.0058 6 13.0058C6.13202 13.0058 6.26272 12.9797 6.38458 12.9289C6.50644 12.8781 6.61704 12.8037 6.71 12.71C6.80373 12.617 6.87813 12.5064 6.92889 12.3846C6.97966 12.2627 7.0058 12.132 7.0058 12C7.0058 11.868 6.97966 11.7373 6.92889 11.6154C6.87813 11.4936 6.80373 11.383 6.71 11.29L3.41 8H11C11.2652 8 11.5196 7.89465 11.7071 7.70711C11.8946 7.51957 12 7.26522 12 7C12 6.73479 11.8946 6.48043 11.7071 6.2929C11.5196 6.10536 11.2652 6 11 6Z'
                                            fill='#070B12'
                                        />
                                    </svg>
                                )}
                                {disabledNav && (
                                    <svg
                                        width='12'
                                        height='14'
                                        viewBox='0 0 12 14'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            d='M11 6H3.41L6.71 2.71C6.89831 2.5217 7.00409 2.2663 7.00409 2C7.00409 1.7337 6.89831 1.47831 6.71 1.29C6.5217 1.1017 6.2663 0.995911 6 0.995911C5.7337 0.995911 5.47831 1.1017 5.29 1.29L0.290003 6.29C0.198963 6.38511 0.127598 6.49725 0.0800031 6.62C-0.0200149 6.86346 -0.0200149 7.13654 0.0800031 7.38C0.127598 7.50275 0.198963 7.6149 0.290003 7.71L5.29 12.71C5.38297 12.8037 5.49357 12.8781 5.61543 12.9289C5.73729 12.9797 5.86799 13.0058 6 13.0058C6.13202 13.0058 6.26272 12.9797 6.38458 12.9289C6.50644 12.8781 6.61704 12.8037 6.71 12.71C6.80373 12.617 6.87813 12.5064 6.92889 12.3846C6.97966 12.2627 7.0058 12.132 7.0058 12C7.0058 11.868 6.97966 11.7373 6.92889 11.6154C6.87813 11.4936 6.80373 11.383 6.71 11.29L3.41 8H11C11.2652 8 11.5196 7.89465 11.7071 7.70711C11.8946 7.51957 12 7.26522 12 7C12 6.73479 11.8946 6.48043 11.7071 6.2929C11.5196 6.10536 11.2652 6 11 6Z'
                                            fill='#E8EEF7'
                                        />
                                    </svg>
                                )}
                                {labelOverrides?.goBack || 'Go Back'}
                            </Button>
                        )}
                        {navAreaText && <span className='paragraph2Regular'>{navAreaText}</span>}
                    </div>
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                        onClick={() => {
                            closeModal(false);
                        }}>
                        <X />
                    </Button>
                </div>
                <div className='w-full p-[32px] overflow-y-auto flex flex-grow flex-col'>
                    {modalTitle && (
                        <div className='flex flex-col gap-[4px] text-neutral-900 mb-[40px]'>
                            <h3 className='text-[19px] font-bold m-0 not-italic'>{modalTitle}</h3>
                            <p className='text-[14px] font-normal m-0 not-italic'>{modalSubText}</p>
                        </div>
                    )}
                    {children}
                </div>
            </div>
        </div>
	);
};

export { SideModal };

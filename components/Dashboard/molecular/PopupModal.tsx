import { Button } from '@/components/ui/button';

/**
 * Component to display a popup modal
 */

interface PopupModalProps {
	/**
	 * Title of the modal
	 */
	title: string;
	/**
	 * Content of the modal
	 */
	content: string;
	/**
	 * Function to be called when the primary button is clicked. The primary button is the one on the right.
	 */
	primaryAction: () => void;
	/**
	 * Text to be displayed on the primary button
	 */
	primaryBtnText: string;
	/**
	 * Function to be called when the secondary button is clicked. When this prop is not provided, only the primary button is displayed.
	 */
	secondaryAction?: () => void;
	/**
	 * Text to be displayed on the primary button
	 */
	secondaryBtnText?: string;
	/**
	 * Callback function to close the modal
	 */
	closeFxn: () => void;
	/**
	 * Toggle to show or hide the modal based on boolean value passed to it
	 */
	showModal: boolean;
}

const PopupModal = (props: PopupModalProps) => {
	const {
		title,
		content,
		secondaryAction,
		primaryAction,
		closeFxn,
		primaryBtnText,
		secondaryBtnText,
		showModal,
	} = props;

    ( () =>
    {
        if ( typeof document === 'undefined' ) return;
        document.body.classList.add('side-panel-open');
	})();

	function reEnableScroll() {
		document.body.classList.remove('side-panel-open');
	}

	return (
		<>
			{showModal && (
				// keyframes configured in tailwind.config.ts
				<div className='bg-[rgba(7,_11,_18,_0.5)] fixed flex justify-center items-center animate-[fade_0.1s_ease-in-out]'>
					<div className='w-[504px] rounded-[16px] p-[40px] bg-[white] flex flex-col gap-[40px] animate-[grow_0.1s_ease-in-out] text-neutral-900'>
						<div className='flex justify-center items-center'>
							<h5 className='heading5Bold'>{title}</h5>
							<Button
								type='button'
								variant={'ghost'}
								size={'icon'}
								className='aspect-square h-[32px]'
								onClick={() => {
									reEnableScroll();
									closeFxn();
								}}>
								<svg
									width='32'
									height='32'
									viewBox='0 0 32 32'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M17.88 16L23.6133 10.28C23.8644 10.0289 24.0055 9.6884 24.0055 9.33333C24.0055 8.97826 23.8644 8.63773 23.6133 8.38666C23.3623 8.13559 23.0217 7.99454 22.6667 7.99454C22.3116 7.99454 21.9711 8.13559 21.72 8.38666L16 14.12L10.28 8.38666C10.0289 8.13559 9.6884 7.99454 9.33333 7.99454C8.97826 7.99454 8.63773 8.13559 8.38666 8.38666C8.13559 8.63773 7.99454 8.97826 7.99454 9.33333C7.99454 9.6884 8.13559 10.0289 8.38666 10.28L14.12 16L8.38666 21.72C8.26169 21.8439 8.1625 21.9914 8.09481 22.1539C8.02712 22.3164 7.99226 22.4906 7.99226 22.6667C7.99226 22.8427 8.02712 23.0169 8.09481 23.1794C8.1625 23.3419 8.26169 23.4894 8.38666 23.6133C8.51061 23.7383 8.65808 23.8375 8.82056 23.9052C8.98304 23.9729 9.15731 24.0077 9.33333 24.0077C9.50934 24.0077 9.68362 23.9729 9.8461 23.9052C10.0086 23.8375 10.156 23.7383 10.28 23.6133L16 17.88L21.72 23.6133C21.8439 23.7383 21.9914 23.8375 22.1539 23.9052C22.3164 23.9729 22.4906 24.0077 22.6667 24.0077C22.8427 24.0077 23.017 23.9729 23.1794 23.9052C23.3419 23.8375 23.4894 23.7383 23.6133 23.6133C23.7383 23.4894 23.8375 23.3419 23.9052 23.1794C23.9729 23.0169 24.0077 22.8427 24.0077 22.6667C24.0077 22.4906 23.9729 22.3164 23.9052 22.1539C23.8375 21.9914 23.7383 21.8439 23.6133 21.72L17.88 16Z'
										fill='#070B12'
									/>
								</svg>
							</Button>
						</div>
						<div className='text-[16px] font-normal leading-[28px]'>
							<p>{content}</p>
						</div>
						<div className='flex justify-between items-center gap-[8px]'>
							{secondaryBtnText && secondaryAction && (
                                <Button
                                    variant={'outline'}
									onClick={() => {
										secondaryAction();
									}}>
									{secondaryBtnText}
								</Button>
							)}
							<Button
								onClick={() => {
									primaryAction();
								}}>
								{primaryBtnText ? primaryBtnText : 'Okay'}
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export {PopupModal};

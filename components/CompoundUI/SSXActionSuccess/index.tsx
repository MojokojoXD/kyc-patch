import { JSX } from "react";

interface SSXActionSuccessProps
{
	headingText?: string;
	subText?: string | JSX.Element;
}
export function SSXActionSuccess({
	headingText = '',
	subText = '',
}: SSXActionSuccessProps) {
	return (
		<div className='flex flex-col justify-center items-center gap-[8px] w-full mb-[8px]'>
			<span className='mb-[8px]'>
				<svg
					width='64'
					height='64'
					viewBox='0 0 64 64'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					className='animate-[rtte_0.4s_ease-out]'>
					<g clipPath='url(#clip0_400_1996)'>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M30.181 8.068C30.781 8.023 31.388 8 32 8C45.246 8 56 18.754 56 32C56 45.246 45.246 56 32 56C18.754 56 8 45.246 8 32C8 31.388 8.02299 30.781 8.06799 30.181C8.92399 40.71 17.751 49 28.5 49C39.814 49 49 39.814 49 28.5C49 17.751 40.71 8.924 30.181 8.068Z'
							fill='#D1FEE8'
						/>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M47.5564 47.5561C38.971 56.1415 25.0297 56.1415 16.4443 47.5561C7.85886 38.9707 7.85888 25.0294 16.4443 16.444C25.0297 7.85854 38.971 7.85853 47.5564 16.4439C54.3243 23.2118 55.7583 33.3076 51.8559 41.4848C51.3799 42.4819 51.8033 43.6758 52.7986 44.1518C53.7948 44.627 54.9904 44.2035 55.4656 43.2074C60.0765 33.5443 58.3836 21.6132 50.3854 13.615C40.2387 3.46826 23.762 3.46825 13.6153 13.6149C3.46858 23.7616 3.46859 40.2384 13.6153 50.3851C23.762 60.5318 40.2387 60.5318 50.3854 50.3851C51.166 49.6044 51.166 48.3367 50.3854 47.5561C49.6048 46.7754 48.3371 46.7754 47.5564 47.5561Z'
							fill='#06BA63'
						/>
						<g
							clipPath='url(#clip1_400_1996)'
							className='animate-[cm_0.3s_ease-out]'>
							<path
								d='M38.7099 27.2099C38.617 27.1161 38.5064 27.0417 38.3845 26.991C38.2627 26.9402 38.132 26.9141 37.9999 26.9141C37.8679 26.9141 37.7372 26.9402 37.6154 26.991C37.4935 27.0417 37.3829 27.1161 37.29 27.2099L29.84 34.6699L26.7099 31.5299C26.6134 31.4366 26.4995 31.3633 26.3746 31.3141C26.2498 31.2649 26.1165 31.2408 25.9823 31.2431C25.8481 31.2454 25.7157 31.2741 25.5926 31.3276C25.4695 31.3811 25.3582 31.4583 25.2649 31.5549C25.1717 31.6514 25.0984 31.7653 25.0492 31.8902C25 32.015 24.9759 32.1484 24.9782 32.2825C24.9805 32.4167 25.0092 32.5491 25.0627 32.6722C25.1162 32.7953 25.1934 32.9066 25.2899 32.9999L29.13 36.8399C29.2229 36.9336 29.3335 37.008 29.4554 37.0588C29.5772 37.1095 29.7079 37.1357 29.84 37.1357C29.972 37.1357 30.1027 37.1095 30.2245 37.0588C30.3464 37.008 30.457 36.9336 30.55 36.8399L38.7099 28.6799C38.8115 28.5862 38.8925 28.4726 38.9479 28.3461C39.0033 28.2196 39.0319 28.083 39.0319 27.9449C39.0319 27.8068 39.0033 27.6702 38.9479 27.5437C38.8925 27.4172 38.8115 27.3035 38.7099 27.2099V27.2099Z'
								fill='#06BA63'
							/>
						</g>
					</g>
					<defs>
						<clipPath id='clip0_400_1996'>
							<rect
								width='64'
								height='64'
								fill='white'
							/>
						</clipPath>
						<clipPath id='clip1_400_1996'>
							<rect
								width='24'
								height='24'
								fill='white'
								transform='translate(20 20)'
							/>
						</clipPath>
					</defs>
				</svg>
            </span>
            <div className='space-y-[8px] text-neutral-700 text-center pb-[8px]'>
                <p className='paragraph3Medium'>{ headingText }</p>
                <p className='paragraph2Regular'>{ subText }</p>
            </div>
		</div>
	);
}

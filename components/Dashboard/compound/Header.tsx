import { useState } from 'react';
import Link from 'next/link';
import logo from 'public/images/secondStax.webp';
import Image from 'next/image';
import { NotificationsCard } from '../molecular/NotificationsCard';
import { ProfileCard } from '../molecular/ProfileCard';
import { AddClientForm } from '../molecular/AddClientForm';
// import UserProfileInfo from '../UserProfileInfo';
// import UserContext from '../../utils/userContext';
// import dayjs from 'dayjs';
import { useIdleTimer } from 'react-idle-timer';
import { Button } from '@/components/ui/button';
import { PopupModal } from '../molecular/PopupModal';
import { SideModal } from '../molecular/SideModal';
import { useSession } from '../hooks/useSession';


export function DashboardHeader() {
	const [addMdl, setAddMdl] = useState(false);
	const [showNotifs, setShowNotifs] = useState(false);
	const [showProfileCard, setShowProfileCard] = useState(false);
	const [addClientStep, setAddClientStep] = useState(1);
	const [showProfilePanel, setShowProfilePanel] = useState(false);
	const [userInitials, _setUserInitials] = useState('');
	const [inactivePrompt, setInactivePrompt] = useState(false);
	// const userData = useContext(UserContext);
    const promptBeforeTimeout = 3; //mins
    const { logout } = useSession();

	// useEffect(() => {
	// 	if (userData.user_name) {
	// 		const sp = userData.user_name.split(' ');
	// 		// const sp = JSON.parse(localStorage.getItem('user')).user_name.split(' ')
	// 		let init = '';
	// 		if (sp.length >= 2) {
	// 			init = `${sp[0][0]}${sp[sp.length - 1][0]}`;
	// 		} else {
	// 			init = sp[0][0];
	// 		}
	// 		setUserInitials(init);
	// 	}
	// }, [userData]);

	// function logout() {
		
	// }

	const idleFxn = async () => {
		await logout();
	};

	const resetTimer = () => {
		idleTimer.reset();
	};

	const idleTimer = useIdleTimer({
		promptBeforeIdle: promptBeforeTimeout * 60 * 1000, //prompt 3 mins before timeout
		onPrompt: () => {
			setInactivePrompt(true);
		},
		timeout: 600000, //idle for 10 mins total
		onIdle: idleFxn,
		stopOnIdle: true,
	});

	return (
		<>
            <div className='w-full flex items-center justify-between h-[88px] px-[32px] py-[16px] border-b border-neutral-100 bg-white sticky top-0'>
                <Link href={'/'}>
                    <Image
                        src={logo}
                        height={150}
                        width={150}
                        priority
                        alt='ssx logo'
                    />
                </Link>
				<div className='flex items-center gap-[24px]'>
					{/*add client button*/}
					<Button
						type='button'
						onClick={() => {
							setAddMdl(true);
						}}>
						{/*plus-circle-icon*/}
						<svg
							width='16'
							height='16'
							viewBox='0 0 16 16'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<g clipPath='url(#clip0_2334_615)'>
								<path
									d='M7.99998 1.33331C6.68144 1.33331 5.39251 1.72431 4.29618 2.45685C3.19985 3.18939 2.34537 4.23058 1.84079 5.44876C1.3362 6.66693 1.20418 8.00737 1.46141 9.30058C1.71865 10.5938 2.35359 11.7817 3.28594 12.714C4.21829 13.6464 5.40617 14.2813 6.69938 14.5385C7.99259 14.7958 9.33303 14.6638 10.5512 14.1592C11.7694 13.6546 12.8106 12.8001 13.5431 11.7038C14.2757 10.6075 14.6666 9.31852 14.6666 7.99998C14.6666 7.1245 14.4942 6.25759 14.1592 5.44876C13.8241 4.63992 13.3331 3.90499 12.714 3.28593C12.095 2.66688 11.36 2.17581 10.5512 1.84078C9.74237 1.50575 8.87546 1.33331 7.99998 1.33331ZM7.99998 13.3333C6.94515 13.3333 5.914 13.0205 5.03694 12.4345C4.15988 11.8484 3.47629 11.0155 3.07263 10.041C2.66896 9.06642 2.56334 7.99406 2.76913 6.9595C2.97492 5.92493 3.48287 4.97462 4.22875 4.22874C4.97463 3.48286 5.92494 2.97491 6.9595 2.76912C7.99407 2.56334 9.06642 2.66895 10.041 3.07262C11.0155 3.47629 11.8485 4.15988 12.4345 5.03694C13.0205 5.914 13.3333 6.94515 13.3333 7.99998C13.3333 9.41447 12.7714 10.771 11.7712 11.7712C10.771 12.7714 9.41447 13.3333 7.99998 13.3333ZM10.6666 7.33331H8.66665V5.33331C8.66665 5.1565 8.59641 4.98693 8.47139 4.86191C8.34636 4.73688 8.17679 4.66665 7.99998 4.66665C7.82317 4.66665 7.6536 4.73688 7.52858 4.86191C7.40355 4.98693 7.33332 5.1565 7.33332 5.33331V7.33331H5.33332C5.1565 7.33331 4.98694 7.40355 4.86191 7.52857C4.73689 7.6536 4.66665 7.82317 4.66665 7.99998C4.66665 8.17679 4.73689 8.34636 4.86191 8.47138C4.98694 8.59641 5.1565 8.66665 5.33332 8.66665H7.33332V10.6666C7.33332 10.8435 7.40355 11.013 7.52858 11.1381C7.6536 11.2631 7.82317 11.3333 7.99998 11.3333C8.17679 11.3333 8.34636 11.2631 8.47139 11.1381C8.59641 11.013 8.66665 10.8435 8.66665 10.6666V8.66665H10.6666C10.8435 8.66665 11.013 8.59641 11.1381 8.47138C11.2631 8.34636 11.3333 8.17679 11.3333 7.99998C11.3333 7.82317 11.2631 7.6536 11.1381 7.52857C11.013 7.40355 10.8435 7.33331 10.6666 7.33331Z'
									fill='#F7F9FC'
								/>
							</g>
							<defs>
								<clipPath id='clip0_2334_615'>
									<rect
										width='16'
										height='16'
										fill='white'
									/>
								</clipPath>
							</defs>
						</svg>
						Add a Client
					</Button>
					<div className='h-[40px] w-[1px] bg-neutral-100' />

					{/*notifications button*/}
					<div className='relative'>
						<button
							type='button'
							className={`p-[8px] w-[40px] h-[40px] relative hover:bg-neutral-50 active:bg-neutral-100 rounded-[8px] ${
								showNotifs ? 'bg-neutral-100' : ''
							}`}
							onClick={() => {
								setShowNotifs(true);
							}}>
							<span className='bg-error-500 absolute top-0 right-0 w-[8px] h-[8px] rounded-full' />
							{/*notification icon*/}
							<svg
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<g clipPath='url(#clip0_2334_4)'>
									<path
										d='M18 13.18V10C17.9986 8.58312 17.4958 7.21247 16.5806 6.13077C15.6655 5.04908 14.3971 4.32615 13 4.09V3C13 2.73478 12.8946 2.48043 12.7071 2.29289C12.5196 2.10536 12.2652 2 12 2C11.7348 2 11.4804 2.10536 11.2929 2.29289C11.1054 2.48043 11 2.73478 11 3V4.09C9.60294 4.32615 8.33452 5.04908 7.41939 6.13077C6.50425 7.21247 6.00144 8.58312 6 10V13.18C5.41645 13.3863 4.911 13.7681 4.55294 14.2729C4.19488 14.7778 4.00174 15.3811 4 16V18C4 18.2652 4.10536 18.5196 4.29289 18.7071C4.48043 18.8946 4.73478 19 5 19H8.14C8.37028 19.8474 8.873 20.5954 9.5706 21.1287C10.2682 21.6621 11.1219 21.951 12 21.951C12.8781 21.951 13.7318 21.6621 14.4294 21.1287C15.127 20.5954 15.6297 19.8474 15.86 19H19C19.2652 19 19.5196 18.8946 19.7071 18.7071C19.8946 18.5196 20 18.2652 20 18V16C19.9983 15.3811 19.8051 14.7778 19.4471 14.2729C19.089 13.7681 18.5835 13.3863 18 13.18ZM8 10C8 8.93913 8.42143 7.92172 9.17157 7.17157C9.92172 6.42143 10.9391 6 12 6C13.0609 6 14.0783 6.42143 14.8284 7.17157C15.5786 7.92172 16 8.93913 16 10V13H8V10ZM12 20C11.651 19.9979 11.3086 19.9045 11.0068 19.7291C10.7051 19.5536 10.4545 19.3023 10.28 19H13.72C13.5455 19.3023 13.2949 19.5536 12.9932 19.7291C12.6914 19.9045 12.349 19.9979 12 20ZM18 17H6V16C6 15.7348 6.10536 15.4804 6.29289 15.2929C6.48043 15.1054 6.73478 15 7 15H17C17.2652 15 17.5196 15.1054 17.7071 15.2929C17.8946 15.4804 18 15.7348 18 16V17Z'
										fill='#070B12'
									/>
								</g>
								<defs>
									<clipPath id='clip0_2334_4'>
										<rect
											width='24'
											height='24'
											fill='white'
										/>
									</clipPath>
								</defs>
							</svg>
						</button>
						{showNotifs && (
							<NotificationsCard
								closeNotifCard={(a) => {
									setShowNotifs(a);
								}}
							/>
						)}
					</div>

					{/*user profile button*/}
					<div className='relative'>
						<button
							type='button'
							className='flex items-center'
							onClick={() => {
								setShowProfileCard(!showProfileCard);
							}}>
							<div className='bg-neutral-100 w-[40px] h-[40px] rounded-full flex justify-center items-center'>
								{userInitials}
							</div>
							{/*arrow down*/}
							<svg
								width='16'
								height='16'
								viewBox='0 0 16 16'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<g clipPath='url(#clip0_2059_52561)'>
									<path
										d='M11.3333 6.11336C11.2084 5.98919 11.0395 5.91949 10.8633 5.91949C10.6872 5.91949 10.5182 5.98919 10.3933 6.11336L8.00001 8.47336L5.64001 6.11336C5.5151 5.98919 5.34613 5.91949 5.17001 5.91949C4.99388 5.91949 4.82491 5.98919 4.70001 6.11336C4.63752 6.17533 4.58792 6.24907 4.55408 6.33031C4.52023 6.41154 4.50281 6.49868 4.50281 6.58669C4.50281 6.6747 4.52023 6.76183 4.55408 6.84307C4.58792 6.92431 4.63752 6.99805 4.70001 7.06002L7.52667 9.88669C7.58865 9.94918 7.66238 9.99877 7.74362 10.0326C7.82486 10.0665 7.912 10.0839 8.00001 10.0839C8.08801 10.0839 8.17515 10.0665 8.25639 10.0326C8.33763 9.99877 8.41136 9.94918 8.47334 9.88669L11.3333 7.06002C11.3958 6.99805 11.4454 6.92431 11.4793 6.84307C11.5131 6.76183 11.5305 6.6747 11.5305 6.58669C11.5305 6.49868 11.5131 6.41154 11.4793 6.33031C11.4454 6.24907 11.3958 6.17533 11.3333 6.11336Z'
										fill='#070B12'
									/>
								</g>
								<defs>
									<clipPath id='clip0_2059_52561'>
										<rect
											width='16'
											height='16'
											fill='white'
										/>
									</clipPath>
								</defs>
							</svg>
						</button>
						{showProfileCard && (
							<ProfileCard
								closeCardFn={(a) => {
									setShowProfileCard(a);
								}}
								profileDetsFn={() => {
									setShowProfilePanel(true);
								}}
								logoutFn={logout}
							/>
						)}
					</div>
				</div>
			</div>
			{/* Not sure if multiple modals is the answer here */}
			<SideModal
				showModal={addMdl}
				closeModal={setAddMdl}
				showNavigation
				navButtonAction={() => {}}
				navAreaText={addClientStep === 1 ? 'Add a New Client' : ''}
				disabledNav={addClientStep === 2}>
				<AddClientForm
					actionBtnFn={() => {
						setAddMdl(false);
						setAddClientStep(1);
					}}
					acStep={(a) => {
						setAddClientStep(a);
					}}
				/>
			</SideModal>
			<SideModal
				showModal={showProfilePanel}
				closeModal={(a) => {
					setShowProfilePanel(a);
				}}
				showNavigation
				disabledNav>
				{/* <UserProfileInfo /> */}
			</SideModal>
			<PopupModal
				showModal={inactivePrompt}
				closeFxn={() => {
					setInactivePrompt(false);
				}}
				title='User Inactivity'
				content={`We detected that you have been inactive for a while now. You shall be automatically logged out in ${promptBeforeTimeout} minutes.`}
				primaryBtnText="I'm Here"
				primaryAction={() => {
					resetTimer();
					setInactivePrompt(false);
				}}
				secondaryBtnText='Log Out'
				secondaryAction={logout}
			/>
		</>
	);
}


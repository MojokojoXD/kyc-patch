import { useState } from 'react';
import { AddNewClientSheet } from './AddNewClientSheet';
import { Notifications } from './Notifications';
import { NotificationsCard } from '../molecular/NotificationsCard';
import { ProfileCard } from '../molecular/ProfileCard';
// import UserProfileInfo from '../UserProfileInfo';
// import UserContext from '../../utils/userContext';
// import dayjs from 'dayjs';
import { useIdleTimer } from 'react-idle-timer';
import * as Dashboard from './Layout';
import { PopupModal } from '../molecular/PopupModal';
import { useSession } from '../hooks/useSession';

export function DashboardHeader() {
	const [showNotifs, setShowNotifs] = useState(false);
	const [showProfileCard, setShowProfileCard] = useState(false);
	const [userInitials, _setUserInitials] = useState('');
	const [inactivePrompt, setInactivePrompt] = useState(false);
	// const userData = useContext(UserContext);
	const promptBeforeTimeout = 3; //mins
	const { isRequesting } = useSession();

	const logout = () => {};

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
		<Dashboard.Header>
			<Dashboard.Logo isRequesting={isRequesting} />
			<Dashboard.NavArea>
          <AddNewClientSheet />
          <Dashboard.NavAreaDivider />
          <Notifications/>
				{/*notifications button*/}
				<div className='relative'>
					
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
								// setShowProfilePanel(true);
							}}
							logoutFn={logout}
						/>
					)}
				</div>
			</Dashboard.NavArea>
		</Dashboard.Header>
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

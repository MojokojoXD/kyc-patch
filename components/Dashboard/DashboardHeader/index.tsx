import { AddNewClientSheet } from './AddNewClientSheet';
import { Notifications } from './Notifications';
// import { useIdleTimer } from 'react-idle-timer';
import * as Dashboard from './Layout';
import { SessionMenuPopover } from './SessionMenu';
import { useSession } from '../hooks/useSession';

export function DashboardHeader() {
	// const promptBeforeTimeout = 3; //mins
	const { isRequesting } = useSession();

	// const logout = () => {};

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

	// const idleFxn = async () => {
	// 	await logout();
	// };

	// const resetTimer = () => {
	// 	idleTimer.reset();
	// };

	// const idleTimer = useIdleTimer({
	// 	promptBeforeIdle: promptBeforeTimeout * 60 * 1000, //prompt 3 mins before timeout
	// 	onPrompt: () => {
	// 		// setInactivePrompt(true);
	// 	},
	// 	timeout: 600000, //idle for 10 mins total
	// 	onIdle: idleFxn,
	// 	stopOnIdle: true,
	// });

	return (
	<>
		<Dashboard.Header>
			<Dashboard.Logo isRequesting={isRequesting} />
			<Dashboard.NavArea>
          <AddNewClientSheet />
          <Dashboard.NavAreaDivider />
          <Notifications/>
          <SessionMenuPopover/>
			</Dashboard.NavArea>
		</Dashboard.Header>
		{/* <PopupModal
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
		/> */}
	</>
);
}

import { useIdleTimer } from 'react-idle-timer';
import { useState, useEffect } from 'react';
import { DashboardDialog } from './DashboardDialog';
import { useSession } from '../hooks/useSession';

const IDLE_TIMEOUT = 300_000;

export function IdleDetection()
{
  const { logout } = useSession();
	const [openIdleDialog, setOpenIdleDialog] = useState(false);
	const [logoutCountdown, setLogoutCountdown] = useState(0);

  const onIdle = () => logout();
  const onPrompt = () => setOpenIdleDialog( true );
  const onActive = () =>  setOpenIdleDialog( false );

	const { getRemainingTime, activate } = useIdleTimer({
    onPrompt,
    onActive,
    onIdle,
		timeout: IDLE_TIMEOUT,
		promptBeforeIdle: 30_000,
		throttle: 500,
	});

	useEffect(() => {
		const intervalID = setInterval(() => {
			setLogoutCountdown(Math.ceil(getRemainingTime() / 1000));
		}, 1000);

		return () => clearInterval(intervalID);
	});

	return (
		<DashboardDialog
      onContinue={ () =>activate()}
			open={openIdleDialog}
			onDialogOpen={setOpenIdleDialog}
      header={ 'Still there?' }
      hideCancelBtn
    >
			Inactivity detected. You&apos;ll be logged out in {logoutCountdown} second(s)
		</DashboardDialog>
	);
}

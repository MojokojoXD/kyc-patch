import { MenuBtn } from '../MenuBtn';
import { LogOut } from 'lucide-react';
import { useSession } from '@/components/Dashboard/hooks/useSession';
interface SessionLogoutProps {}

export function SessionLogout({}: SessionLogoutProps) {
	const { logout } = useSession();

	return (
		<MenuBtn
			icon={LogOut}
			label='logout'
			strokeIcon
			onClick={() => logout()}
		/>
	);
}

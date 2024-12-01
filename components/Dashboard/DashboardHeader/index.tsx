import { AddNewClientSheet } from './AddNewClientSheet';
import { Notifications } from './Notifications';
import * as Dashboard from './Layout';
import { SessionMenuPopover } from './SessionMenu';
import { useSession } from '../hooks/useSession';

export function DashboardHeader() {
	const { isRequesting } = useSession();

	return (
		<Dashboard.Header>
			<Dashboard.Logo isRequesting={isRequesting} />
			<Dashboard.WidgetArea>
				<AddNewClientSheet />
				<Dashboard.NavAreaDivider />
				<Notifications />
				<SessionMenuPopover />
			</Dashboard.WidgetArea>
		</Dashboard.Header>
	);
}

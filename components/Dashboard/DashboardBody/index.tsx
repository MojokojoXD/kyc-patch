import * as Dashboard from './Layout';
import { Metrics } from './Metrics';
import { Clients } from './Clients';

export function DashboardBody() {
	return (
		<Dashboard.Main>
			<Dashboard.SideMenu
				renderPortal={(portal, changePortalView) => (
					<Dashboard.Portal current={portal}>
						<Dashboard.View name='metrics'>
							<Metrics onPortalChange={changePortalView} />
						</Dashboard.View>
						<Dashboard.View name='clientele'>
							<Clients />
						</Dashboard.View>
					</Dashboard.Portal>
				)}
			/>
		</Dashboard.Main>
	);
}

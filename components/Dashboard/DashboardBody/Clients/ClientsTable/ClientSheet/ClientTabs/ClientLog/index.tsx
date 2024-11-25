import type { ClientLogEntry } from '../../../../clients';
import { SSXAuditLog } from './SSXAuditLog';
import { format } from 'date-fns';
interface ClientLogProps {
	logs: ClientLogEntry[];
}

export function ClientLog({ logs }: ClientLogProps) {
	return logs && logs.length > 0 ? (
		logs.map((l) => (
			<SSXAuditLog
				key={l.aud_id}
				description={l.aud_frm_act_code}
				timestamp={format(new Date(l.aud_time), 'dd MMM yyyy, k:mm aaa')}
				user={l.aud_usr_id}
			/>
		))
	) : (
		<span className='text-sm font-medium opacity-70'>No logs</span>
	);
}

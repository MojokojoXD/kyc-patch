export interface DashboardClient {
	broker: string;
	client_email: string;
	client_first_name: string;
	client_id: string;
	client_last_name: string;
	type_of_client: string;
	client_phone: string;
	date_created: string;
	status: string;
}

export interface ClientLogEntry {
	aud_id: string;
	aud_transaction_id: string;
	aud_frm_act_code: string;
	aud_action: string;
	aud_usr_id: string;
	aud_time: string;
}

export interface ClientLogsResponse {
	Status: 'SUCC' | 'FAIL';
	data: ClientLogEntry[];
	verifications: ClientVerifications[];
}

export interface ClientTabData extends DashboardClient {
	logs: ClientLogEntry[];
	verifications: ClientVerifications[];
}

export interface ClientVerifications {
	signatory_id: string;
	signatory_name: string;
	signatory_email: string;
	status: 'In progress' | 'verified';
}

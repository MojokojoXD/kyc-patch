import type { PhoneInfo } from '@/types/forms/common';

export interface NewClientPayload {
	clientFirstName: string;
	clientLastName: string;
	clientEmail: string;
	clientPhone: PhoneInfo;
	brokerID?: string;
	typeOfClient: string;
}

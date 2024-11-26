export interface NewClientPayload {
	clientFirstName: string;
	clientLastName: string;
	clientEmail: string;
	clientPhone: string;
	brokerID?: string;
    typeOfClient: string;
    
    [ index: string ]: string;
}

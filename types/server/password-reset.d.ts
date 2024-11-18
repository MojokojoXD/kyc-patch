


export interface PasswordResetResponse {
	Code: string;
	Status: 'SUCC' | 'FAIL';

	Message: string;
}
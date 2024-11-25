import { type BadgeStatus } from "@/components/ui/SSXStatusBadge";
export const clientStatusMapping: Record<string, BadgeStatus> = {
	STARTED: 'initiated',
	SUBMITTED: 'in-progress',
	COMPLETED: 'completed',
	UNKNOWN: 'unknown',
};



export const verificationStatusMapping: Record<string, BadgeStatus> = {
    'IN PROGRESS': 'in-progress',
    'VERIFIED': 'completed'
}
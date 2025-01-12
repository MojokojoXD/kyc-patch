import { createContext } from 'react';
import type { Profile } from '@/types/accounts/user';
import type { RequestJob } from '../lib/requestQuene';
export interface SessionContextSchema {
	isRequesting: boolean;
	request: ( job: RequestJob ) => void;
	logout: () => void;
	profile: Profile | null | undefined;
}

export const sessionContext = createContext<SessionContextSchema | null>(null);

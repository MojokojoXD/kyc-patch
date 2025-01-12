import { useContext } from "react";
import { sessionContext } from '../contexts/sessionContext';
import type { SessionContextSchema } from "../contexts/sessionContext";
export function useSession()
{
	const context = useContext(sessionContext) as SessionContextSchema | null;

	if (!context)
		throw new Error(
			'useSession can only be used within a session context provider'
		);

	return context;
}

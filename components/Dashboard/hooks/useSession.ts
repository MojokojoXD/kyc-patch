import { useContext } from "react";
import { sessionContext } from "../_contexts/sessionContext";
export function useSession()
{
	const context = useContext(sessionContext);

	if (!context)
		throw new Error(
			'useSession can only be used within a session context provider'
		);

	return context;
}

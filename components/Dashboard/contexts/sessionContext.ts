import { createContext } from "react";
import type { Profile } from "@/types/accounts/user";
import { JobFeedbackFn } from "../lib/requestQuene";


export interface SessionContextSchema<TResponseData = unknown>
{
    isRequesting: boolean;
    isLoggedIn: boolean;
    request: JobFeedbackFn<TResponseData>;
    logout: () => void;
    profile: Profile | null | undefined; 
}



export const sessionContext = createContext<SessionContextSchema | null>( null );



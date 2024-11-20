import { createContext } from "react";
import type { Profile } from "@/types/accounts/user";
import { JobFeedbackFn } from "../lib/requestQuene";


export interface SessionContextSchema
{
    isLoggedIn: boolean;
    request: JobFeedbackFn;
    logout: () => void;
    profile: Profile | null | undefined; 
}



export const sessionContext = createContext<SessionContextSchema | null>( null );



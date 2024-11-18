import { createContext } from "react";
import type { Method } from "axios";
import type { Profile } from "@/types/accounts/user";
import type { BaseSSXResponse } from "@/types/server/SSX";


export interface SessionContextSchema
{
    isLoggedIn: boolean;
    request: <T extends BaseSSXResponse>( url: string, method: Method, data?: { [index:string]: unknown } ) => Promise<T | undefined>;
    logout: () => void;
    profile: Profile 
}



export const sessionContext = createContext<SessionContextSchema | null>( null );



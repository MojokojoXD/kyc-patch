import { useEffect } from "react";
import { useSession } from "../hooks/useSession";

export function Metrics()
{
    const { request } = useSession();

    useEffect( () =>
    {
        ( async() =>
        {
            await request( 'metrics', 'GET' );
       })() 
    },[request])

    return null;
}
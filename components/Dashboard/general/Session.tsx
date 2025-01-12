import
{
  sessionContext,
  type SessionContextSchema,
} from '../contexts/sessionContext';
import { type ReactNode, useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import
{
  RequestQueue,
  RequestJob,
} from '../lib/requestQuene';

interface SessionProviderProps extends Pick<SessionContextSchema, 'profile'>
{
  children?: ReactNode;
}

export function Session( { children, profile }: SessionProviderProps )
{
  const router = useRouter();

  const [ isRequesting, setIsRequesting ] = useState( false );
  const [ awaitingJobs, setAwaitingJobs ] = useState<RequestJob[] | null>( null );
  const [ requestJobs, setRequestJobs ] = useState<
    RequestJob[] | null
  >( null );

  const addRequestJob = useCallback( ( job: RequestJob ) =>
  {

    if ( isRequesting )
    {
      setAwaitingJobs( prevAwaitableJobs =>
      {
        if ( !prevAwaitableJobs ) return [ job ];

        return [ ...prevAwaitableJobs, job ];
      } );

      return;
    };

    setRequestJobs( ( prevJobs ) =>
    {
      if ( !prevJobs ) return [ job ];

      prevJobs.push( job );
      return prevJobs;
    } );
  }, [ isRequesting ] );

  const logout = useCallback( async () =>
  {
    try
    {

      const res = await fetch( '/api/dashboard/proxy/logout', { 
        method: 'POST',
        credentials: 'include',
        referrerPolicy: 'origin'
       } );

      if ( res.ok )
      {
        sessionStorage.clear();
        router.replace( '/' );
      };

    } catch ( error )
    {
      console.log( error );
    }

  }, [ router ] );

  useEffect( () =>
  {
    if ( awaitingJobs && !requestJobs && !isRequesting )
      setRequestJobs( [ ...awaitingJobs ] );
    

  }, [ awaitingJobs, requestJobs, isRequesting ] );

  useEffect( () =>
  {
    ( async () =>
    {
      if ( requestJobs && requestJobs.length > 0 )
      {
        setIsRequesting( true );
        const queue = new RequestQueue( requestJobs );
        const isProcessed = await queue.process();

        !isProcessed && logout();

        setRequestJobs( null );
        setIsRequesting( false );
      }
    } )();
  }, [ requestJobs, logout ] );

  const sessionContextValue = useMemo( () => ( {
    profile,
    isRequesting,
    request: addRequestJob,
    logout
  } ), [ profile, isRequesting, addRequestJob, logout ] );

  return (
    <sessionContext.Provider
      value={ sessionContextValue }>
      { children }
    </sessionContext.Provider>
  );
}

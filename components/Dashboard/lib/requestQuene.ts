import type { RequestInit } from 'next/dist/server/web/spec-extension/request';
export enum RequestStatus
{
	PENDING = 'PENDING',
	PROCESSING = 'PROCESSING',
	COMPLETED = 'COMPLETED',
	FAILED = 'FAILED',
}
export interface RequestJob extends Omit<RequestInit, 'body'> {
  protectedEndpoint: string;
  onSuccess: (data: Response) => void | Promise<void>;
  onError: (err: unknown) => void;
  url?: string;

  data?: Record<string, unknown>

}

interface Queueable {
	dequeue: () => void;

  process: () => void;
  
}

export class RequestQueue implements Queueable {
	private jobsQueue: RequestJob[] = [];

	constructor( jobs: RequestJob[] ) {
		this.jobsQueue = [ ...jobs ]
	}
	dequeue() {
		this.jobsQueue.shift();
	}

	async process() {
    const requestPromises = this.jobsQueue.map( r => this.requestJobBuilder( r ) )
    
    try {
      
      const res = await Promise.all( requestPromises );

      this.jobsQueue.forEach( ( j, i ) => j.onSuccess( res[ i ] ) );

      return true;

    } catch ( error )
    {
      
      console.log( error );

    }

    return true
  }
  
  private requestJobBuilder( config: RequestJob )
  {
    const {
    protectedEndpoint,
    url,
    onSuccess,
      onError,
    data,
      ...otherConfig } = config;
    
    let body: string | undefined = undefined
    
    if ( typeof window === 'undefined' ) throw new Error( 'RequestQueue can only be used client side' );

  if (!protectedEndpoint && !url)
    throw new Error( 'Dashboard endpoint or an external url must be provided to send a request' );
  
    if ( otherConfig.method === 'POST' && data )
    {
      body = JSON.stringify( data );
  }
  

    const resource = url ? url : '/api/dashboard/proxy' + protectedEndpoint;
    

  return new Promise<Response>( async ( resolve, reject ) =>
  {

      try {
        const res = await fetch( resource, {
          ...otherConfig,
          credentials: url ? 'omit' : 'include',
          referrerPolicy: 'origin',
          body: body,
          headers: {
            ...( otherConfig.headers ? { ...otherConfig.headers }  : { 'Content-Type': 'application/json' })
          }
        } );

        if ( res.ok )
        {
          resolve( res );
          return;
        }

        throw res
        
      } catch (error) {
        
        console.log( error )

        reject(error);
      }
  })
  }
}

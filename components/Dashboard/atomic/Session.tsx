import {
	sessionContext,
	type SessionContextSchema,
} from '../contexts/sessionContext';
import { type ReactNode, useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import {
	RequestQueue,
	Job,
	Feedback,
	JobFeedbackFn,
} from '../lib/requestQuene';
import { protectedAxiosInstance } from '@/components/Dashboard/lib/http/axios';

interface SessionProviderProps extends Pick<SessionContextSchema, 'profile'> {
	children?: ReactNode;
}

export function Session({ children,profile}: SessionProviderProps) {
	const router = useRouter();

	const [isRequesting, setIsRequesting] = useState(true);
	const [requestJobs, setRequestJobs] = useState<
		{ job: Job; feedback: Feedback }[] | null
	>(null);

	const addRequestJob = useCallback<JobFeedbackFn>((job, feedback) => {
		setRequestJobs((prevJobs) => {
			if (!prevJobs) return [{ job, feedback }];

			prevJobs.push({ job, feedback });
			return prevJobs;
		});
	}, []);

  const logout = useCallback( async () =>
  {
    try
    {
      
      const res = await protectedAxiosInstance.post( '/api/dashboard/logout', {}, { baseURL: '' } );

      if( res.status === 200 ) router.replace('/');

    } catch (error) {
      console.log(error) 
    }

	}, [router]);

	useEffect(() => {
		(async () => {
			if (requestJobs && requestJobs.length > 0) {
				setIsRequesting(true);

				const queue = new RequestQueue();

				queue.enqueue(...requestJobs);

        const isProcessed = await queue.process();
        
        !isProcessed && logout();

				setRequestJobs(null);
				setIsRequesting(false);
			}
		})();
  }, [ requestJobs, logout ] );

  const sessionContextValue = useMemo( () => ( {
    profile,
    isRequesting,
    request: addRequestJob,
    logout
  }),[profile,isRequesting, addRequestJob,logout])

	return (
		<sessionContext.Provider
			value={ sessionContextValue }>
			{children}
		</sessionContext.Provider>
	);
}

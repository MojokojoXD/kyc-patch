import {
	sessionContext,
	type SessionContextSchema,
} from '../contexts/sessionContext';
import { type ReactNode, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
	RequestQueue,
	Job,
	Feedback,
	JobFeedbackFn,
} from '../lib/requestQuene';
import { protectedAxiosInstance } from '@/lib/http/axios';

interface SessionProviderProps extends Pick<SessionContextSchema, 'profile'> {
	children?: ReactNode;
}

export function Session({ children,profile}: SessionProviderProps) {
	const router = useRouter();

	// const [userProfile] = useState<typeof profile>(profile);
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

				await queue.process();

				setRequestJobs(null);
				setIsRequesting(false);
			}
		})();
	}, [requestJobs]);

	return (
		<sessionContext.Provider
			value={{
				profile,
				isRequesting,
				request: addRequestJob,
				logout,
			}}>
			{children}
		</sessionContext.Provider>
	);
}

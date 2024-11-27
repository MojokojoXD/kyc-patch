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
import { Profile } from '@/types/accounts/user';
import { protectedAxiosInstance } from '@/lib/http/axios';

interface SessionProviderProps extends Pick<SessionContextSchema, 'profile'> {
	children?: ReactNode;
}

export function Session({ children,profile}: SessionProviderProps) {
	const router = useRouter();

	const [userProfile, setUserProfile] = useState<typeof profile>(profile);
	const [isRequesting, setIsRequesting] = useState(true);
	const [requestJobs, setRequestJobs] = useState<
		{ job: Job; feedback: Feedback }[] | null
	>(() => {
		if (!profile)
			return [
				{
					job: { url: '/users/self', method: 'GET' },
					feedback: function (res, error, status) {
						if (status === 'COMPLETED') {
							setUserProfile(res?.profile[0]);
							return;
						}

						if (status === 'FAILED') console.log(error);
					} satisfies Feedback<{ profile: Profile[] }>,
				},
			];
		return [];
	});

	const addRequestJob = useCallback<JobFeedbackFn>((job, feedback) => {
		setRequestJobs((prevJobs) => {
			if (!prevJobs) return [{ job, feedback }];

			prevJobs.push({ job, feedback });
			return prevJobs;
		});
	}, []);

  const logout = useCallback( async () =>
  {
    
		const res = await protectedAxiosInstance.post('logout', {});

		if (res.status === 0) {
			router.replace('/');
			return;
		}

		router.replace('/');
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
				profile: userProfile,
				isRequesting,
				request: addRequestJob,
				logout,
			}}>
			{children}
		</sessionContext.Provider>
	);
}

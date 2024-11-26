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

interface SessionProviderProps extends Pick<SessionContextSchema, 'profile'> {
	token: string;
	children: ReactNode;
}

const ACCESS_TOKEN_IDENTIFIER = 'SSX_ACCESS_TOKEN';

export function Session({ children, token, profile }: SessionProviderProps) {
	const router = useRouter();

	const [userProfile, setUserProfile] = useState<typeof profile>(profile);
    const [ isRequesting, setIsRequesting ] = useState( true );
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

	const logout = useCallback(() => {
		sessionStorage.removeItem(ACCESS_TOKEN_IDENTIFIER);
		router.replace('/');
	}, [router]);

	const setNewAccessToken = (token: string) =>
		sessionStorage.setItem(ACCESS_TOKEN_IDENTIFIER, token);

	const getAccessToken = () =>
		typeof sessionStorage !== 'undefined' &&
		sessionStorage.getItem(ACCESS_TOKEN_IDENTIFIER);

	if (token) {
		setNewAccessToken(token);
	} else if (!getAccessToken()) {
		typeof window !== 'undefined' && logout();
	}

	useEffect(() => {
		(async () => {
            if ( requestJobs && requestJobs.length > 0 )
            {
                setIsRequesting( true );

				const queue = new RequestQueue();

				queue.enqueue(...requestJobs);

				await queue.process();

                setRequestJobs( null );
                setIsRequesting( false );
			}
		})();
	}, [requestJobs]);

	return (
		<sessionContext.Provider
			value={{
                profile: userProfile,
                isRequesting,
				isLoggedIn:
					token.length > 0 ||
					(typeof sessionStorage !== 'undefined' &&
						sessionStorage.getItem(ACCESS_TOKEN_IDENTIFIER) !== undefined),
				request: addRequestJob,
				logout,
			}}>
			{children}
		</sessionContext.Provider>
	);
}

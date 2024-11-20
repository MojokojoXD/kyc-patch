import {
	sessionContext,
	type SessionContextSchema,
} from '../contexts/sessionContext';
import {
	type ReactNode,
	useState,
	useEffect,
	useCallback,
} from 'react';
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

	const [requestJobs, setRequestJobs] = useState<
		{ job: Job; feedback: Feedback }[]
	>(() => {
		if (!profile)
			return [
				{
					job: { url: 'get-profile', method: 'GET' },
					feedback: function (res, error, status) {
						if (status === 'COMPLETED') {
							setUserProfile(res?.profile[ 0 ]);
							return;
						}

						if (status === 'FAILED') console.log(error);
                    } satisfies Feedback<{ profile: Profile[]; } >,
				},
			];
		return [];
	});

	const addRequestJob = useCallback<JobFeedbackFn>(
		(job, feedback) =>
			setRequestJobs((prevJobs) => {
				prevJobs.push({ job, feedback });
				return prevJobs;
			}),
		[]
	);

	const logout = useCallback(() => {
		sessionStorage.removeItem(ACCESS_TOKEN_IDENTIFIER);
		router.replace('/');
	}, [router]);

	const setNewAccessToken = (token: string) =>
		sessionStorage.setItem(ACCESS_TOKEN_IDENTIFIER, token);

	const getAccessToken = () => sessionStorage.getItem(ACCESS_TOKEN_IDENTIFIER);

	useEffect(() => {
		(() => {
			if (token) {
				setNewAccessToken(token);
			} else if (!getAccessToken()) logout();
		})();
	}, [logout, profile, token, addRequestJob]);

	useEffect(() => {
		(async () => {
            if ( requestJobs.length > 0 )
            {
                const queue = new RequestQueue();

				queue.enqueue(...requestJobs);

				await queue.process();
            }
            
		})();
	}, [requestJobs]);

    console.log(userProfile)
	return (
		<sessionContext.Provider
			value={{
				profile: userProfile,
				isLoggedIn:
					token.length > 0 ||
					(typeof sessionStorage !== 'undefined' &&
						sessionStorage.getItem(ACCESS_TOKEN_IDENTIFIER) !== undefined),
				request: addRequestJob,
				logout: () => {},
			}}>
			{children}
		</sessionContext.Provider>
	);
}

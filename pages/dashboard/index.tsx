import {
	type GetServerSideProps,
	type InferGetServerSidePropsType,
} from 'next';
import type { Profile } from '@/types/accounts/user';
import { DashboardHeader } from '@/components/Dashboard/DashboardHeader';
import { DashboardBody } from '@/components/Dashboard/DashboardBody';
import { Session } from '@/components/Dashboard/atomic/Session';
import { IdleDetection } from '@/components/Dashboard/atomic/IdleDetection';
import { protectedServerRequest } from '@/components/Dashboard/lib/http/axios';

interface InitialDashboardProps {
	profile: Profile | null;
}

export const getServerSideProps = (async ({ req }) => {
	const token = req.cookies['token'];
	const profileCookie = req.cookies['securedRefreshtokenCookie'];

	if (!profileCookie || !token) {
		return {
			redirect: {
				permanent: true,
				destination: '/',
			},
		};
	}

	try {
		const ssxRes = await protectedServerRequest(
			{
        endpoint: '/users/self',
        method:'GET',
				securityHeaders: req.cookies
			}
    );
    
    if ( typeof ssxRes === 'string' )
      throw ssxRes

    const [ data ] = ssxRes

		return {
			props: {
				profile: ( data as { profile: Profile[] } ).profile[0] ?? null,
			},
		};
	} catch (error) {
		console.log(error);

		return {
			props: {
				profile: null,
			},
		};
	}
}) satisfies GetServerSideProps<InitialDashboardProps>;

const Dashboard = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	return (
		<Session {...props}>
			<IdleDetection />
			<DashboardHeader />
			<DashboardBody />
		</Session>
	);
};

export default Dashboard;

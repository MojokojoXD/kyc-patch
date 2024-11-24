import {
	type GetServerSideProps,
	type InferGetServerSidePropsType,
} from 'next';
import type { Profile } from '@/types/accounts/user';
import { DashboardHeader } from '@/components/Dashboard/compound/DashboardHeader';
import { DashboardBody } from '@/components/Dashboard/DashboardBody';
import { Session } from '@/components/Dashboard/atomic/Session';

interface InitialDashboardProps {
	token: string;

	profile: Profile | null;
}

export const getServerSideProps = (async ({ query }) => {
	if (query.profile && query.token) {
		try {
			return {
				props: {
					token: query.token as string,
					profile: JSON.parse(query.profile as string) as Profile,
				},
			};
		} catch (error) {
			console.log(error);
			return {
				props: {
					token: '',
					profile: null,
				},
			};
		}
	}

	return {
		props: {
			token: '',
			profile: null,
		},
	};
}) satisfies GetServerSideProps<InitialDashboardProps>;

const Dashboard = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	return (
		<Session {...props}>
			<DashboardHeader />
			<DashboardBody />
		</Session>
	);
};

export default Dashboard;

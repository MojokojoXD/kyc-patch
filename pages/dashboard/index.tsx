import {
	type GetServerSideProps,
	type InferGetServerSidePropsType,
} from 'next';
import type { Profile } from '@/types/accounts/user';
import { DashboardHeader } from '@/components/Dashboard/DashboardHeader';
import { DashboardBody } from '@/components/Dashboard/DashboardBody';
import { Session } from '@/components/Dashboard/atomic/Session';
import { IdleDetection } from '@/components/Dashboard/atomic/IdleDetection';

interface InitialDashboardProps {
	profile: Profile | null;
}

export const getServerSideProps = ( async ( { res,query } ) =>
{
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

	if (query.profile && query.token) {
		try {
			return {
				props: {
					profile: JSON.parse(query.profile as string) as Profile,
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
	}

	return {
		props: {
			profile: null,
		},
	};
}) satisfies GetServerSideProps<InitialDashboardProps>;

const Dashboard = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) =>
{
  return (
    <Session { ...props }>
      <IdleDetection/>
			<DashboardHeader />
			<DashboardBody />
		</Session>
	);
};

export default Dashboard;

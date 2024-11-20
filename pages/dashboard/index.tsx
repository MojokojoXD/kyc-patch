import {
	type GetServerSideProps,
	type InferGetServerSidePropsType,
} from 'next';
import type { Profile } from '@/types/accounts/user';
import { DashboardHeader as Header } from '@/components/Dashboard/compound/Header';
import { Session } from '@/components/Dashboard/atomic/Session';
import type { Metric } from '@/components/Dashboard/types/dashboard';
import { Metrics } from '@/components/Dashboard/molecular/Metrics';
// import SideMenu from '../../src/components/SideMenu';
// import ProtectedPage from '../../src/components/ProtectedPage';


interface InitialDashboardProps 
{
    token: string;

    profile: Profile | null;
	metrics: Metric [];
}

export const getServerSideProps = (async ({ query }) => {
	if (query.profile && query.token) {
		try {
			return {
				props: {
					token: query.token as string,
					profile: JSON.parse(query.profile as string) as Profile,
					metrics: [] as Metric [],
				},
			};
		} catch (error) {
			console.log(error);
			return {
				props: {
					token: '',
					profile: null,
					metrics: [],
				},
			};
		}
	}

	return {
		props: {
			token: '',
			profile: null,
			metrics: [],
		},
	};
}) satisfies GetServerSideProps<InitialDashboardProps>;

const Dashboard = ({
    metrics,
    ...props
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {


	return (
		<Session { ...props }>
			<div className='relative h-screen w-full bg-white'>
				<Header />
				<div >
					{/* <SideMenu active={router.pathname} /> */}
                    <div className='w-full flex flex-col'>
                        <Metrics/>
                    </div>
				</div>
			</div>
        </Session>
	);
};

export default Dashboard;

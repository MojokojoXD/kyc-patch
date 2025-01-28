import
  {
    type GetServerSideProps,
    type InferGetServerSidePropsType,
  } from 'next';
import type { Profile } from '@/types/accounts/user';
import { DashboardHeader } from '@/components/Dashboard/DashboardHeader';
import { DashboardBody } from '@/components/Dashboard/DashboardBody';
import { Session } from '@/components/Dashboard/general/Session';
import { IdleDetection } from '@/components/Dashboard/general/IdleDetection';
import { BASE_URL } from '@/utils/vars/uri';

interface InitialDashboardProps
{
  profile: Profile | null;
}

export const getServerSideProps = ( async ( { req } ) =>
{
  // const profileCookie = req.cookies[ 'securedRefreshtokenCookie' ];

  // if ( !profileCookie )
  // {
  //   return {
  //     redirect: {
  //       permanent: true,
  //       destination: '/',
  //     },
  //   };
  // }

  try
  {

    const headers = new Headers()

    Object.keys( req.headers ).forEach( k => headers.append( k, req.headers[k] as string) )

    const ssxRes = await fetch( BASE_URL + '/users/self',
      {
        method: 'GET',
        referrerPolicy: 'origin',
        credentials: 'include',
        headers: headers
      }
    );
    
    if ( ssxRes.ok )
    {
      const data: { profile: Profile[] } = await ssxRes.json();

      return {
        props: {
          profile: data.profile[0]
        }
      }
    }

    return {
      redirect: {
        permanent: true,
        destination: '/'
      }    
    }
     
  } catch ( error )
  {
    console.log( error );

    return {
      props: {
        profile: null,
      },
    };
  }
} ) satisfies GetServerSideProps<InitialDashboardProps>;

const Dashboard = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) =>
{

  return (
    <Session { ...props }>
      {/* <IdleDetection /> */ }
      <DashboardHeader />
      <DashboardBody />
    </Session>
  );
};

export default Dashboard;

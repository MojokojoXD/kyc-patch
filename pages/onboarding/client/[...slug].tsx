import UAPContent from '../../../components/forms/__KYC__/preface/UAPContent';
import { FormLayout } from '@/components/forms/FormLayout';
import type { GetServerSidePropsContext } from 'next';
import { UserActions } from '@/utils/clientActions/userActions';
import type { BrokerDetails } from '@/types/forms/broker';
import { useRouter } from 'next/router';

export async function getServerSideProps( {
  params,
}: GetServerSidePropsContext )
{
  try
  {
    if ( !params || !params.slug )
      throw new Error( 'malformed or missing onboarding ids' );

    const [ clientID, submissionID ] = params.slug as string[];

    const isValid = await UserActions.isClientIdValid( clientID );

    if ( !isValid )
      return {
        notFound: true,
      };

    const broker = await UserActions.getUserAndBrokerInfo( clientID, submissionID );

    return broker
      ? {
        props: {
          clientID,
          submissionID,
          broker,
          clientType: broker.type_of_client
        },
      }
      : {
        notFound: true,
      };
  } catch ( error )
  {
    console.log( error );
    return {
      notFound: true,
    };
  }
}

export default function OnboardingPage( {
  clientID,
  broker,
  submissionID,
  clientType
}: {
  clientID: string;
  submissionID: string;
  broker: BrokerDetails;
  clientType: string;
} )
{
  const router = useRouter();

  const getUAPAgreementHandler = ( decisionTaken: boolean ) => decisionTaken && router.replace( `/onboarding/${ clientType.toLowerCase() }?c_id=${ clientID }&b_code=${ broker.org_code }&submission=${ submissionID }` );


  return (
    <>
      <FormLayout>
        <UAPContent getUAPAgreement={ getUAPAgreementHandler } />
      </FormLayout>
    </>
  );
}

import UAPContent from '../../../components/PageComponents/onboarding/preface/UAPContent';
import KycFormOptions from '../../../components/PageComponents/onboarding/preface/KycFormOptions';
import { useState, useContext, useEffect } from 'react';
import { FormLayout } from '@/components/UIcomponents/FormLayout';
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { UserActions } from '@/utils/clientActions/userActions';
import { UserContext } from '@/Contexts/UserProfileProvider';
import Loading from '@/components/UIcomponents/Loading';
import type { OnboardingFacts } from '@/Contexts/UserProfileProvider';

export async function getServerSideProps({
	req,
    res,
    params
}: GetServerSidePropsContext): Promise<
	GetServerSidePropsResult<OnboardingFacts>
> {
    try
    {
        if ( !params || !params.slug )
            throw new Error( 'malformed or missing onboarding ids' );

		const [clientID, submissionID] = params.slug as string[];

		const isValid = await UserActions.isClientIdValid(clientID);

		if (!isValid)
			return {
				notFound: true,
			};

		const broker = await UserActions.getUserAndBrokerInfo(
			clientID,
			submissionID
		);

		return broker
			? {
					props: {
						clientID,
						broker,
					},
			  }
			: {
					notFound: true,
			  };
	} catch (error) {
		console.log(error);
		return {
			notFound: true,
		};
	}
}

export default function OnboardingPage({ clientID, broker }: OnboardingFacts) {
	const [UAPDecided, setUAPDecided] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	//read app wide context
	const appWideData = useContext(UserContext);

	const getUAPAgreementHandler = (decision: boolean) => setUAPDecided(decision);

    const initOnboardingIds = () =>
    {
        appWideData?.getOnboardingFacts( {
            clientID,
            broker
        })
	};

	useEffect(() => {
		initOnboardingIds();
	}, []);

	return (
		<>
			{isLoading && <Loading />}
			<FormLayout>
				{UAPDecided ? (
					<KycFormOptions />
				) : (
					<UAPContent getUAPAgreement={getUAPAgreementHandler} />
				)}
			</FormLayout>
		</>
	);
}

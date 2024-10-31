import UAPContent from '../../../components/pages/onboarding/forms/preface/UAPContent';
import KycFormOptions from '../../../components/pages/onboarding/forms/preface/KycFormOptions';
import { useState, useContext, useEffect, useRef } from 'react';
import { FormLayout } from '@/components/UIcomponents/FormLayout';
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { UserActions } from '@/utils/clientActions/userActions';
import { UserContext } from '@/Contexts/UserProfileProvider';
// import Loading from '@/components/UIcomponents/Loading';
import type { OnboardingFacts } from '@/Contexts/UserProfileProvider';

export async function getServerSideProps({
	params,
}: GetServerSidePropsContext): Promise<
	GetServerSidePropsResult<OnboardingFacts>
> {
	try {
		if (!params || !params.slug)
			throw new Error('malformed or missing onboarding ids');

		const [clientID, submissionID] = params.slug as string[];

		const isValid = await UserActions.isClientIdValid(clientID);

		if (!isValid)
			return {
				notFound: true,
			};

		const broker = await UserActions.getUserAndBrokerInfo(clientID, submissionID);

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

	//read app wide context
	const appWideData = useRef(useContext(UserContext));

	const getUAPAgreementHandler = (decision: boolean) => setUAPDecided(decision);

	useEffect(() => {
		if (appWideData && appWideData.current) {
			appWideData.current.getOnboardingFacts({
				clientID,
				broker,
			});
		}
	}, [appWideData, clientID, broker]);

	return (
		<>
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

import UAPContent from '../../../components/pages/onboarding/forms/preface/UAPContent';
import KycFormOptions from '../../../components/pages/onboarding/forms/preface/KycFormOptions';
import { useState } from 'react';
import { FormLayout } from '@/components/UIcomponents/FormLayout';
import type { GetServerSidePropsContext } from 'next';
import { UserActions } from '@/utils/clientActions/userActions';
import type { BrokerDetails } from '@/types/forms/broker';

export async function getServerSideProps({
	params,
}: GetServerSidePropsContext) {
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

export default function OnboardingPage({
	clientID,
	broker,
}: {
	clientID: string;
	broker: BrokerDetails;
}) {
	const [UAPDecided, setUAPDecided] = useState<boolean>(false);

	//read app wide context

	const getUAPAgreementHandler = (decision: boolean) => setUAPDecided(decision);

	return (
		<>
			<FormLayout>
				{UAPDecided ? (
					<KycFormOptions
						clientID={clientID}
						orgCode={broker.org_code}
					/>
				) : (
					<UAPContent getUAPAgreement={getUAPAgreementHandler} />
				)}
			</FormLayout>
		</>
	);
}

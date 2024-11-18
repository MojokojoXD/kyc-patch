import UAPContent from '../../../components/forms/preface/UAPContent';
import KycFormOptions from '../../../components/forms/preface/KycFormOptions';
import { useState } from 'react';
import { FormLayout } from '@/components/FormLayout';
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
						submissionID,
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
	submissionID,
}: {
	clientID: string;
	submissionID: string;
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
						submissionID={submissionID}
					/>
				) : (
					<UAPContent getUAPAgreement={getUAPAgreementHandler} />
				)}
			</FormLayout>
		</>
	);
}

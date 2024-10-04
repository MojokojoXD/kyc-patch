import UAPContent from '../../../components/PageComponents/onboarding/preface/UAPContent';
import KycFormOptions from '../../../components/PageComponents/onboarding/preface/KycFormOptions';
import { useState, useContext,useEffect } from 'react';
import { FormLayout } from '@/components/UIcomponents/FormLayout';
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { UserActions } from '@/utils/clientActions/userActions';
import { UserContext } from '@/Contexts/UserProfileProvider';
import Loading from '@/components/UIcomponents/Loading';

interface OnboardingPageProps {
	clientID: string;
	submissionID: string;
}

export async function getServerSideProps({
	req,
	res,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<OnboardingPageProps>> {
	try {
		const params = req.url?.split('/client/').at(1);

		const onboardingIDs = params?.split('/');

        if ( !onboardingIDs || onboardingIDs?.length !== 2 )
        {
            throw new Error( 'malformed or missing onboarding ids' );
        }

        const [ clientID, submissionID ] = onboardingIDs
        
		const isValid = await UserActions.isClientIdValid(clientID);

		return isValid
			? {
					props: {
						clientID,
						submissionID,
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
	submissionID,
}: OnboardingPageProps) {
	const [UAPDecided, setUAPDecided] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	//read app wide context
	const appWideData = useContext(UserContext);

	const getUAPAgreementHandler = (decision: boolean) => setUAPDecided(decision);

	const initOnboardingIds = async () => {
		try {
			setIsLoading(true);

			const broker = await UserActions.getUserAndBrokerInfo(
				clientID,
				submissionID
			);

			if (!broker) {
				setIsLoading(false);
				return;
			}

			appWideData?.getOnboardingFacts({
				clientID: clientID,
				broker: { ...broker },
			});

			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		initOnboardingIds();
	}, []);

    return (
        <>
            { isLoading && <Loading/> }
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

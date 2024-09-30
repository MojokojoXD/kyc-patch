import UAPContent from '../../../components/PageComponents/onboarding/preface/UAPContent';
import KycFormOptions from '../../../components/PageComponents/onboarding/preface/KycFormOptions';
import { useState } from 'react';
import { FormLayout } from '@/components/UIcomponents/FormLayout';

export default function Onboarding() {
	const [UAPDecided, setUAPDecided] = useState<boolean>(false);

	const getUAPAgreementHandler = (decision: boolean) => setUAPDecided(decision);

	return (
			<FormLayout>
				{UAPDecided ? (
					<KycFormOptions />
				) : (
					<UAPContent getUAPAgreement={getUAPAgreementHandler} />
				)}
			</FormLayout>
	);
}

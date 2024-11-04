import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
	FormText,
} from '@/components/UIcomponents/FormLayout';
import type { FormStep } from '@/types/Components/onboarding';
import FormFactory from '@/components/UIcomponents/FormFactory';
import { afrinvestPrivacyPolicyModel } from './model/afrinvestPrivacyPolicyModel';
import { useFetchMarkdown } from '@/components/pages/onboarding/forms/utils/customHooks/useFetchMarkdown';
import Markdown from 'react-markdown';
import { Ellipsis } from 'lucide-react';

export const AfrinvestPrivacyPolicy: FormStep = () => {
	const [policyText, isLoading, error] = useFetchMarkdown(
		'afrinvestPrivacyPolicy'
	);

	if (error) {
		console.error(error);
		return (
			<p className='p-10'>Failed to load resource. Please try again later!</p>
		);
	}

	return (
		<>
			<FormHeader>
				<FormTitle>Privacy Policy - Afrinvest</FormTitle>
				<FormSubHeader>
					Please read and consent to the privacy policy below.
				</FormSubHeader>
			</FormHeader>
			<FormContent>
				<FormText>
					{isLoading ? (
						<Ellipsis className='h-5 w-5 animate-pulse' />
					) : (
						<Markdown skipHtml>{policyText as string}</Markdown>
					)}
				</FormText>
				<div>
					{afrinvestPrivacyPolicyModel.map((f) => (
						<FormFactory
							key={f.name}
							{...f}
						/>
					))}
				</div>
			</FormContent>
		</>
	);
};

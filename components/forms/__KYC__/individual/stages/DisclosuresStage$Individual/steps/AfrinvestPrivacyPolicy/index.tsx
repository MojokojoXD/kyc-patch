import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
	FormText,
} from '@/components/forms/FormLayout';
import type { FormStep } from '@/types/Components/onboarding';
import FormFactory from '@/components/forms/FormFactory';
import { afrinvestPrivacyPolicyModel } from './model/afrinvestPrivacyPolicyModel';
import { useFetchMarkdown } from '@/components/forms/utils/customHooks/useFetchMarkdown';
import Markdown from 'react-markdown';
import { DisclosuresSkeleton } from '@/components/ui/CompoundUI/Skeletons/DisclosuresSkeleton';

export const AfrinvestPrivacyPolicy: FormStep = () => {
	const [policyText, isLoading, error] = useFetchMarkdown(
		'afrinvestPrivacyPolicy'
	);

	if (error) {
		console.error(error);
		return <p className='p-10'>Failed to load resource. Please try again later!</p>;
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
						<DisclosuresSkeleton/>
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

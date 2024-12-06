import {
	FormHeader,
	FormTitle,
	FormContent,
	FormText,
} from '@/components/forms/FormLayout';
import FormFactory from '@/components/forms/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';
import { kestrelTermsModel$Corporate } from './model/kestrelTermModel$Corporate';
import Markdown from 'react-markdown';
import { useFetchMarkdown } from '@/components/forms/utils/customHooks/useFetchMarkdown';
import { DisclosuresSkeleton } from '@/components/ui/CompoundUI/Skeletons/DisclosuresSkeleton';

export const KestrelTerms$Corporate: FormStep = () => {
	const [termsText, isLoading, error] = useFetchMarkdown('kestrelTerms');

	if (error) {
		console.log(error);
		return (
			<p className='p-10'>Failed to load resource. Please try again later!</p>
		);
	}

	return (
		<>
			<FormHeader>
				<FormTitle>Terms and Conditions - Kestrel Capital</FormTitle>
			</FormHeader>
			<FormContent>
				<>
					<FormText>
						{isLoading ? (
							<DisclosuresSkeleton />
						) : (
							<Markdown skipHtml>{termsText as string}</Markdown>
						)}
					</FormText>
					{kestrelTermsModel$Corporate.map((f) => (
						<FormFactory
							key={f.name}
							{...f}
						/>
					))}
				</>
			</FormContent>
		</>
	);
};

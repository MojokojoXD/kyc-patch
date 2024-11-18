import {
	FormHeader,
	FormTitle,
	FormContent,
	FormText,
} from '@/components/FormLayout';
import FormFactory from '@/components/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';
import { kestrelTermsModel$Corporate } from './model/kestrelTermModel$Corporate';
import Markdown from 'react-markdown';
import { useFetchMarkdown } from '@/components/forms/utils/customHooks/useFetchMarkdown';
import { Ellipsis } from 'lucide-react';

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
							<Ellipsis className='w-5 h-5 animate-pulse' />
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

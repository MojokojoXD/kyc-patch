import {
	FormHeader,
	FormTitle,
	FormContent,
	FormText,
} from '@/components/forms/FormLayout';
import { Ellipsis } from 'lucide-react';
import type { FormStep } from '@/types/Components/onboarding';
import { kestrelTermsModel$Individual } from './model/kestrelTermsModel$Individual';
import FormFactory from '@/components/forms/FormFactory';
import { useFetchMarkdown } from '@/components/forms/utils/customHooks/useFetchMarkdown';
import Markdown from 'react-markdown';

export const KestrelTerms$Individual: FormStep = () => {
	const [kestrelTermsText, isLoading, error] = useFetchMarkdown('kestrelTerms');

	if (error) {
		console.error(error);
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
				<FormText className='max-h-96 overflow-auto'>
					{isLoading ? (
						<Ellipsis className='h-5 w-5 animate-pulse' />
					) : (
						<Markdown skipHtml>{kestrelTermsText as string}</Markdown>
					)}
				</FormText>
				<div className='space-y-10 py-5'>
					{kestrelTermsModel$Individual.map((f) => (
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

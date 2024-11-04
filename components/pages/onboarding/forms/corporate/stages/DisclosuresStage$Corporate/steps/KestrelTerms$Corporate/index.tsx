import {
	FormHeader,
	FormTitle,
	FormContent,
	FormText,
} from '@/components/UIcomponents/FormLayout';
import FormFactory from '@/components/UIcomponents/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';
import { kestrelTermsModel$Corporate } from './model/kestrelTermModel$Corporate';
import Markdown from 'react-markdown';
import { useFetchMarkdown } from '@/components/pages/onboarding/forms/utils/customHooks/useFetchMarkdown';
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
					<FormText className=' [&_ol]:list-[decimal] [&_ol>li_ol]:text-neutral-600 [&_h2]:heading6Bold [&_h3]:paragraph2Medium space-y-[16px] [&_ol]:space-y-[8px] max-h-[424px] overflow-auto w-full [&_ol>li>ol>li>ol>li>ol_li]:list-[lower-alpha] [&>ol>li]:space-y-[16px] [&>ol>li]:pb-[8px]'>
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

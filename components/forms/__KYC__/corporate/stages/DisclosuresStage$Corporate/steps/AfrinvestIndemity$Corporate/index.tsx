import {
	FormHeader,
	FormTitle,
	FormContent,
	FormText,
} from '@/components/forms/FormLayout';
import FormFactory from '@/components/forms/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';
import Markdown from 'react-markdown';
import { afrinvestIndemnityModel$Corporate } from './model/afrinvestIndemnityModel$Corporate';
import { useFetchMarkdown } from '@/components/forms/utils/customHooks/useFetchMarkdown';
import { DisclosuresSkeleton } from '@/components/ui/CompoundUI/Skeletons/DisclosuresSkeleton';

export const AfrinvestIndemnity$Corporate: FormStep = () => {
	const [termsText, isLoading, error] = useFetchMarkdown(
		'afrinvestEmailIndemnity'
	);

	if (error) {
		console.error(error);
		return <p>Failed to load resource. Please try again later!</p>;
	}

	return (
		<>
			<FormHeader>
				<FormTitle>Email Indemnity - Afrinvest</FormTitle>
			</FormHeader>
			<FormContent>
				<>
					<FormText className=' [&_ol]:list-[decimal] [&_ol>li_ol]:text-neutral-600 [&_h2]:heading6Bold [&_h3]:paragraph2Medium space-y-[16px] [&_ol]:space-y-[8px] max-h-[424px] overflow-auto w-full [&_ol>li>ol>li>ol>li>ol_li]:list-[lower-alpha] [&>ol>li]:space-y-[16px] [&>ol>li]:pb-[8px]'>
						{isLoading ? (
							<DisclosuresSkeleton />
						) : (
							<Markdown>{termsText as string}</Markdown>
						)}
					</FormText>
					{afrinvestIndemnityModel$Corporate.map((f) => (
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

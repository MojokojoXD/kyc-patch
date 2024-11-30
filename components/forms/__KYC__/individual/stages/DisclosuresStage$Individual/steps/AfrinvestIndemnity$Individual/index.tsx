import {
	FormHeader,
	FormTitle,
	FormContent,
	FormText,
} from '@/components/forms/FormLayout';
import type { FormStep } from '@/types/Components/onboarding';
import { afrinvestIndemnityModel$Individual } from './model/afrinvestIndemnityModel$Individual';
import { useFetchMarkdown } from '@/components/forms/utils/customHooks/useFetchMarkdown';
import FormFactory from '@/components/forms/FormFactory';
import { Ellipsis } from 'lucide-react';
import Markdown from 'react-markdown';

export const AfrinvestIndemnity$Individual: FormStep = () => {
	const [indemnityText, isLoading, error] = useFetchMarkdown(
		'afrinvestEmailIndemnity'
	);

	if (error) {
		console.error(error);
		return <p>Failed to load resource. Please try again!</p>;
	}
	return (
		<>
			<FormHeader>
				<FormTitle>Email Indemnity - Afrinvest</FormTitle>
			</FormHeader>
			<FormContent>
				<FormText>
					{isLoading ? (
						<Ellipsis className='w-5 h-5 animate-pulse' />
					) : (
						<Markdown>{indemnityText as string}</Markdown>
					)}
				</FormText>
				<div>
					{afrinvestIndemnityModel$Individual.map((f) => (
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

import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
	FormText,
} from '@/components/forms/FormLayout';
import type { FormStep } from '@/types/Components/onboarding';
import FormFactory from '@/components/forms/FormFactory';
import { declarationsModel$Individual } from './model/declarationsModel$Individual';
import { useFetchMarkdown } from '@/components/forms/utils/customHooks/useFetchMarkdown';
import Markdown from 'react-markdown';
import { Ellipsis } from 'lucide-react';

export const Declarations$Individual: FormStep = () => {
	const [mdTexts, isLoading, error] = useFetchMarkdown([
		'declarations/databank',
		'declarations/kestrel',
	]);

	if (error) {
		console.error(error);
		return <p className='p-10'>Failed to load resource. Try again later!</p>;
	}

	return (
		<>
			<FormHeader>
				<FormTitle>Declaration</FormTitle>
				<FormSubHeader>Please read and consent to the declaration below.</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-8 paragraph2Regular text-neutral-700'>
					<div className='space-y-5'>
						<h2>Databank</h2>
						<FormText>
							{isLoading ? (
								<Ellipsis className='h-5 w-5 animate-pulse' />
							) : (
								<Markdown>{mdTexts[0]}</Markdown>
							)}
						</FormText>
					</div>
					<div className='space-y-5'>
						<h2>Kestrel</h2>
						<FormText>
							{isLoading ? (
								<Ellipsis className='h-5 w-5 animate-pulse' />
							) : (
								<Markdown>{mdTexts[1]}</Markdown>
							)}
						</FormText>
					</div>
					<div className='px-6 py-10 bg-neutral-50 rounded-md border border-neutral-100 space-y-3 h-3/4  max-w-prose'>
						<p>I/We hereby:</p>{' '}
						<ul className='list-disc px-10 space-y-5'>
							<li>
								Request to open and maintain a Securities Account in my/our name/ Change
								particulars in my/our Securities Accounts as indicated above (delete as
								appropriate).
							</li>{' '}
							<li> Affirm that all information in this form is correct.</li>{' '}
							<li>
								Undertake to notify my CDA any change of particulars or information provided by
								me/us in this form.
							</li>
						</ul>
					</div>
				</div>
				<div>
					{declarationsModel$Individual.map((f) => (
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

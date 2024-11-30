import { FormLabel } from '@/components/ui/form';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
	FormText,
} from '@/components/forms/FormLayout';
import FormFactory from '@/components/forms/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';
import Markdown from 'react-markdown';
import { declarationsModel$Corporate } from './model/declarationsModel$Corporate';
import { useFetchMarkdown } from '@/components/forms/utils/customHooks/useFetchMarkdown';
import { Ellipsis } from 'lucide-react';

const consentText = `
I/We hereby:
1. Request to open and maintain a Securities Account in my/our name/ Change
       particulars in my/our Securities Accounts as indicated above (delete as appropriate).
2. Affirm that all information in this form is correct.
3. Undertake to notify my CDA any change of particulars or information provided
       by me/us in this form.
`;

export const Declarations$Corporate: FormStep = () => {
	const [mdTexts, isLoading, error] = useFetchMarkdown([
		'declarations/databank',
		'declarations/kestrel',
	]);

	if (error) {
		console.error(error);
		return (
			<p className='p-10'>Failed to load resource. Please try again later!</p>
		);
	}

	return (
		<>
			<FormHeader>
				<FormTitle>Declaration</FormTitle>
				<FormSubHeader>
					Please read and consent to the declaration below.
				</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-[16px]'>
					<FormLabel>Databank</FormLabel>
					<FormText className=' [&_ol]:list-[decimal] [&_h2]:paragraph2Medium [&_h3]:paragraph2Medium space-y-[16px] [&_ol_ul]:space-y-[16px] [&_li>ul]:list-disc [&_li>ul]:list-outside'>
						{isLoading ? (
							<Ellipsis className='w-5 h-5 animate-pulse' />
						) : (
							<Markdown skipHtml>{mdTexts[0]}</Markdown>
						)}
					</FormText>
				</div>
				<div className='space-y-[16px]'>
					<FormLabel>Kestrel</FormLabel>
					<FormText className=' [&_ol]:list-[decimal] [&_h2]:paragraph2Medium [&_h3]:paragraph2Medium space-y-[16px] [&_ol_ul]:space-y-[16px] [&_li>ul]:list-disc [&_li>ul]:pl-10'>
						{isLoading ? (
							<Ellipsis className='w-5 h-5 animate-pulse' />
						) : (
							<Markdown skipHtml>{mdTexts[1]}</Markdown>
						)}
					</FormText>
				</div>
				<div>
					<FormText className=' [&_ol]:list-[decimal] [&_h2]:paragraph2Medium [&_h3]:paragraph2Medium space-y-[16px] [&_ol_ul]:space-y-[16px] [&_li>ul]:list-disc [&_li>ul]:list-outside [&_ol]:list-inside'>
						<Markdown skipHtml>{consentText}</Markdown>
					</FormText>
				</div>
				{declarationsModel$Corporate.map((f) => (
					<FormFactory
						key={f.name}
						{...f}
					/>
				))}
			</FormContent>
		</>
	);
};

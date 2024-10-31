import { useEffect, useState } from 'react';
import { FormLabel } from '@/components/UIcomponents/ui/form';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
	FormText,
} from '@/components/UIcomponents/FormLayout';
import FormFactory from '@/components/UIcomponents/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';
import Markdown from 'react-markdown';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import { declarationsModel$Corporate } from './model/declarationsModel$Corporate';

const consentText = `
I/We hereby:
1. Request to open and maintain a Securities Account in my/our name/ Change
       particulars in my/our Securities Accounts as indicated above (delete as appropriate).
2. Affirm that all information in this form is correct.
3. Undertake to notify my CDA any change of particulars or information provided
       by me/us in this form.
`

export const Declarations$Corporate: FormStep = () => {
	const [databankText, setDatabankText] = useState('');
	const [KestrelText, setKestrelText] = useState('');
	const [error, setError] = useState('');
	const [isFetching, setIsFetching] = useState(false);

	useEffect(() => {
		const fetchText = async () => {
			setIsFetching(true);
			const declarationRes = await FormHelpers.fetchMarkdown(
				'declarations/databank'
			);
			const kestrelRes = await FormHelpers.fetchMarkdown('declarations/kestrel');

			if (!declarationRes || !kestrelRes) {
				setError('Failed to load resource');
			}

			declarationRes && setDatabankText(declarationRes);
			kestrelRes && setKestrelText(kestrelRes);
			setIsFetching(false);
		};

		fetchText();
	}, []);

	if (error) return <p className='p-10'>{error}</p>;

	return (
		<>
			<FormHeader>
				<FormTitle>Declaration</FormTitle>
				<FormSubHeader>
					Please read and consent to the declaration below.
				</FormSubHeader>
			</FormHeader>
			<FormContent>
				<>
					<div className='space-y-[16px]'>
						<FormLabel>Databank</FormLabel>
						<FormText className=' [&_ol]:list-[decimal] [&_h2]:paragraph2Medium [&_h3]:paragraph2Medium space-y-[16px] [&_ol_ul]:space-y-[16px] [&_li>ul]:list-disc [&_li>ul]:list-outside'>
							<Markdown skipHtml>{isFetching ? '...loading' : databankText}</Markdown>
						</FormText>
					</div>
					<div className='space-y-[16px]'>
						<FormLabel>Kestrel</FormLabel>
						<FormText className=' [&_ol]:list-[decimal] [&_h2]:paragraph2Medium [&_h3]:paragraph2Medium space-y-[16px] [&_ol_ul]:space-y-[16px] [&_li>ul]:list-disc [&_li>ul]:list-outside'>
							<Markdown skipHtml>{isFetching ? '...loading' : KestrelText}</Markdown>
						</FormText>
					</div>
					<div>
						<FormText className=' [&_ol]:list-[decimal] [&_h2]:paragraph2Medium [&_h3]:paragraph2Medium space-y-[16px] [&_ol_ul]:space-y-[16px] [&_li>ul]:list-disc [&_li>ul]:list-outside'>
							<Markdown skipHtml>{consentText}</Markdown>
						</FormText>
					</div>
					{declarationsModel$Corporate.map((f) => (
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

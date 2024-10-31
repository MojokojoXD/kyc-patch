import { useEffect, useState } from 'react';
import {
	FormHeader,
	FormTitle,
	FormContent,
	FormText,
} from '@/components/UIcomponents/FormLayout';
import FormFactory from '@/components/UIcomponents/FormFactory';
import type { FormStep } from '@/types/Components/onboarding';
import Markdown from 'react-markdown';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import { afrinvestIndemnityModel$Corporate } from './model/afrinvestIndemnityModel$Corporate';

export const AfrinvestIndemnity$Corporate: FormStep = () => {
	const [termsText, setTermsText] = useState('');
	const [isFetching, setIsFetching] = useState(false);

	useEffect(() => {
		const fetchText = async () => {
			setIsFetching(true);
			const result = await FormHelpers.fetchMarkdown('afrinvestEmailIndemnity');
			result && setTermsText(result);
			setIsFetching(false);
		};

		fetchText();
	}, []);

	return (
		<>
			<FormHeader>
				<FormTitle>Email Indemnity - Afrinvest</FormTitle>
			</FormHeader>
			<FormContent>
				<>
					<FormText className=' [&_ol]:list-[decimal] [&_ol>li_ol]:text-neutral-600 [&_h2]:heading6Bold [&_h3]:paragraph2Medium space-y-[16px] [&_ol]:space-y-[8px] max-h-[424px] overflow-auto w-full [&_ol>li>ol>li>ol>li>ol_li]:list-[lower-alpha] [&>ol>li]:space-y-[16px] [&>ol>li]:pb-[8px]'>
						<Markdown skipHtml>{isFetching ? '...loading' : termsText}</Markdown>
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

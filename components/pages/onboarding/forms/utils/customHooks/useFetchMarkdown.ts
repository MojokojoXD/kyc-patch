import { useState, useEffect } from 'react';
import axios from 'axios';

export type Markdowns =
    | 'pep'
    | 'kestrelTerms'
    | 'kestrelNominee'
    | 'databankEmailIndemnity'
    | 'afrinvestEmailIndemnity'
    | 'afrinvestPrivacyPolicy'
    | 'declarations/databank'
    | 'declarations/kestrel';


type MDText = string[] | string;
type Loading = boolean;
type Error = string;

const fetchMarkdown = async (name: Markdowns) => {
	try {
		const res = await axios.get(`/markdown/${name}.md`);

		if (res.status !== 200)
			throw new Error(
				`fetching markdown ${name} returned status code: ${res.status}`
			);
		if (typeof res.data !== 'string')
			throw new Error(`Malformed markdown ${name}.md`);

		return res.data;
	} catch (error) {
		throw error;
	}
};

export function useFetchMarkdown(
	name: Markdowns | Markdowns[]
): [MDText, Loading, Error] {
	const [text, setText] = useState<string[]>(['']);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		let timerID: ReturnType<typeof setTimeout>;

		const evaluateMarkdownRequests = async () => {
			const tempTexts: string[] = [];

			setIsLoading(true);

			if (typeof name === 'string') {
				try {
					const result = await fetchMarkdown(name);

					tempTexts.push(result);
				} catch (error) {
					if (typeof error === 'string') {
						setError(error);
					}

					console.log(error);
				}
			} else {
				try {
					for (const mdName of name) {
						const result = await fetchMarkdown(mdName);
						tempTexts.push(result);
					}
				} catch (error) {
					if (typeof error === 'string') {
						setError(error);
					}

					console.log(error);
				}
			}

			setText([...tempTexts]);

			timerID = setTimeout(() => setIsLoading(false), 800);
		};

		evaluateMarkdownRequests();

		return () => clearTimeout(timerID);
	}, []);

	return [typeof name === 'string' ? text[0] : text, isLoading, error];
}

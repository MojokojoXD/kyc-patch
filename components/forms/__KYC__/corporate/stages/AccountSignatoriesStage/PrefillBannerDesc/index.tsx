import Markdown from 'react-markdown';
import { CircleAlert } from 'lucide-react';

const headerText = `
## **Auto-populated fields**

Some fields have been carried forward from your earlier responses.
To maintain accuracy and consistency in your application, these
details cannot be modified here.

`;

export function PrefillBannerDesc() {
	return (
		<div
			className='bg-neutral-50 p-5 rounded-lg border border-neutral-200 
            [&>h2]:text-neutral-700 flex space-x-5 text-sm text-neutral-600'>
			<div>
				<CircleAlert className='h-5 w-5 text-primary-500' />
			</div>
			<div>
				<Markdown>{headerText}</Markdown>
			</div>
		</div>
	);
}

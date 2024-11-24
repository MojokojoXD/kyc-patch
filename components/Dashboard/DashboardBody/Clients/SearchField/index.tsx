import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface SearchFieldProps {
	placeholder?: string;
	onChange: (value: string) => void;
}

export function SearchField({
	onChange,
	placeholder = 'Search',
}: SearchFieldProps) {
	const [isEnteringInput, setIsEnteringInput] = useState(false);

	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		const inputNode = inputRef.current!;
		let timerID: ReturnType<typeof setTimeout>;

		const handleChange = (e: Event) => {
			setIsEnteringInput(true);
			clearTimeout(timerID);
			timerID = setTimeout(() => {
				onChange((e.target as typeof inputNode).value);
				setIsEnteringInput(false);
			}, 500);
		};

		inputNode.addEventListener('keyup', handleChange);

		return () => {
			inputNode.removeEventListener('keyup', handleChange);
			clearTimeout(timerID);
		};
	}, []);

	return (
		<span className='relative flex items-center w-full max-w-[271px]'>
			<Input
				ref={inputRef}
				placeholder={placeholder}
				className='w-full pl-4 pr-10 peer focus-visible:border-primary-500 placeholder:text-sm'
			/>
			<span className='absolute right-4 text-neutral-300 peer-focus:text-primary-500 peer-hover:text-primary-300'>
				{isEnteringInput ? (
					<Loader2 className='h-5 aspect-square animate-spin' />
				) : (
					<Search className='h-5 aspect-square' />
				)}
			</span>
		</span>
	);
}

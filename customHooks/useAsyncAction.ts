import { useEffect, useState } from 'react';

type AsyncAction<T> = () => Promise<T>;

type AsyncError = {
	flag: boolean;
	message: string;
};

type LoadingState = boolean;

export function useAsyncAction<T>(
	action: AsyncAction<T>
): [T, LoadingState, AsyncError] {
	const [data, setData] = useState<Awaited<T>>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<AsyncError>({
		flag: false,
		message: '',
	});

	useEffect(() => {
		const runAction = async () => {
			setLoading(true);

			try {
				const data = await action();
				setData(data);
				setLoading(false);
			} catch (error) {
				if (typeof error === 'string') {
					setError({ flag: true, message: error });
				}

				console.log(error);
			}
		};

		runAction();
	}, [action]);

	return [data, loading, error];
}

import { useEffect, useState } from 'react';

type AsyncAction<T> = () => Promise<T>;

type AsyncError = {
	flag: boolean;
	message: string;
};

type LoadingState = boolean;

export function useAsyncAction<T>(
	action: AsyncAction<T>
): [Awaited<T> | undefined, LoadingState, AsyncError] {
	const [data, setData] = useState<Awaited<T> | undefined>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<AsyncError>({
		flag: false,
		message: '',
	});

	useEffect(() => {
		let ignore = false;
		const runAction = async () => {
			setLoading(true);

			try {
				const data = await action();
				if (!ignore) {
					setData(data);
					setLoading(false);
				}
			} catch (error) {
				if (typeof error === 'string') setError({ flag: true, message: error });

				if (error instanceof Error) setError({ flag: true, message: error.message });

				console.log(error);
			}
		};

		runAction();
		return () => {
			ignore = true;
		};
	}, [action]);

	return [data, loading, error];
}

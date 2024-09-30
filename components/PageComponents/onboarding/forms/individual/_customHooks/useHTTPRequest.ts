import { useEffect, useState } from 'react';
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';


export default function useHTTPRequest<TData,TPostData = any>(
    url: string,
    options: AxiosRequestConfig<TPostData> = { method: "GET" },
    load = true,
): [TData, boolean, string] {
    const [ data, setData ] = useState<TData>( {} as TData );
	const [error, setError] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchDataList = async () => {
			setIsLoading(true);
            try
            {
                const res = await axios( url, {
                    ...options,
					withCredentials: true,
				});

				if (res.status === 200) {
					setData(res.data);
					setIsLoading(false);
					return;
				}

				setIsLoading(false);
				setError(
					'Failed to fetch resource. Status code: ' +
						res.status +
						', Message: ' +
						res.statusText
				);
			} catch (error: any) {
                setIsLoading( false );
                console.log(error)
				setError(error.message);
			}
		};

		load && fetchDataList();
	}, [url,load]);

	return [data, isLoading, error];
}

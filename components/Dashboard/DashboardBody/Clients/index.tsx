import * as ViewContent from '../Layout/ViewContent';
import { Button } from '@/components/ui/button';
import { SearchField } from './SearchField';
import { ClientsTable } from './ClientsTable';
import { Pagination } from './Pagination';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import type { DashboardClient } from './client';
import type { BaseSSXResponse } from '@/types/server/SSX';
import { useSession } from '../../hooks/useSession';
import { useSearch } from './hooks/useSearch';
import { useSorter } from './hooks/useSorter';
import { useEffect, useState, useMemo, useCallback } from 'react';
import Loading from '@/components/ui/Loading';
import type { Path } from 'react-hook-form';

interface AllClientsEndpointResponse extends BaseSSXResponse {
	all_trans: DashboardClient[];
}

const CLIENTS_PER_PAGE = 10;

const sortOptions: { value: Path<DashboardClient>; label: string }[] = [
	{
		value: 'client_first_name',
		label: 'first name',
	},
	{
		value: 'client_last_name',
		label: 'last name',
	},
	{
		value: 'status',
		label: 'status',
	},
	{
		value: 'client_email',
		label: 'email',
	},
	{
		value: 'date_created',
		label: 'date',
	},
];

export function Clients() {
	const [clientsData, setClientsData] = useState<DashboardClient[]>([]);
	const [searchStr, setSearchStr] = useState('');
	const [sortOption, setSortOption] = useState<
		Path<(typeof clientsData)[0]> | undefined
	>();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	const { request } = useSession<AllClientsEndpointResponse>();
	const searchResult = useSearch<(typeof clientsData)[0]>(
		searchStr,
		clientsData,
		[
			'client_email',
			'client_first_name',
			'client_last_name',
			'broker',
			'status',
            'type_of_client',
		]
	);

	const sortedResult = useSorter<(typeof clientsData)[0]>(
		sortOption,
		searchResult
	);

	const currentClients = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * CLIENTS_PER_PAGE;
		const lastPageIndex = firstPageIndex + CLIENTS_PER_PAGE;

		return sortedResult.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, sortedResult, sortOption]);

	useEffect(() => {
		request({ url: 'get-all', method: 'GET' }, function (data, error, status) {
			if (status === 'COMPLETED') {
				setClientsData(
					data!.all_trans.filter((c) => c.client_first_name && c.client_last_name)
				);
				setIsLoading(false);
				return;
			}

			error && setError(error);
			setIsLoading(false);
		});
	}, []);

	const onPageChange = useCallback((page: number) => setCurrentPage(page), []);

	const handleSortOption = useCallback(
		(v: string) => setSortOption(v as Path<DashboardClient>),
		[]
	);

	if (error) {
		console.error(error);
		return <p className='p-10'>Something went wrong. Please try again later!</p>;
	}

	return (
		<>
			<Loading
				absolute
				reveal={isLoading}
			/>
			<ViewContent.Header className='flex justify-between items-center'>
				<h1 className='heading6Bold'>All Clients</h1>
				<div className='flex justify-end space-x-4 w-4/6'>
					<Select
						value={sortOption}
						onValueChange={handleSortOption}>
						<SelectTrigger className='w-full max-w-[271px] flex-none'>
							<span>
                                sort by <SelectValue className='capitalize'/>
							</span>
						</SelectTrigger>
						<SelectContent>
							{sortOptions.map((o) => (
								<SelectItem
									key={o.value}
									value={o.value}>
									{o.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<SearchField
						placeholder='Search by Name,Type,Email...'
						onChange={(v) => {
							setCurrentPage(1);
							setSearchStr(v);
						}}
					/>
				</div>
			</ViewContent.Header>
			<ViewContent.Body>
				<ClientsTable
					headerLabels={[
						'client name',
						'client type',
						'email address',
						'broker',
						'status',
					]}
					data={currentClients}
				/>
			</ViewContent.Body>
			<ViewContent.Footer className='flex justify-end'>
				<Pagination
					onPageChange={onPageChange}
					totalDataCount={searchResult.length}
					currentPage={currentPage}
					maxDataPerPage={CLIENTS_PER_PAGE}
					siblingCount={2}
				/>
			</ViewContent.Footer>
		</>
	);
}
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePagination } from '../hooks/usePagination';
import { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

interface PaginationProps {
	onPageChange: (page: number) => void;
	totalDataCount: number;
	siblingCount?: number;
	currentPage: number;
	maxDataPerPage: number;
}

export function Pagination({
	onPageChange,
	siblingCount = 1,
	...props
}: PaginationProps) {
	const paginationRange = usePagination({
		siblingCount,
		...props,
	});

	if (
		props.currentPage === 0 ||
		(paginationRange && paginationRange.length < 2) ||
		!paginationRange
	) {
		return null;
	}

	const paginationBtnConfig: ComponentPropsWithoutRef<typeof Button> = {
		variant: 'ghost',
		size: 'icon',
		className: 'bg-white',
	};

	const handlePageChange = (page: string | number) =>
        typeof page === 'number' && onPageChange( page );
    
    const handleNextPage = () => onPageChange( props.currentPage + 1 );
    const handlePrevPage = () => onPageChange( props.currentPage - 1 );

	return (
		<ul className='flex space-x-[4px]'>
			<li>
                <Button
                    onClick={handlePrevPage}
					{...paginationBtnConfig}
					disabled={props.currentPage === 1}>
					<ChevronLeft className='h-5' />
				</Button>
			</li>
			{paginationRange &&
				paginationRange.map((p, i) => (
					<Button
						key={typeof p === 'string' ? p + i : p}
						{...paginationBtnConfig}
						onClick={() => handlePageChange(p)}
						className={cn(
							paginationBtnConfig.className,
							p === props.currentPage && 'border border-primary-500 text-primary-500'
						)}>
						{typeof p === 'number' ? p : '...'}
					</Button>
				))}
			<li>
				<Button
                    { ...paginationBtnConfig }
                    onClick={handleNextPage}
					disabled={
						props.currentPage === paginationRange[paginationRange?.length - 1]
					}>
					<ChevronRight className='h-5' />
				</Button>
			</li>
		</ul>
	);
}

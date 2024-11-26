import { useMemo } from "react";

//enumerates and populates an array with a sequeuce of numbers from start index to end index
const arrayEnumerator = (startIndex: number, endIndex: number) => {
	const length = endIndex - startIndex + 1;
	return Array.from({ length }, (_v, i) => i + startIndex);
};

export function usePagination({
	totalDataCount,
	maxDataPerPage,
	siblingCount = 1,
	currentPage,
}: {
	totalDataCount: number;
	maxDataPerPage: number;
	siblingCount: number;
	currentPage: number;
    } ) 
{
    
    const paginationRange = useMemo( () =>
    {

        const dots = 'dots';
        
        const totalNumberOfPages = Math.ceil(totalDataCount / maxDataPerPage);
    
        const totalPageNumbers = siblingCount + 5;
    
        if (totalPageNumbers >= totalNumberOfPages) {
            return arrayEnumerator(1, totalNumberOfPages);
        }
    
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalNumberOfPages
        );
    
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalNumberOfPages - 2;
    
        const firstPageIndex = 1;
        const lastPageIndex = totalNumberOfPages;
    
        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount;
            const leftRange = arrayEnumerator(1, leftItemCount);
    
            return [...leftRange, dots, totalNumberOfPages];
        }
    
        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount;
            const rightRange = arrayEnumerator(
                totalNumberOfPages - rightItemCount + 1,
                totalNumberOfPages
            );
            return [firstPageIndex, dots, ...rightRange];
        }
    
        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = arrayEnumerator(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, dots, ...middleRange, dots, lastPageIndex];
        }

    }, [totalDataCount, maxDataPerPage, siblingCount, currentPage])

	return paginationRange;
}

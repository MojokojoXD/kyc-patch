import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TableProps extends HTMLAttributes<HTMLTableElement> {}

export function Table({ children, className, ...props }: TableProps) {
	return (
		<table
			className={cn(
				'w-full border-separate border-spacing-x-0 border-spacing-y-2 table-fixed',
				className
			)}
			{...props}>
			{children}
		</table>
	);
}

interface TableLayoutProps extends HTMLAttributes<HTMLTableSectionElement> {}
export function TableHeader({
	children,
	className,
	...props
}: TableLayoutProps) {
	return (
		<thead
			className={cn('text-neutral-50 capitalize paragraph2Medium', className)}
			{...props}>
			{children}
		</thead>
	);
}

export function TableBody({ children, ...props }: TableLayoutProps) {
	return <tbody {...props}>{children}</tbody>;
}

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}

export function TableRow({ children, className, ...props }: TableRowProps) {
	return (
		<tr
			className={cn('h-[66px]', className)}
			{...props}>
			{children}
		</tr>
	);
}

interface TableDataProps extends HTMLAttributes<HTMLTableCellElement> {
    data?: string;
}

export function TableHead({ data, className, ...props }: TableDataProps) {
	return (
		<th
			className={cn(
				'first:rounded-s-[8px] last:rounded-e-[8px] bg-neutral-800 px-4 text-left',
				className
			)}
			{...props}>
			{data}
		</th>
	);
}

export function TableData({ children, className, ...props }: TableDataProps) {
	return (
        <td
			className={cn(
				'first:rounded-s-[8px] last:rounded-e-[8px] first:border-l last:border-r h-12 px-4 paragraph2Regular bg-neutral-50 border-y border-neutral-100 bg-white text-ellipsis overflow-hidden text-nowrap text-sm',
				className
			)}
			{...props}>
			{ children }
		</td>
	);
}

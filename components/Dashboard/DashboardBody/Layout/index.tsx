import {
	HTMLAttributes,
	JSX,
	useState,
	useCallback,
	type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';
import { portalViewsMetadata } from './portalViewsMetadata';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

//Layout componenets for the dashboard

interface MainProps extends HTMLAttributes<HTMLDivElement> {}

export function Main({ children, className, ...props }: MainProps) {
	return (
		<div className='relative h-screen bg-white grid pt-dashboard-header'>
			<div
				{...props}
				className={cn(
					'relative h-full grid grid-cols-[257px_1fr] overflow-hidden',
					className
				)}>
				{children}
			</div>
		</div>
	);
}

export type Portal = (typeof portalViewsMetadata)[number]['name'];

interface SideMenuProps extends HTMLAttributes<HTMLDivElement> {
	renderPortal: (
		portal: Portal,
		changePortalView: (portal: Portal) => void
	) => JSX.Element;
}

export function SideMenu({ renderPortal }: SideMenuProps) {
	const [portal, setPortal] = useState<Portal>('metrics');

	const changePortalView = useCallback((portal: Portal) => setPortal(portal), []);

	const sideMenuBtnClx =
		'group w-full rounded-none bg-transparent paragraph2Medium capitalize text-neutral-700 justify-between border-r border-white px-3 hover:bg-transparent hover:text-neutral-700/70 transition-[text_border_fill] duration-150 ease-in-out';
	const activeBtnClx =
		'text-primary-500 bg-neutral-50 border-primary-500 hover:text-primary-500/75 hover:border-primary-500/75';
	const iconClx = 'h-5 aspect-square';
	const activeIconClx = '';

	return (
		<>
			<div className='absolute left-0 h-full w-[257px] inset-y-0 bg-white border-r border-neutral-100 py-8'>
				<ul>
					{portalViewsMetadata.map((v) => {
						const isActive = v.name === portal;
						return (
							<li key={v.id}>
								<Button
									title={v.displayName}
									size={'lg'}
									id={v.name}
									className={cn(sideMenuBtnClx, isActive && activeBtnClx)}
									onClick={(e) => setPortal((e.currentTarget as HTMLButtonElement).id as Portal)}>
									<span className='flex items-center space-x-4'>
										<v.icon className={cn(iconClx, isActive && activeIconClx)} />
										<span>{v.displayName}</span>
									</span>
									<span>
										<ChevronRight className='h-4 aspect-square opacity-40' />
									</span>
								</Button>
							</li>
						);
					})}
				</ul>
			</div>
			<div className='relative col-span-full col-start-2 overflow-auto'>
				<div className='h-full'>{renderPortal(portal, changePortalView)}</div>
			</div>
		</>
	);
}

interface PortalProps extends HTMLAttributes<HTMLDivElement> {
	current: Portal;
}

export function Portal({ current, children }: PortalProps) {
	const currentView =
		(children as JSX.Element[]).find(
			(el) => (el.props as ViewProps).name === current
		) ?? null;

	return (
		<div className='p-[32px] space-y-[16px] text-neutral-700 h-fit max-w-screen-xl w-full mx-auto'>
			{currentView}
		</div>
	);
}

interface ViewProps {
	name: Portal;
	children: ReactNode;
}
export function View({ children }: ViewProps) {
	return <>{children}</>;
}

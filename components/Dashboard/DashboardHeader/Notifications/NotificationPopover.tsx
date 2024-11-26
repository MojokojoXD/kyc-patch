import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Bell } from 'lucide-react';

interface NotificationPopoverProps {
	notifications: unknown[];
}

export function NotificationPopover({
	notifications,
}: NotificationPopoverProps) {
	const notificationCount = notifications.length;
	const notificationBubbleTxt =
		notificationCount > 0 && notificationCount <= 9
			? notificationCount.toString()
			: notificationCount > 9
			? '9+'
			: undefined;

	return (
		<Popover>
			<PopoverTrigger
				asChild
				className='px-0'>
				<div className='relative'>
					<Button
						type='button'
						variant={'ghost'}
						size={'icon'}>
						<Bell className='h-6.5 aspect-square text-neutral-700' />
					</Button>
					{notificationBubbleTxt && (
						<span className='flex items-center justify-center bg-error-500 absolute top-[-0.125rem] -right-[.035rem] h-5 aspect-square rounded-full captionBook text-white'>
							{notificationBubbleTxt}
						</span>
					)}
				</div>
			</PopoverTrigger>
			<PopoverContent
				align={'end'}
				sideOffset={30}
				className='w-[26.875rem] p-0 text-neutral-700'>
				<>
					<div className='h-12 paragraph2Medium py-3 px-4'>
						{notifications.length === 0 ? 'No notifications.' : 'Notifications.'}
					</div>
				</>
			</PopoverContent>
		</Popover>
	);
}

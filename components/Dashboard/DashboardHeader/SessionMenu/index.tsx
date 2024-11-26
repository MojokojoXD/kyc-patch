import { useState } from 'react';
import { useSession } from '../../hooks/useSession';
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@/components/ui/popover';
import { MenuBtn } from './MenuBtn';
import { User2 } from 'lucide-react';
import { SessionLogout } from './SessionLogout';
import { SessionMenuTrigger } from './SessionMenuTrigger';

interface SessionMenuPopoverProps {}

export function SessionMenuPopover({}: SessionMenuPopoverProps) {
	const { profile} = useSession();
  const [ sessionMenuOpened, setSessionMenuOpened ] = useState( false );
  const userInitials = profile?.user_name.split(' ').map( n => n.charAt(0) ).join('') ?? ''

  const handlePopoverTriggered = () => setSessionMenuOpened( prevState => !prevState );


	return (
		<div className='max-w-72'>
			<Popover open={sessionMenuOpened} onOpenChange={setSessionMenuOpened}>
				<PopoverTrigger onClick={ handlePopoverTriggered }>
          <SessionMenuTrigger fallback={ userInitials } isActive={ sessionMenuOpened } />
				</PopoverTrigger>
				<PopoverContent
					align='end'
					sideOffset={15}
					className='grid grid-row-[3.25rem] paragraph2Medium p-0'>
          <div className='py-3 px-4'>{ profile?.user_name }</div>
          <MenuBtn icon={ User2 } label='Profile'/>
          <SessionLogout/>
				</PopoverContent>
			</Popover>
		</div>
	);
}

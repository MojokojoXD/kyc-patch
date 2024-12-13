import { useState } from 'react';
import { useSession } from '../../hooks/useSession';
import
  {
    Popover,
    PopoverTrigger,
    PopoverContent,
  } from '@/components/ui/popover';
import { DashboardDialog } from '../../atomic/DashboardDialog';
import { SessionMenuTrigger } from './SessionMenuTrigger';
import { SessionProfileSheet } from './SessionProfileSheet';
import { MenuBtn } from './MenuBtn';
import { User2, LogOut } from 'lucide-react';

interface SessionMenuPopoverProps { }

export function SessionMenuPopover( { }: SessionMenuPopoverProps )
{
  const { profile, logout, isRequesting } = useSession();
  const [ sessionMenuOpened, setSessionMenuOpened ] = useState( false );
  const [ openProfileSheet, setOpenProfileSheet ] = useState( false );
  const [ openLogoutDialog, setOpenLogoutDialog ] = useState( false );


  const userInitials =
    profile?.user_name
      .split( ' ' )
      .map( ( n ) => n.charAt( 0 ) )
      .join( '' ) ?? '';

  const handlePopoverTriggered = () =>
    setSessionMenuOpened( ( prevState ) => !prevState );

  return (
    <div className='max-w-72'>
      <Popover
        open={ sessionMenuOpened }
        onOpenChange={ setSessionMenuOpened }>
        <PopoverTrigger onClick={ handlePopoverTriggered }>
          <SessionMenuTrigger
            fallback={ userInitials }
            isActive={ sessionMenuOpened }
          />
        </PopoverTrigger>
        <PopoverContent
          align='end'
          sideOffset={ 15 }
          className='grid grid-row-[3.25rem] paragraph2Medium p-0 overflow-hidden text-neutral-700'>
          <div className='py-3 px-4'>{ profile?.user_name }</div>
          <div onClick={ () => handlePopoverTriggered() }>
            <MenuBtn
              label='my profile'
              icon={ User2 }
              onClick={ () => setOpenProfileSheet( true ) }
            />
            <MenuBtn
              label='logout'
              icon={ LogOut }
              onClick={ () => setOpenLogoutDialog( true ) }
            />
          </div>
        </PopoverContent>
      </Popover>

      {/* sheets or any component that need to remain mounted after popover is unmounted */ }
      <SessionProfileSheet
        open={ openProfileSheet }
        onOpenChange={ setOpenProfileSheet }
      />
      <DashboardDialog
        open={ openLogoutDialog }
        onDialogOpen={ setOpenLogoutDialog }
        syncing={ isRequesting }
        header={ 'logout' }
        onContinue={ async () => await logout() }>
        Are you sure you want to logout?
      </DashboardDialog>
    </div>
  );
}

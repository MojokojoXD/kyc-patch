import { useState } from 'react';
import { NotificationPopover } from "./NotificationPopover";


interface NotificationsProps
{
  
}


export function Notifications({}: NotificationsProps)
{
  const [ notifications ] = useState<unknown[]>( [] );
  
  return (
    <NotificationPopover notifications={notifications}/>
  )
}
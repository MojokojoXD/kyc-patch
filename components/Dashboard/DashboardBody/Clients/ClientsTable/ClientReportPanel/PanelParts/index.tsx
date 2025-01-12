import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Eye } from 'lucide-react';
import { HTMLAttributes } from 'react';


interface PanelButtonProps extends HTMLAttributes<HTMLButtonElement>
{
  Icon: typeof Eye;

  disabled?: boolean;
}

export const PanelButton = ( { Icon, children, className,disabled, ...props }: PanelButtonProps ) => (
  <Button
    { ...props }
    className={ cn( 'text-primary-500 border border-primary-500 rounded-[0.5rem] py-2 px-4 h-auto w-auto', className ) }
    variant={ 'ghost' }
    size={ 'icon' }
    disabled={ disabled }
  >
    <Icon className='h-4 aspect-square' />
    { children }
  </Button>
);
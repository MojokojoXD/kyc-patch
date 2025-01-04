import { PanelButton } from '../PanelParts';
import { Eye } from 'lucide-react';


interface ViewClientProps
{
  onViewClient: () => void;
}


export function ViewClient( { onViewClient }: ViewClientProps )
{
  return (
    <PanelButton Icon={ Eye } onClick={ onViewClient } />
  );
}
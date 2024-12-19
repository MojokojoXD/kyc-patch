import { Skeleton } from '@/components/ui/skeleton';



export function NewClientFormSkeleton()
{
  return (
    <div className='space-y-2'>
      <Skeleton className='bg-neutral-200 h-6'/>
      <Skeleton className='bg-neutral-200 h-6'/>
      <Skeleton className='bg-neutral-200 h-6'/>
      <Skeleton className='bg-neutral-200 h-6'/>
    </div>
  )
}
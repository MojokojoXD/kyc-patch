import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SessionMenuTriggerProps {
	src?: string;
  fallback: string;
  isActive?: boolean;
}

export function SessionMenuTrigger({ src, fallback, isActive }: SessionMenuTriggerProps) {
	const imageURL = typeof src === 'string' && URL.canParse(src) ? src : undefined;

	if (!imageURL && typeof src === 'string') console.error('Avatar image source must be a valid URL');

  return (
    <div className='group flex items-center'>
      <div className='relative flex justify-center items-center h-10 aspect-square rounded-full bg-neutral-50 border border-neutral-100 group-hover:bg-neutral-100'>
        {imageURL ? (
          <Image
            src={imageURL}
            fill
            alt='user profile avatar'
          />
        ) : (
          fallback
        )}
      </div>
      <ChevronDown className={cn('h-4 opacity-70 transition-all rotate-0', isActive && 'rotate-180')}/>
    </div>
	);
}

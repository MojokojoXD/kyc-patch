import type { ClientTabData } from '../../../../clients';
import { Button } from '@/components/ui/button';
import { ClientBio } from './ClientBio';
import { Verifications } from './Verifications';
import { useState } from 'react';
import { Dot, ArrowLeft } from 'lucide-react';

interface ClientDetailsProps extends Omit<ClientTabData, 'logs'> {}

type ClientDetailsViews = 'client_bio' | 'verifications';

export function ClientDetails({ verifications, ...bio }: ClientDetailsProps) {
	const [currentView, setCurrentView] =
		useState<ClientDetailsViews>('client_bio');

	return (
		<div className='space-y-[40px] pb-[40px]'>
			<div className='absolute top-[28px]'>
				{currentView === 'client_bio' ? (
					<p className='inline-block paragraph2Medium capitalize'>
						{`${bio.client_first_name} ${bio.client_last_name}`}{' '}
						<Dot className='inline' /> {bio.type_of_client}
					</p>
				) : (
					<Button
						variant={'ghost'}
						onClick={() => setCurrentView('client_bio')}>
						<ArrowLeft className='h-5 aspect-square' />
						Go Back
					</Button>
				)}
			</div>
			{currentView === 'client_bio' ? (
				<ClientBio {...bio} />
			) : (
				<Verifications clientVerifications={verifications} />
			)}
			<hr className='border-neutral-200' />
			{verifications.length > 0 && currentView === 'client_bio' && (
				<Button
					variant={'outline'}
					className='w-full'
					onClick={() => setCurrentView('verifications')}>
					View Signatories
				</Button>
			)}
		</div>
	);
}

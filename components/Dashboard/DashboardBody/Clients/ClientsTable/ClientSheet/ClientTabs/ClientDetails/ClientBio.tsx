import type { ClientTabData } from '../../../../clients';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';

interface ClientBioProps
	extends Omit<ClientTabData, 'verifications' | 'logs'> {}

export function ClientBio( {
    client_first_name: firstName,
    client_last_name: lastName,
    type_of_client,
    client_phone,
    client_email,
    date_created,
}: ClientBioProps )
{

    const formattedDateCreated = format(new Date(date_created), 'do MMM yyyy');
    
	const clientTabField = (id: string, fieldValue: string = '') => (
		<div className='space-y-[8px]'>
			<Label
				className='text-sm capitalize'
				htmlFor={id}>
				{id.split('_').join(' ')}
			</Label>
			<Input
				id={id}
				readOnly
				value={fieldValue ?? ''}
				className='bg-neutral-50 text-neutral-500 text-sm border border-neutral-100 hover:border-inherit focus-visible:border-inherit'
			/>
		</div>
	);

	return (
		<>
			{clientTabField('name', `${firstName} ${lastName}`)}
			{clientTabField('client_type', type_of_client)}
			{clientTabField('phone_number', client_phone)}
			{clientTabField('email_address', client_email)}
			{clientTabField('date_added', formattedDateCreated)}
		</>
	);
}

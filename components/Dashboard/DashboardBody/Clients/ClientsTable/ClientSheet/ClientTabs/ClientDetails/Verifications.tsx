import type { ClientVerifications } from '../../../../clients';
import {
	Accordion,
	AccordionItem,
	AccordionContent,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { BadgeStatus, SSXStatusBadge } from '@/components/ui/SSXStatusBadge';
import { verificationStatusMapping } from '../../../utils/mappings';

interface VerificationsProps {
	clientVerifications: ClientVerifications[];
}

export function Verifications({ clientVerifications }: VerificationsProps) {
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
				value={fieldValue}
				className='bg-neutral-50 text-neutral-500 text-sm border border-neutral-100 hover:border-inherit focus-visible:border-inherit'
			/>
		</div>
	);

	return clientVerifications.map((v, i) => (
		<Accordion
			value={v.signatory_id}
			key={v.signatory_id}
			type={'single'}
			collapsible>
			<AccordionItem value={v.signatory_id}>
				<AccordionTrigger className='paragraph1Regular text-sm'>Signatory #{i + 1}</AccordionTrigger>
				<AccordionContent className=''>
					{clientTabField('name', v.signatory_name)}
					{clientTabField('email', v.signatory_email)}
					<SSXStatusBadge
						label={v.status}
						status={
							verificationStatusMapping[v.status.toLocaleUpperCase()] as BadgeStatus
						}
						size={'lg'}
					/>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	));
}

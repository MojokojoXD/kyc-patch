import { useFormContext } from 'react-hook-form';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import type { Path } from 'react-hook-form';
import { format } from 'date-fns';
import type { FactoryFieldType } from '@/types/Components/formFactory';

interface PrimitiveFieldReviewerProps {
	name: string;
	label: string;
	field: FactoryFieldType;
}

export function PrimitiveFieldReviewer({
	name,
	label,
	field,
}: PrimitiveFieldReviewerProps) {
	const { getValues } = useFormContext<IndividualFormSchema>();

	let fieldValue = getValues(name as Path<IndividualFormSchema>);

	if (typeof fieldValue === 'boolean') {
		fieldValue = fieldValue.toString();
	}

	if (
		typeof fieldValue === 'string' &&
		field === 'date' &&
		!Number.isNaN(Date.parse(fieldValue))
	) {
		fieldValue = format(new Date(fieldValue), 'd MMM yyyy');
	}

	return (
		<div className='space-y-[8px]'>
			{label && <h2 className='paragraph2Medium text-neutral-700'>{label}</h2>}
			<p className='paragraph2Regular text-neutral-500 first-letter:uppercase'>
				{(fieldValue as string) || 'n/a'}
			</p>
		</div>
	);
}

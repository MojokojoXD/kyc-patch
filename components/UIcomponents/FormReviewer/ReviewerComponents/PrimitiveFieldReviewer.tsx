import { useFormContext } from 'react-hook-form';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import type { Path } from 'react-hook-form';
import { format } from 'date-fns';

interface PrimitiveFieldReviewerProps {
	name: string;
	label: string;
}

export function PrimitiveFieldReviewer({
	name,
	label,
}: PrimitiveFieldReviewerProps) {
	let isDate: boolean = false;

	const { getValues } = useFormContext<IndividualFormSchema>();

	let fieldValue = getValues(name as Path<IndividualFormSchema>);

	if (typeof fieldValue === 'boolean') {
		fieldValue = fieldValue.toString();
	}

	if (typeof fieldValue === 'string' && !Number.isNaN(Date.parse(fieldValue))) {
		isDate = true;
	}

	return (
		<div className='space-y-[8px]'>
			{label && <h2 className='paragraph2Medium text-neutral-700'>{label}</h2>}
			<p className='paragraph2Regular text-neutral-500 first-letter:uppercase'>
				{isDate
					? format(new Date(), 'd MMM  yyyy')
                    : ( fieldValue as string ) || 'n/a'
                }
			</p>
		</div>
	);
}

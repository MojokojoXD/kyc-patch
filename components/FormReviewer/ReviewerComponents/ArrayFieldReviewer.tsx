import type { FactoryFieldType } from '@/types/Components/formFactory';
import { useFormContext } from 'react-hook-form';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import type { Path } from 'react-hook-form';

interface ArrayFieldReviewerProps {
	fieldType: FactoryFieldType;
	name: string;
	label: string;
}

export function ArrayFieldReviewer({
	fieldType,
	name,
	label,
}: ArrayFieldReviewerProps) {
	const { getValues } = useFormContext<IndividualFormSchema>();

	const fieldValues = getValues(name as Path<IndividualFormSchema>) || [];

	let temp: string[] = [];

	if (fieldType === 'checkbox') {
		temp = [...(fieldValues as string[])];
	} else {
		(fieldValues as { value: string }[]).forEach((p) => {
			temp.push(p.value);
		});
	}

	return (
		<div className='space-y-[8px]'>
			{label && <h2 className='paragraph2Medium text-neutra-700'>{label}</h2>}
			<div>
				{temp.length === 0 && (
					<p className='paragraph2Regular text-neutral-500 first-letter:uppercase'>
						N/A
					</p>
				)}
				{temp.map((v) => (
					<p
						key={v}
						className='paragraph2Regular text-neutral-500 first-letter:uppercase'>
						{v || 'N/A'}
					</p>
				))}
			</div>
		</div>
	);
}

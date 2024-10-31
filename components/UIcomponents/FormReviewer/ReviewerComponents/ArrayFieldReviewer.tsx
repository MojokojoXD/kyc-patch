import type { FactoryFieldType } from '@/types/Components/formFactory';
import { useFormContext } from 'react-hook-form';
import type { IndividualFormSchema } from '@/types/forms/individual';
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

	const fieldValues =
		getValues(name as Path<IndividualFormSchema>) || [];

	let temp: string[] = [];

	if (fieldType === 'checkbox') {
		temp = [...(fieldValues as string[])];
		
    } else
    {
        (fieldValues as { value: string }[]).forEach((p) => {
			temp.push(p.value);
		});
	}

	return (
		<div className='space-y-[8px]'>
			{label && (
				<h2 className='paragraph2Medium text-neutra-700'>{label}</h2>
			)}
			<div>
				{temp.length === 0 && (
					<p className='paragraph2Regular text-neutral-500 first-letter:uppercase'>
						n/a
					</p>
				)}
				{temp.map((v,i) => (
					<p
						key={v}
						className='paragraph2Regular text-neutral-500 first-letter:uppercase'>
                    #{ i + 1 } {v || 'n/a'}
					</p>
				))}
			</div>
		</div>
	);
}

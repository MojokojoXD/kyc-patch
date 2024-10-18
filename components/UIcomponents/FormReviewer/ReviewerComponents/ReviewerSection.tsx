import type { FormFactoryProps } from '@/types/Components/formFactory';
import { useFormContext } from 'react-hook-form';
import { Button } from '../../ui/button';
import { FieldReviewer } from '../FieldReviewer';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../../ui/accordion';
import { FilePenLine } from 'lucide-react';

interface ReviewerSectionProps {
	sectionName: string;
	applicantCount?: number;
	accordionTitle?:
		| string
		| ((index: number) => {
				firstName: string;
				lastName: string;
				titlePrefix: string;
		  });
	editAction: () => void;
	fieldModel:
		| ((config: { index: number }) => FormFactoryProps[])
		| FormFactoryProps[];
}

export function ReviewerSection({
	sectionName,
	applicantCount,
	accordionTitle,
	editAction,
	fieldModel,
}: ReviewerSectionProps) {
	const { getValues } = useFormContext();

	const applicantFields: { id: number; fields: FormFactoryProps[] }[] =
		[];

	if (applicantCount && typeof fieldModel === 'function') {
		for (let i = 0; i < applicantCount; i++) {
			applicantFields.push({
				id: i,
				fields: fieldModel({ index: i }),
			});
		}
	} else {
		applicantFields.push({
			id: 0,
			fields: fieldModel as FormFactoryProps[],
		});
	}

	return (
		<div className='bg-white p-[40px] space-y-[40px]'>
			<div className='flex justify-between items-center'>
				<div>
					<h2 className='heading5Bold text-neutral-700'>{sectionName}</h2>
				</div>
				<div>
					<Button
						onClick={() => editAction()}
						size={'sm'}
						type='button'
						variant={'ghost'}
						className='text-base text-primary-500 font-normal'>
						<FilePenLine className='h-[20px] w-[20px] mr-1' />
						Edit
					</Button>
				</div>
			</div>
			<div className='space-y-[8px]'>
				{applicantFields.map((af) => {
					let firstName = '';
					let lastName = '';
					let titlePrefix = '';
					if (typeof accordionTitle !== 'string' && accordionTitle) {
						firstName = getValues(accordionTitle(af.id).firstName);
						lastName = getValues(accordionTitle(af.id).lastName);
						titlePrefix = accordionTitle(af.id).titlePrefix;
					}

					const title =
						titlePrefix + ` #${af.id + 1}: ${firstName} ${lastName}`;
					return (
						<Accordion
							key={af.id}
							type='single'
							collapsible
							defaultValue='item-0'>
							<AccordionItem value={`item-${af.id}`}>
								<AccordionTrigger>
									{typeof accordionTitle === 'string' ? accordionTitle : title}
								</AccordionTrigger>
								<AccordionContent>
									{af.fields.map((f) => (
										<FieldReviewer
											key={f.name}
											{...f}
										/>
									))}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					);
				})}
			</div>
		</div>
	);
}

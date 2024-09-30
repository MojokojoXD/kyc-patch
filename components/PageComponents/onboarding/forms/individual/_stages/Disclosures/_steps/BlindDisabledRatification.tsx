import { useFormContext } from 'react-hook-form';
import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/UIcomponents/ui/accordion';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import { Input } from '@/components/UIcomponents/ui/input';
import type { IndividualFormSchema } from '@/types/forms/individual';
import type { SingleCategoryForm } from '../../NextOfKin/_steps/NextOfKin_Bio';
import { useMemo } from 'react';

interface BlindDisabledRatificationProps {}

export default function BlindDisabledRatification({}: BlindDisabledRatificationProps) {
	const form = useFormContext<IndividualFormSchema>();
	const { watch } = form;

	const applicant = useMemo(() => watch('applicant'), [watch]);

	return (
		<>
			<FormHeader>
				<FormTitle>Illiterate/Blind Customer Ratification</FormTitle>
				<FormSubHeader>Please select which one applies.</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-10 py-5'>
					{applicant.map((c, i) => (
						<Accordion
							key={c.id}
							type='single'
							defaultValue={'item-1'}
							collapsible>
							<AccordionItem value={`item-${c.id}`}>
								<AccordionTrigger>
									Applicant #{c.id}: {c.firstName} {c.lastName}
								</AccordionTrigger>
								<AccordionContent className='space-y-8'>
									<RatificationForm applicantId={i} />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</div>
			</FormContent>
		</>
	);
}

type RatificationFormProps = Pick<SingleCategoryForm, 'applicantId'>;
function RatificationForm({ applicantId }: RatificationFormProps) {
	const { register, getValues } = useFormContext<IndividualFormSchema>();

	const { firstName, middleName, lastName } = getValues(
		`applicant.${applicantId}`
	);

	const fullName = `${firstName} ${middleName} ${lastName}`;

	return (
		<>
			{/* title */}
			<div>
				<div className='p-4 bg-neutral-50 border border-neutral-100 rounded-lg'>
					<p className='text-lg font-normal'>
						Illiterate/Blind Customer Ratification <br />
					</p>
					<p className='text-base leading-loose text-lg font-normal'>
						I,{' '}
						<Input
							{...register(
								`applicant.${applicantId}.disclosures.ratification.nameOfDeclarant`
							)}
							className='inline w-[219px] mt-2'
							placeholder='Name of Declarant'
						/>{' '}
						hereby declare that, I read and explained the contents of this
						document to{' '}
						<Input
							className='inline mt-2 w-[219px] focus-visible:border-neutral-200 text-neutral-700 pointer-events-none'
							value={fullName}
							readOnly
						/>{' '}
						in a language of his/her undertsanding which is{' '}
						<Input
							{...register(
								`applicant.${applicantId}.disclosures.ratification.languageOfUnderstanding`
							)}
							className='inline w-[219px] mt-2'
							placeholder='Indicate Language'
						/>{' '}
						and{' '}
						<Input
							className='inline w-[219px] focus-visible:border-neutral-200 text-neutral-700 mt-2 pointer-events-none'
							value={fullName}
							readOnly
						/>{' '}
						understood and approved of the contents before appending his/her
						signature below and executing the form.
					</p>
				</div>
			</div>
		</>
	);
}

import { useFormContext } from 'react-hook-form';
import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/UIcomponents/ui/accordion';
import { Button } from '@/components/UIcomponents/ui/button';
import {
	FormHeader,
	FormTitle,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import { Input } from '@/components/UIcomponents/ui/input';
import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import type { IndividualFormSchema } from '@/types/forms/individual';

export const BlindDisabledRatification: FormStep = ({
	applicantCount,
	formAction,
}) => {
	const { getValues } = useFormContext<IndividualFormSchema>();

	return (
		<>
			<FormHeader>
				<div className='flex justify-between items-center'>
					<FormTitle>Illiterate/Blind Customer Ratification</FormTitle>
					<Button
						variant={'outline'}
						onClick={() => formAction?.call(this,{ type: 'next' })}>
						Skip
					</Button>
				</div>
			</FormHeader>
			<FormContent>
				<div className='space-y-[8px] py-5'>
					{[...Array(applicantCount).keys()].map((c, i) => {
						const applicant = getValues(`applicant.${c}`);
                        const firstName = applicant?.firstName || '';
                        const middleName = applicant?.middleName || '';
                        const lastName = applicant?.lastName || '';

						return (
							<Accordion
								key={c}
								type='single'
								defaultValue={'item-0'}
								collapsible>
								<AccordionItem value={`item-${i}`}>
									<AccordionTrigger>
										Applicant #{c + 1}: {firstName} {lastName}
									</AccordionTrigger>
									<AccordionContent className='data-[state=closed]:hidden' forceMount>
										<RatificationForm
											applicantId={i}
											fullName={firstName + ' ' + middleName + '' + lastName}
										/>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						);
					})}
				</div>
			</FormContent>
		</>
	);
};

interface RatificationFormProps
	extends SingleFormFieldsGeneratorProps {
	fullName: string;
}

function RatificationForm({
	applicantId,
	fullName = '',
}: RatificationFormProps) {
	const { register } = useFormContext<IndividualFormSchema>();

	return (
		<>
			{/* title */}
			<div>
				<div className='py-4 pl-4 bg-neutral-50 border border-neutral-100 rounded-lg space-y-[12px] text-neutral-700'>
					<p className='paragraph3Medium text-base'>
						Illiterate/Blind Customer Ratification <br />
					</p>
					<p className='paragraph2Regular text-base leading-10'>
						I,{' '}
						<Input
							{...register(
								`applicant.${applicantId}.disclosures.ratification.nameOfDeclarant`
							)}
							className='inline w-[219px] mt-2.5 mx-[12px]'
							placeholder='Name of Declarant'
						/>{' '}
						hereby declare that, I read and explained the contents of this
						document to{' '}
						<Input
							className='inline mt-2.5 mx-[12px] w-[219px] focus-visible:border-neutral-200 text-neutral-700 pointer-events-none'
							value={fullName}
							readOnly
						/>{' '}
						in a language of his/her undertsanding which is{' '}
						<Input
							{...register(
								`applicant.${applicantId}.disclosures.ratification.languageOfUnderstanding`
							)}
							className='inline w-[219px] mt-2.5 mx-[12px]'
							placeholder='Indicate Language'
						/>{' '}
						and{' '}
						<Input
							className='inline w-[219px] focus-visible:border-neutral-200 text-neutral-700 mt-2.5 mx-[12px] pointer-events-none'
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

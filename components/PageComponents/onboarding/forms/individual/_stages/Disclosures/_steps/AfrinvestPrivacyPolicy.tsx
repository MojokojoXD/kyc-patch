import { useFormContext } from 'react-hook-form';
import {
	FormField,
	FormItem,
	FormMessage,
} from '@/components/UIcomponents/ui/form';
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
import type { IndividualFormSchema } from '@/types/forms/individual';
import { CustomToggle } from '@/components/UIcomponents/CompoundUI/CustomToggle';
import { useMemo } from 'react';
import type { SingleCategoryForm } from '../../NextOfKin/_steps/NextOfKin_Bio';

export default function AfrinvestPrivacyPolicy() {
	const form = useFormContext<IndividualFormSchema>();
	const { watch } = form;

	const applicant = useMemo(() => watch('applicant'), [watch]);

	return (
		<>
			<FormHeader>
				<FormTitle>Privacy Policy - Afrinvest</FormTitle>
				<FormSubHeader>
					Please read and consent to the privacy policy below.
				</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='text-base font-normal leading-relaxed px-6 py-10 bg-neutral-50 rounded-md border border-neutral-100 space-y-6 h-3/4 max-h-[28rem] overflow-auto max-w-prose '>
					<p>
						We will like to hold and process your personal data for the
						provision of financial services to you subject to your express
						consent authorising us to do so and such data will not be disclosed
						to or accessed by any third party except with your prior approval,
						for regulatory reasons or if such disclosure is required for the
						performance of the financial services to you.
					</p>
				</div>
				<div className='space-y-10 py-10'>
					{applicant.map((c, i) => (
						<Accordion
							key={c.id}
							type='single'
							defaultValue='item-1'
							collapsible>
							<AccordionItem value={`item-${c.id}`}>
								<AccordionTrigger>
									Applicant #{c.id}: {c.firstName} {c.lastName}
								</AccordionTrigger>
								<AccordionContent className='space-y-8'>
									<AfrinvestPrivacyPolicyForm applicantId={i} />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</div>
			</FormContent>
		</>
	);
}

type AfrinvestPrivacyPolicyFormProps = Pick<SingleCategoryForm, 'applicantId'>;

function AfrinvestPrivacyPolicyForm({
	applicantId,
}: AfrinvestPrivacyPolicyFormProps) {
	const { control } = useFormContext<IndividualFormSchema>();

	return (
		<div>
			<div className='space-y-10'>
				<div className='space-y-5'>
					<FormField
						control={control}
						name={`applicant.${applicantId}.disclosures.afrinvest.privacyPolicyAgreement`}
						render={({ field }) => (
							<FormItem>
								<div>
									<CustomToggle
										label={
											'We can confirm that We have read, understood and hereby accept the above privacy statement and We expressly give our consent and authorise you to collect, process and use our personal data for the provision of financial services to us.'
										}
										{...field}
										type={'checkbox'}
										selected={field.value === 'true'}
                                        onChange={ e => field.onChange(e.target.checked.toString())}
									/>
									<FormMessage />
								</div>
							</FormItem>
						)}
					/>
				</div>
			</div>
		</div>
	);
}

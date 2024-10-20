import { useMemo } from 'react';
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
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import type { IndividualFormSchema } from '@/types/forms/individual';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import type { FormStep } from '@/types/Components/onboarding';
import { pepFieldsModel } from './formbuilder/pepFieldsModel';
import { FormFieldAggregator } from '../../../../utils/FormFieldAggregator';
import FormFactory from '@/components/UIcomponents/FormFactory';

export const Pep: FormStep = ({ applicantCount, countryList }) => {
	const { getValues } = useFormContext<IndividualFormSchema>();

	return (
		<>
			<FormHeader>
				<FormTitle>
					Politically Exposed Person (PEP) Self-Certification
				</FormTitle>
			</FormHeader>
			<FormContent>
				<div className='space-y-10 py-5'>
					{[...Array(applicantCount).keys()].map((c, i) => {
						const firstName = getValues(`applicant.${c}.firstName`);
						const lastName = getValues(`applicant.${c}.lastName`);

						return (
							<Accordion
								key={c}
								type='single'
								defaultValue='item-0'
								collapsible>
								<AccordionItem value={`item-${c}`}>
									<AccordionTrigger>
										Applicant #{c + 1}: {firstName} {lastName}
									</AccordionTrigger>
									<AccordionContent
										className='data-[state=closed]:hidden pb-16'
										forceMount>
										<PepForm
											applicantId={i}
											countryList={countryList}
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

interface PepFormProps extends SingleFormFieldsGeneratorProps {}

function PepForm({ applicantId, countryList }: PepFormProps) {
	const { watch, resetField } = useFormContext<IndividualFormSchema>();

	const currentPepStatus = watch(
		`applicant.${applicantId}.disclosures.pepInfo.isPep`
	);

	const aggregatorResults = useMemo(() => {
		const rawFields = pepFieldsModel({
			index: applicantId,
			countryList,
		});
		const aggregator = new FormFieldAggregator(rawFields);

		aggregator.modifyFields('remove-all-except', {
			remove: currentPepStatus === 'No' || !currentPepStatus,
		});

		if (currentPepStatus === 'No') {
			resetField(
				`applicant.${applicantId}.disclosures.pepInfo.pepDetails`,
				{ defaultValue: { desc: '', country: '' } }
			);
		}

		return aggregator.generate();
	}, [applicantId, countryList, currentPepStatus, resetField]);

	return (
		<div>
			<div className='space-y-10'>
				<div className='paragraph2Regular p-4 bg-neutral-50 rounded-md border border-neutral-100 space-y-2.5 max-w-prose text-neutral-700'>
					<p>
						In accordance with Anti-Money Laundering (AML) legislation,
						Kestrel Capital, Databank, and Afrinvest have an obligation to
						verify those clients who are classified as a Politically Exposed
						Person (PEP). In that regard, please read the definition below
						carefully, select the relevant box confirming you are/are not a
						PEP and sign the declaration at the bottom of the form. It is
						your obligation to inform us of a change to your status as a PEP
						should it change at any time in the future.
					</p>
					<p>
						A PEP means any individual who is or in the past has been,
						entrusted with a prominent public or political function and
						includes:
					</p>
					<ul className='pl-[20px]'>
						<li>(a) members of Cabinet;</li>
						<li>(b) senior executives of state-owned corporations;</li>
						<li>(c) important political party officials;</li>
						<li>
							(d) senior military officials and other members of the
							disciplined forces;
						</li>
						<li>(e) members of the Judiciary;</li>
						<li>(f) senior State Officers;</li>
						<li>(g) senior Public Officers;</li>
						<li>(h) senior Official of an International Organisation;</li>
						<li>
							(i) any immediate family member or close business associate of
							a person referred to under the categories (a) to (h).
						</li>
					</ul>
					<p>
						<b>PEP Family and Close Associates</b>
						<br />
						An “immediate family member” of a PEP includes any of the
						following:
					</p>
					<ul className='pl-[20px]'>
						<li>(a) any spouse of the PEP</li>
						<li>
							(b) any person who is considered to be the equivalent to a
							spouse of the PEP
						</li>
						<li>(c) any child, adopted child or step-child of the PEP</li>
						<li>(d) any parent of the PEP</li>
						<li>
							(e) any sibling, adopted sibling or step- sibling of a PEP
						</li>
					</ul>
					<p>
						<b>
							A “close associate” includes any of the following persons:{' '}
						</b>
					</p>
					<ul className='pl-[20px]'>
						<li>
							(a) any individual who is widely and publicly known or believed
							to have joint beneficial ownership of legal entities or legal
							arrangements (e.g. foundations, partnerships, trust agreements,
							power of attorney), or any other close business relations with
							a PEP;
						</li>
						<li>
							(b) any person who is the legal or nominal owner of a legal
							entity or legal arrangement that is known or believed to have
							been set up for the benefit of a PEP;
						</li>
						<li>
							(c) any personal advisor or consultant of a PEP, including a
							financial advisor or a person acting in a financial fiduciary
							capacity; and
						</li>
						<li>
							(d) any person who is publicly known and believed to be acting
							on behalf of a PEP.
						</li>
					</ul>
				</div>
				<div className='space-y-5'>
					{aggregatorResults.fields.map((f) => (
						<FormFactory
							key={f.name}
							{...f}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

import { useMemo } from 'react';
import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Ellipsis } from 'lucide-react';
import {
	FormHeader,
	FormTitle,
	FormContent,
	FormText,
} from '@/components/forms/FormLayout';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import type { FormStep } from '@/types/Components/onboarding';
import { pepModel$Individual } from './model/pepModel$Individual';
import { FormFieldAggregator } from '../../../../../../utils/FormFieldAggregator';
import FormFactory from '@/components/forms/FormFactory';
import { useKYCFormContext } from '@/components/forms/utils/formController';
import Markdown from 'react-markdown';
import { useFetchMarkdown } from '@/components/forms/utils/customHooks/useFetchMarkdown';

export const Pep$Individual: FormStep = ({ countryList }) => {
	const {
		form: { getValues },
	} = useKYCFormContext<IndividualFormSchema>();

	const [pepText, isloading, error] = useFetchMarkdown('pep');

	const applicants = getValues('applicant') || [{}];

	if (error) {
		console.error(error);
		return <p className='p-10'>Failed to load resource. Please try again later!</p>;
	}

	return (
		<>
			<FormHeader>
				<FormTitle>Politically Exposed Person (PEP) Self-Certification</FormTitle>
			</FormHeader>
			<FormContent>
				<div className='space-y-10 py-5'>
					{applicants.map((a, i) => (
						<Accordion
							key={a.id}
							type='single'
							defaultValue='item-0'
							collapsible>
							<AccordionItem value={`item-${i}`}>
								<AccordionTrigger>
									Applicant #{i + 1}: {a.firstName} {a.lastName}
								</AccordionTrigger>
								<AccordionContent
									className='data-[state=closed]:hidden pb-16'
									forceMount>
									<PepForm
										applicantId={i}
										countryList={countryList}
										pepText={pepText as string}
										isLoading={isloading}
									/>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</div>
			</FormContent>
		</>
	);
};

interface PepFormProps extends SingleFormFieldsGeneratorProps {
	pepText: string;
	isLoading: boolean;
}

function PepForm({
	applicantId,
	countryList = [],
	pepText,
	isLoading,
}: PepFormProps) {
	const {
		form: { watch, resetField },
	} = useKYCFormContext<IndividualFormSchema>();

	const currentPepStatus = watch(
		`applicant.${applicantId}.disclosures.pepInfo.isPep`
	);

	const aggregatorResults = useMemo(() => {
		const rawFields = pepModel$Individual({
			index: applicantId,
			countryList,
		});
		const aggregator = new FormFieldAggregator(rawFields);

		aggregator.modifyFields('remove-all-except', {
			remove: currentPepStatus === 'No' || !currentPepStatus,
		});

		if (currentPepStatus === 'No') {
			resetField(`applicant.${applicantId}.disclosures.pepInfo.pepDetails`, {
				defaultValue: { desc: '', country: '' },
			});
		}

		return aggregator.generate();
	}, [applicantId, countryList, currentPepStatus, resetField]);

	return (
		<div>
			<div className='space-y-10'>
				<FormText className='max-h-96 overflow-auto [&>ul_ol]:list-[lower-alpha]'>
					{isLoading ? (
						<Ellipsis className='h-5 w-5 animate-pulse' />
					) : (
						<Markdown>{pepText}</Markdown>
					)}
				</FormText>
				<div className='space-y-5'>
					{aggregatorResults.map((f) => (
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

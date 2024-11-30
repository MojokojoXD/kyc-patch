import { useMemo } from 'react';
import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import type { CorporateFormSchema } from '@/types/forms/corporateSchema';
import {
	Accordion,
	AccordionItem,
	AccordionContent,
	AccordionTrigger,
} from '@/components/ui/accordion';
import {
	FormHeader,
	FormTitle,
	FormContent,
	FormText,
} from '@/components/forms/FormLayout';
import Markdown from 'react-markdown';
import FormFactory from '@/components/forms/FormFactory';
import { useKYCFormContext } from '@/components/forms/utils/formController';
import { pepModel$Corporate } from './model/pepModel$Corporate';
import { FormFieldAggregator } from '@/components/forms/utils/FormFieldAggregator';
import { useFetchMarkdown } from '@/components/forms/utils/customHooks/useFetchMarkdown';
import { Ellipsis } from 'lucide-react';

export const Pep$Corporate: FormStep = ({ countryList }) => {
	const {
		form: { getValues },
	} = useKYCFormContext<CorporateFormSchema>();

	const [pepText, isLoading, error] = useFetchMarkdown('pep');

	const signatories = getValues('accountSignatories.signatories') || [{}];

	if (error) {
		console.error(error);
		return <p className='p-10'>Failed to load resource. Please try again later!</p>;
	}

	return (
		<>
			<FormHeader>
				<FormTitle>Account Signatories</FormTitle>
			</FormHeader>
			<FormContent>
				<ul className='space-y-[8px]'>
					{signatories.map((s, i) => (
						<li key={s.id}>
							<Accordion
								defaultValue={'item-0'}
								collapsible
								type={'single'}>
								<AccordionItem value={`item-${i}`}>
									<AccordionTrigger>
										Signatory #{i + 1}: {s.firstName} {s.lastName}
									</AccordionTrigger>
									<AccordionContent
										className='data-[state=closed]:hidden pb-16'
										forceMount>
										<SignatoryForm
											applicantId={i}
											countryList={countryList}
											pepText={pepText as string}
											isLoading={isLoading}
										/>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</li>
					))}
				</ul>
			</FormContent>
		</>
	);
};

interface SignatoryFormProps extends SingleFormFieldsGeneratorProps {
	pepText?: string;
	isLoading: boolean;
}

function SignatoryForm({
	applicantId,
	countryList,
	isLoading,
	pepText = 'No text',
}: SignatoryFormProps) {
	const { form } = useKYCFormContext();
	const { watch } = form;

	const isSignatoryPep = watch(
		`accountSignatories.signatories.${applicantId}.pepInfo.isPep`
	) as string;

	const fields = useMemo(() => {
		const rawFields = pepModel$Corporate({
			index: applicantId,
			countryList,
		});

		const aggregator = new FormFieldAggregator(rawFields);

		aggregator.modifyFields('remove-all-except', {
			removeAllExcept: isSignatoryPep === 'No' || !isSignatoryPep,
		});

		return aggregator.generate();
	}, [applicantId, countryList, isSignatoryPep]);

	return (
		<>
			<FormText className='[&>ul_ol]:list-[lower-alpha]'>
				{isLoading ? (
					<Ellipsis className='w-5 h-5 animate-pulse' />
				) : (
					<Markdown skipHtml>{pepText}</Markdown>
				)}
			</FormText>
			{fields.map((f) => (
				<FormFactory
					key={f.name}
					{...f}
				/>
			))}
		</>
	);
}

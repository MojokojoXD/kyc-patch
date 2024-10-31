import { useMemo, useEffect, useState } from 'react';
import type { FormStep } from '@/types/Components/onboarding';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import type { Signatory } from '@/types/forms/corporateSchema';
import {
	Accordion,
	AccordionItem,
	AccordionContent,
	AccordionTrigger,
} from '@/components/UIcomponents/ui/accordion';
import {
	FormHeader,
	FormTitle,
	FormContent,
	FormText,
} from '@/components/UIcomponents/FormLayout';
import Markdown from 'react-markdown';
import FormFactory from '@/components/UIcomponents/FormFactory';
import { useKYCFormContext } from '@/components/pages/onboarding/forms/utils/formController';
import { pepModel$Signatories } from './model/pepModel$Signatories';
import { FormFieldAggregator } from '@/components/pages/onboarding/forms/utils/FormFieldAggregator';
import { FormHelpers } from '@/utils/clientActions/formHelpers';

export const Pep$Signatories: FormStep = ({ countryList }) => {
	const [pepText, setPepText] = useState<string | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(false);
	const { form } = useKYCFormContext();
	const { getValues } = form;

	const currentSignatoriesList =
		(getValues('accountSignatories.signatories') as Signatory[]) || [];

	useEffect(() => {
		const request = async () => {
			setIsLoading(true);
			const result = await FormHelpers.fetchMarkdown('pep');
			setPepText(result);
			setIsLoading(false);
		};
		request();
	}, []);

	return (
		<>
			<FormHeader>
				<FormTitle>Account Signatories</FormTitle>
			</FormHeader>
			<FormContent>
				<ul className='space-y-[8px]'>
					{currentSignatoriesList.map((s, i) => (
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
											pepText={pepText}
											isfetchingText={isLoading}
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
	isfetchingText: boolean;
}


function SignatoryForm({
	applicantId,
	countryList,
	isfetchingText,
	pepText = 'No text',
}: SignatoryFormProps) {
	const { form } = useKYCFormContext();
	const { watch } = form;

	const isSignatoryPep = watch(
		`accountSignatories.signatories.${applicantId}.pepInfo.isPep`
	) as string;

	const fields = useMemo(() => {
		const rawFields = pepModel$Signatories({
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
			<FormText>
				<Markdown>{!isfetchingText && pepText ? pepText : '...loading'}</Markdown>
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

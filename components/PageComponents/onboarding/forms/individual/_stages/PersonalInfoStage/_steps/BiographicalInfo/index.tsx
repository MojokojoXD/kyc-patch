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
import type { IndividualFormSchema } from '@/types/forms/individual';
import { useMemo, useEffect } from 'react';
import FormFactory from '@/components/UIcomponents/FormFactory';
import { FormFieldAggregator } from '@/components/PageComponents/onboarding/forms/individual/utils/FormFieldAggregator';
import { bioFieldsModel } from './formBuilder/bioFormFields';
import type {
	FormStep,
	SingleFormFieldsGeneratorProps,
} from '@/types/Components/onboarding';

export const BiographicalInfo: FormStep = ({
	applicantCount,
	countryList,
}) => {
	const { watch } = useFormContext<IndividualFormSchema>();

	return (
		<>
			<FormHeader>
				<FormTitle>Personal Information</FormTitle>
				<FormSubHeader>
					Enter your personal information. All fields are required
				</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-[8px] py-5'>
					{[...Array(applicantCount).keys()].map((c, i) => {
						const firstName = watch(`applicant.${i}.firstName`);
						const lastName = watch(`applicant.${i}.lastName`);

						return (
							<Accordion
								key={c}
								type='single'
								defaultValue='item-0'
								className='h-full'
								collapsible>
								<AccordionItem value={`item-${c}`}>
									<AccordionTrigger>
										Applicant #{c + 1}: {firstName} {lastName}
									</AccordionTrigger>
									<AccordionContent
										className='data-[state=closed]:hidden pb-16'
										forceMount>
										<BiographicalForm
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

interface BiographicalFormProps
	extends SingleFormFieldsGeneratorProps {}

function BiographicalForm({
	applicantId,
	countryList = [],
}: BiographicalFormProps) {
	const { watch, setValue } = useFormContext();

	const currentResidence = watch(
		`applicant.${applicantId}.countryOfResidence`
	) as string;
	const citizenship = watch(
		`applicant.${applicantId}.countryOfCitizenship`
	);

	const isGhanaResident = currentResidence === 'GHANA';
	const isGhanaCitizen = citizenship === 'GHANA';
	const isNigeriaResident = currentResidence === 'NIGERIA';

	const residenceStatus =
		isGhanaResident && isGhanaCitizen
			? 'Resident Ghanaian'
			: isGhanaResident && !isGhanaCitizen
			? 'Resident Foreigner'
			: isGhanaCitizen && !isGhanaResident
			? 'Non-Resident Ghanaian'
			: 'Non-Resident Foreigner';

	const aggregatorResults = useMemo(() => {
		const rawfields = bioFieldsModel({
			index: applicantId,
			countryList,
		});
		const aggregator = new FormFieldAggregator(rawfields);

		aggregator.modifyFields('GH', {
			required:
				residenceStatus === 'Resident Foreigner' ||
				residenceStatus === 'Non-Resident Foreigner',
		});

		aggregator.modifyFields('NG', {
			required: isNigeriaResident,
		});

		return aggregator.generate();
	}, [applicantId, countryList, residenceStatus, isNigeriaResident]);

	useEffect(
		() =>
			setValue(
				`applicant.${applicantId}.residence.status`,
				residenceStatus
			),
		[residenceStatus]
	);
	return (
		<>
			{aggregatorResults.fields.map((f) => (
				<FormFactory
					key={f.name as string}
					{...f}
				/>
			))}
		</>
	);
}

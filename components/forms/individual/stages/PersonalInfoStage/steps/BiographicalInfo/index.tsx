import { useKYCFormContext } from '@/components/forms/utils/formController';
import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/ui/accordion';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/FormLayout';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import { useMemo, useEffect } from 'react';
import FormFactory from '@/components/FormFactory';
import { FormFieldAggregator } from '@/components/forms/utils/FormFieldAggregator';
import { bioInfoModel } from './model/bioInfoModel';
import type {
	FormStep,
	SingleFormFieldsGeneratorProps,
} from '@/types/Components/onboarding';

export const BiographicalInfo: FormStep = ({ countryList }) => {
	const {
		form: { getValues },
	} = useKYCFormContext<IndividualFormSchema>();

	const applicants = getValues('applicant');

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
					{applicants.map((a, i) => {
						return (
							<Accordion
								key={a.id}
								type='single'
								defaultValue='item-0'
								className='h-full'
								collapsible>
								<AccordionItem value={`item-${i}`}>
									<AccordionTrigger>Applicant #{i + 1}</AccordionTrigger>
									<AccordionContent
										className='data-[state=closed]:hidden py-10'
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

interface BiographicalFormProps extends SingleFormFieldsGeneratorProps {}

function BiographicalForm({
	applicantId,
	countryList = [],
}: BiographicalFormProps) {
	const { watch, setValue, unregister } =
		useKYCFormContext<IndividualFormSchema>().form;

	const [currentResidence, citizenship] = watch([
		`applicant.${applicantId}.countryOfResidence`,
		`applicant.${applicantId}.citizenship`,
	]);

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
		const rawfields = bioInfoModel({
			index: applicantId,
			countryList,
		});
		const aggregator = new FormFieldAggregator(rawfields);

		aggregator.modifyFields('GH', {
			required:
				residenceStatus === 'Resident Foreigner',
			remove: residenceStatus === 'Resident Ghanaian',
		});

		aggregator.modifyFields('NG', {
			required: isNigeriaResident,
		});

		if (residenceStatus === 'Resident Ghanaian')
			unregister(`applicant.${applicantId}.residence.details`);

		return aggregator.generate();
	}, [applicantId, countryList, residenceStatus, isNigeriaResident, unregister]);

	useEffect(
		() => setValue(`applicant.${applicantId}.residence.status`, residenceStatus),
		[residenceStatus, applicantId, setValue]
	);
	return (
		<>
			{aggregatorResults.map((f) => (
				<FormFactory
					key={f.name as string}
					{...f}
				/>
			))}
		</>
	);
}

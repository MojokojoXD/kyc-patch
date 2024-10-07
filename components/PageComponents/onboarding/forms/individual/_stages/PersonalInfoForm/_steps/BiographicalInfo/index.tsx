import { useFormContext } from 'react-hook-form';
import {
	FormField,
	FormItem,
	FormControl,
	FormLabel,
	FormMessage,
} from '@/components/UIcomponents/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/UIcomponents/ui/select';
import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/UIcomponents/ui/accordion';
import { Input } from '@/components/UIcomponents/ui/input';
import Image from 'next/image';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import DatePicker from '@/components/UIcomponents/CompoundUI/DatePicker';
import type { IndividualFormSchema } from '@/types/forms/individual';
import type { Country } from '@/types/forms/universal';
import { CustomToggle } from '@/components/UIcomponents/CompoundUI/CustomToggle';
import MULTI_CHOICE_RESPONSES from '@/utils/vars/_formDefaults/personal_multiple_choice.json';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import { sub } from 'date-fns';
import validator from 'validator';
import { useMemo, useContext, Fragment } from 'react';
import { UserContext } from '@/Contexts/UserProfileProvider';
import type { BrokerDetails } from '@/types/forms/broker';
import FormFactory from '@/components/UIcomponents/FormFactory';
import { getBioFields } from './formBuilder/bioFormFields';
import type { ClientType } from '@/types/forms/individual';
//Minimum age constant for form sign up

const MIN_AGE = 18;

export default function BiographicalInfo() {
	const form = useFormContext<IndividualFormSchema>();
	const { getValues } = form;

	const applicantCount = getValues('_formMetadata.applicantCount')

	const appWideData = useContext(UserContext);

	const facts = appWideData?.onboardingFacts;

	return (
		<>
			<FormHeader>
				<FormTitle>Personal Information</FormTitle>
				<FormSubHeader>
					Enter your personal information. All fields are required
				</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-[8px]'>
					{[...Array(applicantCount).keys()].map((c, i) => {
						const firstName = getValues(`applicant.${i}.firstName`);
						const lastName = getValues(`applicant.${i}.lastName`);

						return (
							<Accordion
								key={c}
								type='single'
								defaultValue={`item-0`}
								collapsible>
								<AccordionItem value={`item-${c}`}>
									<AccordionTrigger>
										Applicant #{c + 1}: {firstName} {lastName}
									</AccordionTrigger>
									<AccordionContent
										className='data-[state=closed]:hidden'
										forceMount>
										<BiographicalForm
											applicantId={i}
											brokerInfo={facts?.broker}
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
}

export interface SingleCategoryForm {
	countryList: Country[];
	applicantId: number;
}

type BiographicalFormProps = Omit<SingleCategoryForm, 'countryList'> & {
	brokerInfo?: BrokerDetails;
};

function BiographicalForm({ applicantId, brokerInfo }: BiographicalFormProps) {
	const { watch } = useFormContext();

	const currentNationality = watch(
		`applicant.${applicantId}.countryOfCitizenship`
	) as string;

	const currentNationalityCode =
		FormHelpers.getCodeFromFullCountryName(currentNationality) || '';

	const addResidenceFields =
		brokerInfo.org_code === 'DATAB' ||
		currentNationalityCode !== brokerInfo?.org_cty;

	const fields = useMemo(
		() =>
			getBioFields(
				applicantId,
				brokerInfo?.org_code as string,
				currentNationalityCode,
				addResidenceFields ? 'RESIDENCE' : ''
			),
		[applicantId, brokerInfo, currentNationalityCode]
	);

	return (
		<>
			{fields.map((f) => (
				<FormFactory
					key={f.name as string}
					{...f}
				/>
			))}
		</>
	);
}

import { useFormContext } from 'react-hook-form';
import {
	FormField,
	FormItem,
	FormControl,
	FormLabel,
	FormMessage,
} from '@/components/UIcomponents/ui/form';
import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/UIcomponents/ui/accordion';
import { Input } from '@/components/UIcomponents/ui/input';
import { useMemo } from 'react';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import DatePicker from '@/components/UIcomponents/CompoundUI/DatePicker';
import type { IndividualFormSchema } from '@/types/forms/individual';
import type { SingleCategoryForm } from './NextOfKin_Bio';
import { CustomToggle } from '@/components/UIcomponents/CompoundUI/CustomToggle';
import MULTI_CHOICE_RESPONSES from '@/utils/vars/_formDefaults/personal_multiple_choice.json'
import { sub,add } from 'date-fns';

interface NextOfKin_IdentityProofProps {}

export default function NextOfKin_IdentityProof({}:NextOfKin_IdentityProofProps) {
	const form = useFormContext<IndividualFormSchema>();
	const { watch } = form;
    const applicant = useMemo( () => watch( 'applicant' ), [ watch ] );
    

	return (
		<>
			<FormHeader>
				<FormTitle>Next of Kin - Proof of Identity</FormTitle>
				<FormSubHeader>Enter the ID information of your next of kin.</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-10 py-5'>
					{applicant.map((c, i) => (
						<Accordion
							key={c.id}
							type='single'
							collapsible>
							<AccordionItem value={`item-${c.id}`}>
								<AccordionTrigger>
									Applicant #{c.id}: {c.firstName} {c.lastName}
								</AccordionTrigger>
								<AccordionContent className='space-y-8'>
									<NextOfKin_IdentityProofForm
										applicantId={i}
									/>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</div>
			</FormContent>
		</>
	);
}

interface NextOfKin_IdentityProofFormProps extends Omit<SingleCategoryForm,"countryList"> {}

function NextOfKin_IdentityProofForm({ applicantId }: NextOfKin_IdentityProofFormProps) {
    const { control } = useFormContext<IndividualFormSchema>();
    
    const today = new Date(); // for configuring the date fields

	return (
        <>
            {/* ID Type */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.nextOfKin.proofOfIdentity.idType`}
					render={({ field }) => (
						<FormItem className='space-y-5'>
							<FormLabel>ID Type</FormLabel>
							<div className='grid gap-y-3'>
								{MULTI_CHOICE_RESPONSES.proofOfIdentity.idType.map((c) => (
									<CustomToggle
										key={c}
										label={c}
										{...field}
										value={c}
										selected={field.value === c}
									/>
								))}
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* ID Number */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.nextOfKin.proofOfIdentity.idNumber`}
					render={({ field }) => (
						<FormItem className='space-y-5'>
							<FormLabel>ID Number</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter ID Number'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* Issue Date */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.nextOfKin.proofOfIdentity.issuedOn`}
					render={({ field }) => (
						<FormItem>
							<FormLabel className='block'>Issued On</FormLabel>
							<FormControl>
								<DatePicker
									onChange={field.onChange}
                                    currentDate={ field.value }
                                    endMonth={ today }
                                    startMonth={ sub( today, { years: 100 } ) }
                                    disabled={ { after: today } }
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* Place of Issue */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.nextOfKin.proofOfIdentity.placeOfIssue`}
					render={({ field }) => (
						<FormItem className='space-y-5'>
							<FormLabel>Place of Issue</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter Place of Issue'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* Expiry */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.nextOfKin.proofOfIdentity.expiry`}
					render={({ field }) => (
						<FormItem>
							<FormLabel className='block'>Expiration</FormLabel>
							<FormControl>
								<DatePicker
									onChange={field.onChange}
                                    currentDate={ field.value }
                                    endMonth={add( today, { years: 100 } )}
                                    startMonth={today}
                                    disabled={ { before: today } }
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</>
	);
}

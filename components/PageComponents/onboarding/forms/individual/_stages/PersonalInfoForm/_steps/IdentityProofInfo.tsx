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
import type { SingleCategoryForm } from './BiographicalInfo';
import { CustomToggle } from '@/components/UIcomponents/CompoundUI/CustomToggle';
import MULTI_CHOICE_RESPONSES from '@/utils/vars/_formDefaults/personal_multiple_choice.json'
import { sub,add } from 'date-fns';

interface IdentityProofInfoProps {}

export default function IdentityProofInfo({}:IdentityProofInfoProps) {
	const form = useFormContext<IndividualFormSchema>();
	const { watch } = form;
    const applicant = useMemo( () => watch( 'applicant' ), [ watch ] );
    

	return (
		<>
			<FormHeader>
				<FormTitle>Proof of Identity</FormTitle>
				<FormSubHeader>Enter your ID information.</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-10 py-5'>
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
								<AccordionContent className='space-y-8 data-[state=closed]:hidden' forceMount>
									<IdentityForm
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

interface IdentityFormProps extends Omit<SingleCategoryForm,"countryList"> {}

function IdentityForm({ applicantId }: IdentityFormProps) {
    const { control } = useFormContext<IndividualFormSchema>();
    
    const today = new Date(); // for configuring the date fields

	return (
        <>
            {/* ID Type */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.proofOfIdentity.idType` }
                    rules={ {
                        required: "Select id type"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
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
                    name={ `applicant.${ applicantId }.proofOfIdentity.idNumber` }
                    rules={ {
                        required: "Please enter id number"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
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
                    name={ `applicant.${ applicantId }.proofOfIdentity.issuedOn` }
                    rules={ {
                        required: "Select id issue date"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel className='block'>Issued On</FormLabel>
							<FormControl>
                                <DatePicker
                                    onDayClick={field.onBlur}
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
                    name={ `applicant.${ applicantId }.proofOfIdentity.placeOfIssue` }
                    rules={ {
                        required: "Please enter place of issue"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
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
                    name={ `applicant.${ applicantId }.proofOfIdentity.expiry` }
                    rules={ {
                        required: "Select id expiration date"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel className='block'>Expiration</FormLabel>
							<FormControl>
                                <DatePicker
                                    onDayClick={field.onBlur}
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

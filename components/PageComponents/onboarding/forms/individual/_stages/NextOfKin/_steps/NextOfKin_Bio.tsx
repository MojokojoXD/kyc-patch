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
import { useMemo } from 'react';

//Minimum age constant for form sign up


interface NextOfKinBioProps {
	countryList: Country[];
}

export default function NextOfKinBio({ countryList }: NextOfKinBioProps) {
	const form = useFormContext<IndividualFormSchema>();
	const { watch } = form;

	const applicant = useMemo(() => watch('applicant'), [watch]);

	return (
		<>
			<FormHeader>
				<FormTitle>Next of Kin - Personal Information</FormTitle>
				<FormSubHeader>Enter the information of your next of kin</FormSubHeader>
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
									<NextOfKinBioForm
										applicantId={i}
										countryList={countryList}
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

export interface SingleCategoryForm
	extends Pick<NextOfKinBioProps, 'countryList'> {
	applicantId: number;
}

function NextOfKinBioForm({ applicantId, countryList }: SingleCategoryForm) {
    const { control, watch } = useFormContext<IndividualFormSchema>();
    
    //watch specific fields that need eager updates
    const currentTitleUpdate = watch( `applicant.${ applicantId }.nextOfKin.title.presets` );

    const today = new Date();
    
	return (
		<>
			{/* title */}
			<div>
				<div className='space-y-4'>
					<FormField
						control={control}
						name={`applicant.${applicantId}.nextOfKin.title.presets`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<div className=' grid grid-cols-5 gap-x-3 gap-y-5'>
									{MULTI_CHOICE_RESPONSES.bio.title.map((c) => (
										<CustomToggle
											key={c}
											label={c}
											{...field}
											value={c}
											selected={field.value === c}
										/>
									))}

									<FormMessage />
								</div>
							</FormItem>
						)}
					/>
					{currentTitleUpdate === 'Other' && (
						<FormField
							control={control}
							name={`applicant.${applicantId}.nextOfKin.title.other`}
							render={({ field }) => (
								<FormItem className='col-span-full'>
									<FormLabel>Other? Specify</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Specify'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
				</div>
			</div>
			{/* Full Name */}
			<div className='space-y-3'>
				<FormLabel>Full Name</FormLabel>
				<div className='grid grid-cols-3 gap-x-1.5'>
					<FormField
						control={control}
						name={`applicant.${applicantId}.nextOfKin.firstName`}
						render={({ field }) => (
							<FormItem className='space-y-5'>
								<FormControl>
									<Input
										{...field}
										placeholder='First name'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name={`applicant.${applicantId}.nextOfKin.middleName`}
						render={({ field }) => (
							<FormItem className='space-y-5'>
								<FormControl>
									<Input
										{...field}
										placeholder='Middle name(Optional)'
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name={`applicant.${applicantId}.nextOfKin.lastName`}
						render={({ field }) => (
							<FormItem className='space-y-5'>
								<FormControl>
									<Input
										{...field}
										placeholder='Last name'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</div>
			{/* Date of Birth */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.nextOfKin.dateOfBirth`}
					render={({ field }) => (
						<FormItem>
							<FormLabel className='block'>Date of Birth</FormLabel>
							<FormControl>
								<DatePicker
									onChange={field.onChange}
									currentDate={field.value}
									startMonth={sub(today, { years: 100 })}
									endMonth={today}
									disabled={{ after: today }}
									defaultMonth={today}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
            </div>
            {/* Relationship to applicant */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.nextOfKin.relationshipToApplicant`}
					render={({ field }) => (
						<FormItem className='space-y-5'>
							<FormLabel>Relationship with Account Applicant</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter Relationship to Applicant'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* Gender */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.nextOfKin.gender`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Gender</FormLabel>
							<div className=' grid grid-cols-2 gap-x-3 gap-y-5'>
								<CustomToggle
									label='Male'
									{...field}
									value={'male'}
									selected={field.value === 'male'}
								/>
								<CustomToggle
									label='female'
									{...field}
									value={'female'}
									selected={field.value === 'female'}
								/>
								<FormMessage />
							</div>
						</FormItem>
					)}
				/>
			</div>
			{/* Marital Status */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.nextOfKin.maritalStatus`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Marital Status</FormLabel>
							<div className=' grid grid-cols-4 gap-x-3 gap-y-5'>
								{MULTI_CHOICE_RESPONSES.bio.maritalStatus.map((s) => (
									<CustomToggle
										key={s}
										label={s}
										{...field}
										value={s}
										selected={field.value === s}
									/>
								))}

								<FormMessage />
							</div>
						</FormItem>
					)}
				/>
			</div>
			{/* Country of Birth */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.nextOfKin.countryOfBirth`}
					render={({ field }) => {
						const flagUrl = FormHelpers.getFlagURL(field.value, countryList);
						return (
							<FormItem className='relative'>
								<FormLabel>Country of Birth</FormLabel>
								<Select
									onValueChange={field.onChange}
									value={field.value}>
									<SelectTrigger className=''>
										<div className='flex space-x-2'>
											<div className='w-[20px] h-[20] flex items-center'>
												{flagUrl && (
													<Image
														src={flagUrl}
														width={20}
														height={20}
														alt={`${field.value} flag`}
														className='aspect-square'
													/>
												)}
											</div>
											<SelectValue placeholder={'Select country'} />
										</div>
									</SelectTrigger>
									<SelectContent className='w-full h-56 overflow-scroll'>
										{countryList.map((c) => (
											<SelectItem
												value={c.cty_name}
												key={c.cty_name}
												className='capitalize'>
												{c.cty_name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
			</div>
			{/* Place of Birth */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.nextOfKin.placeOfBirth`}
					render={({ field }) => (
						<FormItem className='space-y-5'>
							<FormLabel>Place of Birth</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter Place of Birth'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* Country of Residence */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.nextOfKin.countryOfResidence`}
					render={({ field }) => {
						const flagUrl = FormHelpers.getFlagURL(field.value, countryList);
						return (
							<FormItem className='relative'>
								<FormLabel>Country of Residence</FormLabel>
								<Select
									onValueChange={field.onChange}
									value={field.value}>
									<SelectTrigger>
										<div className='flex space-x-2'>
											<div className='w-[20px] h-[20] flex items-center'>
												{flagUrl && (
													<Image
														src={flagUrl}
														width={20}
														height={20}
														alt={`${field.value} flag`}
														className='aspect-square'
													/>
												)}
											</div>
											<SelectValue placeholder={'Select country'} />
										</div>
									</SelectTrigger>
									<SelectContent className='w-full h-56 overflow-scroll'>
										{countryList.map((c) => (
											<SelectItem
												value={c.cty_name}
												key={c.cty_name}
												className='capitalize'>
												{c.cty_name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
			</div>
			{/* Country of Citizenship */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.nextOfKin.countryOfCitizenship`}
					render={({ field }) => {
						const flagUrl = FormHelpers.getFlagURL(field.value, countryList);
						return (
							<FormItem className='relative'>
								<FormLabel>Nationality/Country of Citizenship</FormLabel>
								<Select
									onValueChange={field.onChange}
									value={field.value}>
									<SelectTrigger className=''>
										<div className='flex space-x-2'>
											<div className='w-[20px] h-[20] flex items-center'>
												{flagUrl && (
													<Image
														src={flagUrl}
														width={20}
														height={20}
														alt={`${field.value} flag`}
														className='aspect-square'
													/>
												)}
											</div>
											<SelectValue placeholder={'Select country'} />
										</div>
									</SelectTrigger>
									<SelectContent className='w-full h-56 overflow-scroll'>
										{countryList.map((c) => (
											<SelectItem
												value={c.cty_name}
												key={c.cty_name}
												className='capitalize'>
												{c.cty_name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
            </div>
            {/* Percentage Allocation */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.nextOfKin.percentageAllocation`}
					render={({ field }) => (
						<FormItem className='space-y-5'>
							<FormLabel>Percentage Allocation</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Percentage Allocation'
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
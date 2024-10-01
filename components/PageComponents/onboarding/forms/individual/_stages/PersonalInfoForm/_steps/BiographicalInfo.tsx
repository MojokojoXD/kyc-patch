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
import { useMemo } from 'react';

//Minimum age constant for form sign up

const MIN_AGE = 18;

interface BiographicalInfoProps {
	countryList: Country[];
}

export default function BiographicalInfo({
	countryList,
}: BiographicalInfoProps) {
	const form = useFormContext<IndividualFormSchema>();
	const { watch } = form;

	const applicant = useMemo(() => watch('applicant'), [watch]);

	return (
		<>
			<FormHeader>
				<FormTitle>Personal Information</FormTitle>
				<FormSubHeader>
					Enter your personal information. All fields are required
				</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-10 py-5'>
					{applicant.map((c, i) => (
						<Accordion
							key={c.id}
							type='single'
							defaultValue={`item-1`}
							collapsible>
							<AccordionItem value={`item-${c.id}`}>
								<AccordionTrigger >
									Applicant #{c.id}: {c.firstName} {c.lastName}
								</AccordionTrigger>
                                <AccordionContent
									className='space-y-8 data-[state=closed]:hidden' forceMount>
									<BiographicalForm
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
	extends Pick<BiographicalInfoProps, 'countryList'> {
	applicantId: number;
}

function BiographicalForm({ applicantId, countryList }: SingleCategoryForm) {
	const { control, watch, resetField,getFieldState } =
		useFormContext<IndividualFormSchema>();
	//watch specific fields that need eager updates

	const currentTitleUpdate = watch(`applicant.${applicantId}.title.presets`);

	const today = new Date();

    const minAgeDate = sub( today, { years: MIN_AGE } );
    
    const firstNameError = getFieldState( `applicant.${ applicantId }.firstName` ).error;
    const lastNameError = getFieldState( `applicant.${ applicantId }.lastName` ).error;

    const isFullNameValid = (firstNameError === undefined) && (lastNameError === undefined);

	return (
		<>
			{/* title */}
			<div>
				<div className='space-y-6'>
					<FormField
						control={control}
						name={`applicant.${applicantId}.title.presets`}
						rules={{
							required: 'Select an option',
						}}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<div className=' grid grid-cols-5 gap-x-3 gap-y-2'>
									{MULTI_CHOICE_RESPONSES.bio.title.map((c) => (
										<CustomToggle
											key={c}
											label={c}
											{...field}
											value={c}
											onChange={(e) => {
												if (
													field.value === 'Other' &&
													e.target.value !== 'Other'
												) {
													resetField(`applicant.${applicantId}.title.other`);
												}

												field.onChange(e.target.value);
											}}
											selected={field.value === c}
										/>
									))}
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
					{currentTitleUpdate === 'Other' && (
						<FormField
							control={control}
							name={`applicant.${applicantId}.title.other`}
							rules={{
								validate: {
									isEmpty: (v) => v !== '' || 'Please enter other title',
									isAlpha: (v) =>
										validator.isAlpha(v as string) ||
										'Title cannot contain any numbers',
								},
							}}
							render={({ field }) => (
								<FormItem className='space-y-2'>
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
                <FormLabel
                    className={ !isFullNameValid ? "text-error-500" : undefined }
                >Full Name</FormLabel>
				<div className='grid grid-cols-3 gap-x-1.5'>
					<FormField
						control={control}
						name={`applicant.${applicantId}.firstName`}
						rules={{
							required: 'Please enter first name',
							minLength: {
								value: 2,
								message: 'Name is too short',
							},
						}}
						render={({ field }) => (
							<FormItem className='space-y-2'>
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
						name={`applicant.${applicantId}.middleName`}
						render={({ field }) => (
							<FormItem className='space-y-2'>
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
						name={`applicant.${applicantId}.lastName`}
						rules={{
							required: 'Please enter last name',
							minLength: {
								value: 2,
								message: 'Name is too short',
							},
						}}
						render={({ field }) => (
							<FormItem className='space-y-2'>
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
					name={`applicant.${applicantId}.dateOfBirth`}
					rules={{
						required: 'Please select a date of birth',
					}}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel className='block'>Date of Birth</FormLabel>
							<FormControl>
								<DatePicker
									onDayClick={field.onBlur}
									onChange={field.onChange}
									currentDate={field.value}
									startMonth={sub(today, { years: 100 })}
									endMonth={minAgeDate}
									disabled={{ after: minAgeDate }}
									defaultMonth={minAgeDate}
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
					name={`applicant.${applicantId}.gender`}
					rules={{
						required: 'Please select your gender',
					}}
					render={({ field }) => (
						<FormItem className='space-y-2'>
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
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* Marital Status */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.maritalStatus`}
					rules={{
						required: 'Please select marital status',
					}}
					render={({ field }) => (
						<FormItem className='space-y-2'>
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
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* Country of Birth */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.countryOfBirth`}
					rules={{
						required: 'Please select your country of birth',
					}}
					render={({ field }) => {
						const flagUrl = FormHelpers.getFlagURL(field.value, countryList);
						return (
							<FormItem className='relative space-y-2'>
								<FormLabel>Country of Birth</FormLabel>
								<Select
									onValueChange={field.onChange}
									value={field.value}
									onOpenChange={field.onBlur}>
									<FormControl>
										<SelectTrigger className='w-full'>
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
									</FormControl>
									<SelectContent className='w-full h-64 overflow-hidden'>
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
					name={`applicant.${applicantId}.placeOfBirth`}
					rules={{
						required: 'Please enter your place of birth',
						minLength: {
							value: 2,
							message: 'Name is too short',
						},
					}}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Place of Birth</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='City'
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
					name={`applicant.${applicantId}.countryOfResidence`}
					rules={{
						required: 'Please select country of residence',
					}}
					render={({ field }) => {
						const flagUrl = FormHelpers.getFlagURL(field.value, countryList);
						return (
							<FormItem className='relative space-y-2'>
								<FormLabel>Country of Residence</FormLabel>
								<Select
									onValueChange={field.onChange}
									value={field.value}
									onOpenChange={field.onBlur}>
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
					name={`applicant.${applicantId}.countryOfCitizenship`}
					rules={{
						required: 'Please select country of citizenship',
					}}
					render={({ field }) => {
						const flagUrl = FormHelpers.getFlagURL(field.value, countryList);
						return (
							<FormItem className='relative space-y-2'>
								<FormLabel>Nationality/Country of Citizenship</FormLabel>
								<Select
									onValueChange={field.onChange}
									value={field.value}
									onOpenChange={field.onBlur}>
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
			{/* Residential Status */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.residentialStatus`}
					rules={{
						required: 'Please select residential status',
					}}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Residential Status</FormLabel>
							<div className=' grid gap-y-2'>
								{MULTI_CHOICE_RESPONSES.bio.residentialStatus.map((c) => (
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
			{/* Mother's maiden name */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.mothersMaidenName`}
					rules={{
						required: "Please enter mother's maiden name",
						minLength: {
							value: 2,
							message: 'Entry is too short',
						},
					}}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Mother&apos;s maiden name</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Enter mother's maiden name"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* Maiden name */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.maidenName`}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Maiden name(Optional)</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter Maiden name(Optional)'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* Tax Identification Number */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.tin`}
					rules={{
						required: 'Please enter your TIN',
					}}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Tax Identification Number</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter Tax Identification Number'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* State of Origin */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.stateOfOrigin`}
					rules={{
						required: 'Please enter state of origin',
					}}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>State of Origin</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter State of Origin'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* Local Government */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.localGovernment`}
					rules={{
						required: 'Please enter your local government',
					}}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Local Government</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter Local Government'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* Religion */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.religion`}
					rules={{
						required: 'Please enter religion',
					}}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Religion</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter Religion'
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

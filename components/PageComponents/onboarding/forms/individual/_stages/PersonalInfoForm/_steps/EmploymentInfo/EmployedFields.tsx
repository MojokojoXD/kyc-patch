import { useFormContext, FieldErrors } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import {
	FormItem,
	FormControl,
	FormLabel,
	FormError,
} from '@/components/UIcomponents/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/UIcomponents/ui/select';

import { Input } from '@/components/UIcomponents/ui/input';
import Image from 'next/image';
import type { IndividualFormSchema } from '@/types/forms/individual';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import type { SingleCategoryForm } from '../BiographicalInfo';
import { CustomToggle } from '@/components/UIcomponents/CompoundUI/CustomToggle';
import MULTI_CHOICE_RESPONSES from '@/utils/vars/_formDefaults/personal_multiple_choice.json';
import validator from 'validator';

export default function EmploymentFields({
	applicantId,
	countryList,
}: SingleCategoryForm) {
	const { register, getValues, setValue, formState, clearErrors } =
		useFormContext<IndividualFormSchema>();

	const { errors } = formState;

	const employmentCountryFieldName =
		`applicant.${applicantId}.employment.statusDetails.country` as const;
	const handleSetCountry = (newCountry: string) =>
		setValue(employmentCountryFieldName, newCountry);

	//Manual field registration because shadcn ui's doesn't expose refs and onchange props on component
	register(
		`applicant.${applicantId}.employment.statusDetails.phoneNumber.areaCode`,
		{
			required: 'Select area code',
		}
	);
	register(`applicant.${applicantId}.employment.statusDetails.country`, {
		required: 'Select country of employment',
	});

	//Get field update for eager and dynamic ui changes
	const currentEmploymentCountry = getValues(employmentCountryFieldName) || '';
	const currentIncomeRange = getValues(
		`applicant.${applicantId}.employment.statusDetails.incomeRange`
	);
	const employmentAreaCode = getValues(
		`applicant.${applicantId}.employment.statusDetails.phoneNumber.areaCode`
	);

	const flagUrl = FormHelpers.getFlagURL(currentEmploymentCountry, countryList);

	const isErrored = (
		fieldName: string,
		errors: FieldErrors<IndividualFormSchema>
	) => {
		const value = FormHelpers.recursiveFormSearch(fieldName, errors);

		return value === undefined ? "_" : '';
	};

	return (
		<>
			{/* Used uncontrolled input registration because statusDetails field values change based on the value of employment status field
			 */}

			{/* Occupation */}
			<FormItem className='space-y-2'>
				<FormLabel
					className={
						isErrored(
							`applicant.${applicantId}.employment.statusDetails.occupation`,
							errors
						) || 'text-error-500'
					}>
					Occupation
				</FormLabel>
				<FormControl>
					<Input
						{...register(
							`applicant.${applicantId}.employment.statusDetails.occupation`,
							{
								required: 'Please enter occupation',
							}
						)}
						placeholder='Enter Occupation'
					/>
				</FormControl>
				<ErrorMessage
					name={`applicant.${applicantId}.employment.statusDetails.occupation`}
					errors={errors}
					as={<FormError />}
				/>
			</FormItem>
			{/* Profession */}
			<FormItem className='space-y-2'>
				<FormLabel
					className={
						isErrored(
							`applicant.${applicantId}.employment.statusDetails.profession`,
							errors
						) || 'text-error-500'
					}>
					Profession
				</FormLabel>
				<FormControl>
					<Input
						{...register(
							`applicant.${applicantId}.employment.statusDetails.profession`,
							{
								required: 'Please enter profession',
							}
						)}
						placeholder='Enter Occupation'
					/>
				</FormControl>
				<ErrorMessage
					name={`applicant.${applicantId}.employment.statusDetails.profession`}
					errors={errors}
					as={<FormError />}
				/>
			</FormItem>
			{/* Employer Name */}
			<FormItem className='space-y-2'>
				<FormLabel
					className={
						isErrored(
							`applicant.${applicantId}.employment.statusDetails.name`,
							errors
						) || 'text-error-500'
					}>
					Employer/Business/School Name
				</FormLabel>
				<FormControl>
					<Input
						{...register(
							`applicant.${applicantId}.employment.statusDetails.name`,
							{
								required: 'Please enter name of employer',
							}
						)}
						placeholder='Enter Employer/Business/School Name'
					/>
				</FormControl>
				<ErrorMessage
					name={`applicant.${applicantId}.employment.statusDetails.name`}
					errors={errors}
					as={<FormError />}
				/>
			</FormItem>
			{/* Employer Address */}
			<FormItem className='space-y-2'>
				<FormLabel
					className={
						isErrored(
							`applicant.${applicantId}.employment.statusDetails.address`,
							errors
						) || 'text-error-500'
					}>
					Employer/Business/School Address
				</FormLabel>
				<FormControl>
					<Input
						{...register(
							`applicant.${applicantId}.employment.statusDetails.address`,
							{
								required: "Please enter employer's address",
							}
						)}
						placeholder='Enter Employer/Business/School Address'
					/>
				</FormControl>
				<ErrorMessage
					name={`applicant.${applicantId}.employment.statusDetails.address`}
					errors={errors}
					as={<FormError />}
				/>
			</FormItem>
			{/* City */}
			<FormItem className='space-y-2'>
				<FormLabel
					className={
						isErrored(
							`applicant.${applicantId}.employment.statusDetails.city`,
							errors
						) || 'text-error-500'
					}>
					City/Town
				</FormLabel>
				<FormControl>
					<Input
						{...register(
							`applicant.${applicantId}.employment.statusDetails.city`,
							{
								required: 'Please enter city/town',
							}
						)}
						placeholder='Enter City/Town'
					/>
				</FormControl>
				<ErrorMessage
					name={`applicant.${applicantId}.employment.statusDetails.city`}
					errors={errors}
					as={<FormError />}
				/>
			</FormItem>
			{/* Postal Address */}
			<FormItem className='space-y-2'>
				<FormLabel
					className={
						isErrored(
							`applicant.${applicantId}.employment.statusDetails.postalAddress`,
							errors
						) || 'text-error-500'
					}>
					Postal Address
				</FormLabel>
				<FormControl>
					<Input
						{...register(
                            `applicant.${ applicantId }.employment.statusDetails.postalAddress`,
                            {
                                required: "Please enter postal address",
                            }
						)}
						placeholder='Enter Postal Address'
					/>
				</FormControl>
				<ErrorMessage
					name={`applicant.${applicantId}.employment.statusDetails.postalAddress`}
					errors={errors}
					as={<FormError />}
				/>
			</FormItem>
			{/* Postal Code */}
			<FormItem className='space-y-2'>
				<FormLabel
					className={
						isErrored(
							`applicant.${applicantId}.employment.statusDetails.postalCode`,
							errors
						) || 'text-error-500'
					}>
					Postal Code
				</FormLabel>
				<FormControl>
					<Input
						{...register(
							`applicant.${applicantId}.employment.statusDetails.postalCode`,
							{
								required: 'Please enter postal code',
							}
						)}
						placeholder='Enter Postal Code'
					/>
				</FormControl>
				<ErrorMessage
					name={`applicant.${applicantId}.employment.statusDetails.postalCode`}
					errors={errors}
					as={<FormError />}
				/>
			</FormItem>
			{/* Position Held */}
			<FormItem className='space-y-2'>
				<FormLabel
					className={
						isErrored(
							`applicant.${applicantId}.employment.statusDetails.positionHeld`,
							errors
						) || 'text-error-500'
					}>
					Position Held
				</FormLabel>
				<FormControl>
					<Input
						{...register(
							`applicant.${applicantId}.employment.statusDetails.positionHeld`,
							{
								required: 'Please enter position held',
							}
						)}
						placeholder='Enter Position Held'
					/>
				</FormControl>
				<ErrorMessage
					name={`applicant.${applicantId}.employment.statusDetails.positionHeld`}
					errors={errors}
					as={<FormError />}
				/>
			</FormItem>
			{/* Employer/Business/School Phone Number */}
			<FormItem className='space-y-2'>
				<FormLabel
					className={
						(isErrored(
							`applicant.${applicantId}.employment.statusDetails.phoneNumber.areaCode`,
							errors
						) &&
							isErrored(
								`applicant.${applicantId}.employment.statusDetails.phoneNumber.lineNumber`,
								errors
							)) ||
						'text-error-500'
					}>
					Employer/Business/School Phone Number
				</FormLabel>
				<FormControl>
					<div className='flex w-full border rounded-lg border-neutral-300 has-[:focus]:border-primary-500'>
						<Select
							onValueChange={(v) => {
								const areaCode = FormHelpers.getCountryAreaCode(v, countryList);
								setValue(
									`applicant.${applicantId}.employment.statusDetails.phoneNumber.areaCode`,
									areaCode
								);
							}}
							onOpenChange={() =>
								clearErrors(
									`applicant.${applicantId}.employment.statusDetails.phoneNumber.areaCode`
								)
							}>
							<SelectTrigger className='w-1/4 border-none'>
								{employmentAreaCode ? (
									<p className='text-neutral-700'>{employmentAreaCode}</p>
								) : (
									<SelectValue placeholder={'+233'} />
								)}
							</SelectTrigger>
							<SelectContent className='w-full h-64'>
								{countryList.map((c) => (
									<SelectItem
										key={c.cty_name}
										value={c.cty_name}>
										{c.cty_flag_name ? (
											<Image
												src={c.cty_flag_name}
												width={20}
												height={20}
												alt={`${c.cty_name} country code`}
												className='aspect-square inline mr-2'
											/>
										) : (
											<span className='h-[20px] w-[20px] inline-block mr-3'></span>
										)}
										({c.call_code}) {c.cty_name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Input
							{...register(
								`applicant.${applicantId}.employment.statusDetails.phoneNumber.lineNumber`,
								{
									required: 'Please enter phone number',
									validate: (v) =>
										validator.isMobilePhone(v) ||
										'Please enter valid phone number',
								}
							)}
							placeholder='Enter Employer/Business/School Phone Number'
							className='border-none'
						/>
					</div>
				</FormControl>
				<div className='flex'>
					<div className='w-1/4'>
						<ErrorMessage
							errors={errors}
							name={`applicant.${applicantId}.employment.statusDetails.phoneNumber.areaCode`}
							as={<FormError />}
						/>
					</div>
					<div>
						<ErrorMessage
							errors={errors}
							name={`applicant.${applicantId}.employment.statusDetails.phoneNumber.lineNumber`}
							as={<FormError />}
						/>
					</div>
				</div>
			</FormItem>
			{/* Email */}
			<FormItem className='space-y-2'>
				<FormLabel
					className={
						isErrored(
							`applicant.${applicantId}.employment.statusDetails.email`,
							errors
						) || 'text-error-500'
					}>
					Email
				</FormLabel>
				<FormControl>
					<Input
						{...register(
							`applicant.${applicantId}.employment.statusDetails.email`,
							{
								required: 'Please enter email address',
								validate: (v) =>
									validator.isEmail(v) ||
									'Email must be of the format: name@example.com',
							}
						)}
						placeholder='Enter Email'
					/>
				</FormControl>
				<ErrorMessage
					name={`applicant.${applicantId}.employment.statusDetails.email`}
					errors={errors}
					as={<FormError />}
				/>
			</FormItem>
			{/* Nature of Business */}
			<FormItem className='space-y-2'>
				<FormLabel
					className={
						isErrored(
							`applicant.${applicantId}.employment.statusDetails.natureOfBusiness`,
							errors
						) || 'text-error-500'
					}>
					Nature of Business
				</FormLabel>
				<FormControl>
					<Input
						{...register(
							`applicant.${applicantId}.employment.statusDetails.natureOfBusiness`,
							{
								required: 'Please enter nature of business',
							}
						)}
						placeholder='Enter Nature of Business'
					/>
				</FormControl>
				<ErrorMessage
					name={`applicant.${applicantId}.employment.statusDetails.natureOfBusiness`}
					errors={errors}
					as={<FormError />}
				/>
			</FormItem>
			{/* Country of Employment */}
			<FormItem>
				<FormLabel
					className={
						isErrored(
							`applicant.${applicantId}.employment.statusDetails.country`,
							errors
						) || 'text-error-500'
					}>
					Country of Employment
				</FormLabel>
				<Select
					onValueChange={handleSetCountry}
					defaultValue={currentEmploymentCountry}
					onOpenChange={() =>
						clearErrors(
							`applicant.${applicantId}.employment.statusDetails.country`
						)
					}>
					<SelectTrigger className=''>
						<div className='flex space-x-2'>
							<div className='w-[20px] h-[20] flex items-center'>
								{flagUrl && (
									<Image
										src={flagUrl}
										width={20}
										height={20}
										alt={`${currentEmploymentCountry} flag`}
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
				<ErrorMessage
					name={`applicant.${applicantId}.employment.statusDetails.country`}
					errors={errors}
					as={<FormError />}
				/>
			</FormItem>
			{/* Digital Address */}
			<FormItem className='space-y-2'>
				<FormLabel
					className={
						isErrored(
							`applicant.${applicantId}.employment.statusDetails.digitalAddress`,
							errors
						) || 'text-error-500'
					}>
					Digital Address
				</FormLabel>
				<FormControl>
					<Input
						{...register(
							`applicant.${applicantId}.employment.statusDetails.digitalAddress`,
							{
								required: 'Please enter digital address',
							}
						)}
						placeholder='Enter Digital Address'
					/>
				</FormControl>
				<ErrorMessage
					name={`applicant.${applicantId}.employment.statusDetails.digitalAddress`}
					errors={errors}
					as={<FormError />}
				/>
			</FormItem>
			{/* Nearest Landmark */}
			<FormItem className='space-y-2'>
				<FormLabel
					className={
						isErrored(
							`applicant.${applicantId}.employment.statusDetails.nearestLandmark`,
							errors
						) || 'text-error-500'
					}>
					Nearest Landmark
				</FormLabel>
				<FormControl>
					<Input
						{...register(
							`applicant.${applicantId}.employment.statusDetails.nearestLandmark`,
							{
								required: 'Please enter nearest landmark',
							}
						)}
						placeholder='Enter Nearest Landmark'
					/>
				</FormControl>
				<ErrorMessage
					name={`applicant.${applicantId}.employment.statusDetails.nearestLandmark`}
					errors={errors}
					as={<FormError />}
				/>
			</FormItem>
			{/* Years of total Employment */}
			<FormItem className='space-y-2'>
				<FormLabel
					className={
						isErrored(
							`applicant.${applicantId}.employment.statusDetails.yearsOfTotalEmployment`,
							errors
						) || 'text-error-500'
					}>
					Years of total Employment
				</FormLabel>
				<FormControl>
					<Input
						{...register(
							`applicant.${applicantId}.employment.statusDetails.yearsOfTotalEmployment`,
							{
								required: 'Please enter years of total Employment',
								validate: (v) => validator.isNumeric(v) || 'must be a number',
							}
						)}
						placeholder='Enter Years of total Employment'
					/>
				</FormControl>
				<ErrorMessage
					name={`applicant.${applicantId}.employment.statusDetails.yearsOfTotalEmployment`}
					errors={errors}
					as={<FormError />}
				/>
			</FormItem>
			{/* Years of current Employment */}
			<FormItem className='space-y-2'>
				<FormLabel
					className={
						isErrored(
							`applicant.${applicantId}.employment.statusDetails.yearsOfTotalEmployment`,
							errors
						) || 'text-error-500'
					}>
					Years of current Employment
				</FormLabel>
				<FormControl>
					<Input
						{...register(
							`applicant.${applicantId}.employment.statusDetails.yearsOfCurrentEmployment`,
							{
								required: 'Please enter years of current employment',
								validate: (v) => validator.isNumeric(v) || 'must be a number',
							}
						)}
						placeholder='Enter Years of current Employment'
					/>
				</FormControl>
				<ErrorMessage
					name={`applicant.${applicantId}.employment.statusDetails.yearsOfCurrentEmployment`}
					errors={errors}
					as={<FormError />}
				/>
			</FormItem>
			{/* Years of Previous Employment */}
			<FormItem className='space-y-2'>
				<FormLabel
					className={
						isErrored(
							`applicant.${applicantId}.employment.statusDetails.yearsOfPreviousEmployment`,
							errors
						) || 'text-error-500'
					}>
					Years of Previous Employment
				</FormLabel>
				<FormControl>
					<Input
						{...register(
							`applicant.${applicantId}.employment.statusDetails.yearsOfPreviousEmployment`,
							{
								required: 'Please enter years of previous employment',
								validate: (v) => validator.isNumeric(v) || 'must be a number',
							}
						)}
						placeholder='Enter Years of Previous Employment'
					/>
				</FormControl>
				<ErrorMessage
					name={`applicant.${applicantId}.employment.statusDetails.yearsOfPreviousEmployment`}
					errors={errors}
					as={<FormError />}
				/>
			</FormItem>
			{/* Total Monthly Income Range */}
			<FormItem className='space-y-2'>
                <FormLabel
                    className={
						isErrored(
							`applicant.${applicantId}.employment.statusDetails.incomeRange`,
							errors
						) || 'text-error-500'
					}
                >Total Monthly Income Range(GHS)</FormLabel>
				<div className='grid gap-y-3'>
					{MULTI_CHOICE_RESPONSES.employment.incomeRange.map((c) => (
						<CustomToggle
							key={c}
							{...register(
                                `applicant.${ applicantId }.employment.statusDetails.incomeRange`,
                                {
                                    required: "Select income range"
                                }
							)}
							label={c}
							value={c}
							selected={c === currentIncomeRange}
						/>
					))}
				</div>
				<ErrorMessage
					name={`applicant.${applicantId}.employment.statusDetails.incomeRange`}
					errors={errors}
					as={<FormError />}
				/>
			</FormItem>
			{/* Professional License */}
			<FormItem className='space-y-5'>
                <FormLabel
                    className={
						isErrored(
							`applicant.${applicantId}.employment.statusDetails.incomeRange`,
							errors
						) || 'text-error-500'
					}
                >Professional License Number</FormLabel>
				<FormControl>
					<Input
						{...register(
                            `applicant.${ applicantId }.employment.statusDetails.licenseNumber`,
                            {
                                required: "Please enter license number"
                            }
						)}
						placeholder='Enter Professional License Number'
					/>
				</FormControl>
				<ErrorMessage
					name={`applicant.${applicantId}.employment.statusDetails.licenseNumber`}
					errors={errors}
					as={<FormError />}
				/>
			</FormItem>
		</>
	);
}

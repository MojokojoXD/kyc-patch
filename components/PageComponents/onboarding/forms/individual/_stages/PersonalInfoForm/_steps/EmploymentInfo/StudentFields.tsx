import { useFormContext } from 'react-hook-form';
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
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import type { IndividualFormSchema } from '@/types/forms/individual';
import type { SingleCategoryForm } from '../BiographicalInfo';
import Image from 'next/image';
import { ErrorMessage } from '@hookform/error-message';
import validator from 'validator';
import type { FieldErrors } from 'react-hook-form';

export default function StudentFields({
	applicantId,
	countryList,
}: SingleCategoryForm) {
	const { register, setValue, formState, getValues, clearErrors } =
		useFormContext<IndividualFormSchema>();

	const { errors } = formState;

	const areaCodeFieldName =
		`applicant.${applicantId}.employment.statusDetails.phoneNumber.areaCode` as const;

	const employmentAreaCode = getValues(
		`applicant.${applicantId}.employment.statusDetails.phoneNumber.areaCode`
	);

	//Register select field manually because shadcn ui doesn't expose a ref and onchange props
	register(areaCodeFieldName, {
		required: 'Select area code',
	});

	const isErrored = (
		fieldName: string,
		errors: FieldErrors<IndividualFormSchema>
	) => {
		const value = FormHelpers.recursiveFormSearch(fieldName, errors);

		return value === undefined ? "_" : "";
	};

	return (
		<>
			{/* Used uncontrolled input registration because statusDetails field values change based on the value of employment status field
			 */}

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
			{/* Employer/Business/School Email Address
			 */}
			<FormItem className='space-y-5'>
				<FormLabel
					className={
						isErrored(
							`applicant.${applicantId}.employment.statusDetails.email`,
							errors
						) || 'text-error-500'
					}>
					Employer/Business/School Email Address
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
						placeholder='Enter Employer/Business/School Email Address'
					/>
				</FormControl>
				<ErrorMessage
					errors={errors}
					name={`applicant.${applicantId}.employment.statusDetails.email`}
					as={<FormError />}
				/>
			</FormItem>
		</>
	);
}

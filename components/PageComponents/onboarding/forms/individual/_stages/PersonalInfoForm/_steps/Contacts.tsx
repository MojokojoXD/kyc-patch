import { useFormContext } from 'react-hook-form';
import {
	FormField,
	FormItem,
	FormControl,
	FormLabel,
	FormMessage,
	FormError,
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
import { useMemo, useCallback } from 'react';
import Image from 'next/image';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import type { IndividualFormSchema } from '@/types/forms/individual';
import type { Country } from '@/types/forms/universal';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import type { SingleCategoryForm } from './BiographicalInfo';
import validator from 'validator';
import { ErrorMessage } from '@hookform/error-message';

interface ContactsProps {
	countryList: Country[];
}

export default function Contacts({ countryList }: ContactsProps) {
	const form = useFormContext<IndividualFormSchema>();
	const { watch } = form;
	const applicant = useMemo(() => watch('applicant'), [watch]);

	return (
		<>
			<FormHeader>
				<FormTitle>Contact Details</FormTitle>
				<FormSubHeader>Enter your contact details</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-10 py-5'>
					{applicant.map((c, i) => (
						<Accordion
							key={c.id}
							type='single'
							defaultValue={`item-${c.id}`}
							collapsible>
							<AccordionItem value={`item-${c.id}`}>
								<AccordionTrigger>
									Applicant #{c.id}: {c.firstName} {c.lastName}
								</AccordionTrigger>
								<AccordionContent className='space-y-8 data-[state=closed]:hidden' forceMount>
									<ContactForm
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

function ContactForm({ applicantId, countryList }: SingleCategoryForm) {
	const { control, setValue, getValues, register, formState, clearErrors } =
		useFormContext<IndividualFormSchema>();

	const { errors } = formState;

	const currentMobileAreaCode = getValues(
		`applicant.${applicantId}.contacts.mobile.areaCode`
	);
	const emergencyContactAreaCode = getValues(
		`applicant.${applicantId}.contacts.emergencyContact.phoneNumber.areaCode`
	);

	register(`applicant.${applicantId}.contacts.mobile.areaCode`, {
		required: 'Select area code',
	});

	register(
		`applicant.${applicantId}.contacts.emergencyContact.phoneNumber.areaCode`,
		{
			required: 'Select area code',
		}
	);

	const handleAreaCode = useCallback(
		(schemaPath: any, countryUpdate: string) => {
			const areaCode = FormHelpers.getCountryAreaCode(
				countryUpdate,
				countryList
			);

			setValue(schemaPath, areaCode);
		},
		[setValue, countryList]
	);

	return (
		<>
			{/* Residential Address */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.contacts.residentialAddress`}
					rules={{
						required: 'Please enter residential address',
					}}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Residential Address (Not a P.O Box)</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter Residential Address'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* City */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.contacts.city`}
					rules={{
						required: 'Please enter city or town',
					}}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>City/Town</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter City/Town'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* Postal Address */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.contacts.postalAddress`}
					rules={{
						required: 'Please enter postal address',
					}}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Postal Address</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter Postal Address'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* Postal Code */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.contacts.postalCode`}
					rules={{
						required: 'Please enter postal code',
						validate: (v) =>
							validator.isAlphanumeric(v) || 'Postal code is invalid',
					}}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Postal Code</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter Code'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* Phone Number */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.contacts.mobile.lineNumber`}
					rules={{
						required: 'Please enter phone number',
						validate: (v) =>
							validator.isMobilePhone(v) || 'Please enter valid phone number',
					}}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Phone Number</FormLabel>
							<FormControl>
								<div className='flex w-full border rounded-lg border-neutral-300 has-[:focus]:border-primary-500'>
									<Select
										onValueChange={(v) =>
											handleAreaCode(
												`applicant.${applicantId}.contacts.mobile.areaCode`,
												v
											)
										}
										onOpenChange={() =>
											clearErrors(
												`applicant.${applicantId}.contacts.mobile.areaCode`
											)
										}>
										<SelectTrigger className='w-1/4 border-none'>
											{currentMobileAreaCode ? (
												<p className='text-neutral-700'>
													{currentMobileAreaCode}
												</p>
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
															alt={`${field.value} country code`}
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
										{...field}
										placeholder='Enter Phone Number'
										className='border-none'
									/>
								</div>
							</FormControl>
							<div className='flex'>
								<div className='w-1/4'>
									<ErrorMessage
										errors={errors}
										name={`applicant.${applicantId}.contacts.mobile.areaCode`}
										as={<FormError />}
									/>
								</div>
								<div>
									<FormMessage />
								</div>
							</div>
						</FormItem>
					)}
				/>
			</div>
			{/* Email Address */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.contacts.email`}
					rules={{
						required: 'Please enter email address',
						validate: (v) =>
							validator.isEmail(v) || 'Enter in the format: name@example.com',
					}}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Email Address</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter Email Address'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* Emergency Contact */}
			<div className='space-y-5'>
				<FormLabel>Emergency Contact Details</FormLabel>
				<div className='space-y-5'>
					<FormField
						control={control}
						name={`applicant.${applicantId}.contacts.emergencyContact.contactName`}
						rules={{
							required: 'Please enter emergency contact name',
						}}
						render={({ field }) => (
							<FormItem className='space-y-2'>
								<FormControl>
									<Input
										{...field}
										placeholder='Enter Contact Name'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Relation */}
					<FormField
						control={control}
						name={`applicant.${applicantId}.contacts.emergencyContact.relation`}
						rules={{
							required: 'Please enter relation',
						}}
						render={({ field }) => (
							<FormItem className='space-y-2'>
								<FormControl>
									<Input
										{...field}
										placeholder='Enter Contact Relation'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Phone Number */}
					<FormField
						control={control}
						name={`applicant.${applicantId}.contacts.emergencyContact.phoneNumber.lineNumber`}
						rules={{
							required: 'Please enter phone number',
							validate: (v) =>
								validator.isMobilePhone(v) || 'Please enter valid phone number',
						}}
						render={({ field }) => (
							<FormItem className='space-y-2'>
								<FormControl>
									<div className='flex w-full border rounded-lg border-neutral-300 has-[:focus]:border-primary-500'>
										<Select
											onValueChange={(v) =>
												handleAreaCode(
													`applicant.${applicantId}.contacts.emergencyContact.phoneNumber.areaCode`,
													v
												)
											}
											onOpenChange={() =>
												clearErrors(
													`applicant.${applicantId}.contacts.emergencyContact.phoneNumber.areaCode`
												)
											}>
											<SelectTrigger className='w-1/4 border-none'>
												{emergencyContactAreaCode ? (
													<p className='text-neutral-700'>
														{emergencyContactAreaCode}
													</p>
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
																alt={`${field.value} country code`}
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
											{...field}
											placeholder='Enter Emergency Phone Number'
											className='border-none'
										/>
									</div>
								</FormControl>
								<div className='flex'>
									<div className='w-1/4'>
										<ErrorMessage
											errors={errors}
											name={`applicant.${applicantId}.contacts.emergencyContact.phoneNumber.areaCode`}
											as={<FormError />}
										/>
									</div>
									<div>
										<FormMessage />
									</div>
								</div>
							</FormItem>
						)}
					/>
				</div>
			</div>
			{/* Digital Address */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.contacts.digitalAddress` }
                    rules={ {
                        required: "Please enter you digital address"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Digital Address</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter Digital Address'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* Landmark */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.contacts.nearestLandmark` }
                    rules={ {
                        required: "Please enter the nearest landmark"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Nearest Landmark</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter Landmark'
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

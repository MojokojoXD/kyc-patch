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
	SelectTrigger,
	SelectValue,
	SelectItem,
} from '@/components/UIcomponents/ui/select';
import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/UIcomponents/ui/accordion';
import { Input } from '@/components/UIcomponents/ui/input';
import { useMemo, useCallback, useEffect } from 'react';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import type { IndividualFormSchema } from '@/types/forms/individual';
import type { SingleCategoryForm } from '../../PersonalInfoForm/_steps/BiographicalInfo';
import { CustomToggle } from '@/components/UIcomponents/CompoundUI/CustomToggle';
import MULTI_CHOICE_RESPONSES from '@/utils/vars/_formDefaults/disclosures_multiple_choice.json';
import type { Country } from '@/types/forms/universal';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import Image from 'next/image';
import { ErrorMessage } from '@hookform/error-message';
import validator from 'validator';

interface FatcaProps {
	countryList: Country[];
}

export default function Fatca({ countryList }: FatcaProps) {
	const form = useFormContext<IndividualFormSchema>();
	const { watch } = form;
	const applicant = useMemo(() => watch('applicant'), [watch]);

	return (
		<>
			<FormHeader>
				<FormTitle>Foreign Account Tax Compliance Act (FATCA)</FormTitle>
				<FormSubHeader>
					The following questions are designed to capture information for common
					reporting standards as well as FATCA (Foreign Account Tax Compliance
					Act)
				</FormSubHeader>
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
								<AccordionContent className='data-[state=closed]:hidden' forceMount>
									<FatcaForm
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

function FatcaForm({ applicantId, countryList }: SingleCategoryForm) {
	const {
		control,
		watch,
		setValue,
		getValues,
		resetField,
		unregister,
		getFieldState,
		register,
		clearErrors,
		formState: { errors },
	} = useFormContext<IndividualFormSchema>();

	const currentFatcaStatus = watch(
		`applicant.${applicantId}.disclosures.fatca.status`
	);

	const currentMobileAreaCode = getValues(
		`applicant.${applicantId}.disclosures.fatca.details.phoneNumber.areaCode`
	);

	const handleAreaCode = useCallback(
		(schemaPath: any, countryUpdate: string) => {
			const areaCode = FormHelpers.getCountryAreaCode(
				countryUpdate,
				countryList
			);

			setValue(schemaPath, areaCode);
			clearErrors(schemaPath);
		},
		[setValue, countryList]
	);

	useEffect(() => {
		if (currentFatcaStatus.length === 0) {
			unregister(`applicant.${applicantId}.disclosures.fatca.details`);
		} else {
			register(
				`applicant.${applicantId}.disclosures.fatca.details.phoneNumber.areaCode`,
				{
					required:
						currentFatcaStatus.length === 0 ? false : 'Select area code',
					value: '',
				}
			);
		}
	}, [currentFatcaStatus, setValue, register, unregister, applicantId]);

	const isErrored = (field: any) => getFieldState(field).error !== undefined;

	return (
		<>
			{/* FATCA Status */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.disclosures.fatca.status`}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>FATCA Status</FormLabel>
							<div className='grid gap-y-3'>
								{MULTI_CHOICE_RESPONSES.fatca.status.map((c) => (
									<CustomToggle
										key={c}
										label={c}
										{...field}
										onChange={(e) => {
											let update = [...field.value];
											if (e.target.checked) {
												update.push(e.target.value);
												field.onChange(update);
												return;
											}

											update = update.filter((v) => v !== e.target.value);

											field.onChange(update);
										}}
										type={'checkbox'}
										value={c}
										checked={field.value.includes(c)}
										selected={field.value.includes(c)}
									/>
								))}
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{currentFatcaStatus.length > 0 && (
				<div className='space-y-10'>
					{/* Ownership */}
					<div>
						<FormItem className='space-y-2'>
							<FormLabel
								className={
									isErrored(
										`applicant.${applicantId}.disclosures.fatca.details.ownership`
									)
										? 'text-error-500'
										: undefined
								}>
								Ownership(%)
							</FormLabel>
							<FormControl>
								<Input
									{...register(
										`applicant.${applicantId}.disclosures.fatca.details.ownership`,
										{
											required: 'Please enter ownership',
                                            validate: {
                                                isNumeric: (v) =>
                                                    validator.isNumeric( v ) || 'Must be a number',
                                                lessThan100: ( v ) =>
                                                {
                                                    const value = parseInt( v );
                                                    return (value > 0 && value <= 100) || "Please enter valid percentage amount" 
                                                }
                                            },
										}
									)}
									placeholder='Enter Ownership'
								/>
							</FormControl>
							<ErrorMessage
								name={`applicant.${applicantId}.disclosures.fatca.details.ownership`}
								errors={errors}
								as={<FormError />}
							/>
						</FormItem>
					</div>
					{/* Foreign Residential Address */}
					<div>
						<FormItem className='space-y-2'>
							<FormLabel
								className={
									isErrored(
										`applicant.${applicantId}.disclosures.fatca.details.foreignResidentialAddress`
									)
										? 'text-error-500'
										: undefined
								}>
								Foreign Residential Address
							</FormLabel>
							<FormControl>
								<Input
									{...register(
										`applicant.${applicantId}.disclosures.fatca.details.foreignResidentialAddress`,
										{
											required: 'Please enter foreign residential address',
										}
									)}
									placeholder='Enter Foreign Residential Address'
								/>
							</FormControl>
							<ErrorMessage
								name={`applicant.${applicantId}.disclosures.fatca.details.foreignResidentialAddress`}
								errors={errors}
								as={<FormError />}
							/>
						</FormItem>
					</div>
					{/* Foreign Mailing Address */}
					<div>
						<FormItem className='space-y-2'>
                            <FormLabel
                                className={
									isErrored(
										`applicant.${applicantId}.disclosures.fatca.details.foreignMailingAddress`
									)
										? 'text-error-500'
										: undefined
								}
                            >Foreign Mailing Address</FormLabel>
							<FormControl>
								<Input
									{...register(
										`applicant.${applicantId}.disclosures.fatca.details.foreignMailingAddress`,
										{
											required: 'Please enter foreign mailing address',
										}
									)}
									placeholder='Enter Foreign Mailing Address'
								/>
							</FormControl>
							<ErrorMessage
								name={`applicant.${applicantId}.disclosures.fatca.details.foreignMailingAddress`}
								errors={errors}
								as={<FormError />}
							/>
						</FormItem>
					</div>
					{/* Foreign Telephone Number */}
					<div>
						<FormItem className='space-y-2'>
                            <FormLabel
                                className={
									(isErrored(
										`applicant.${applicantId}.disclosures.fatca.details.phoneNumber.areaCode`
									) || isErrored(
										`applicant.${applicantId}.disclosures.fatca.details.phoneNumber.lineNumber`
									))
										? 'text-error-500'
										: undefined
								}
                            >Foreign Telephone Number</FormLabel>
							<FormControl>
								<div className='flex w-full border rounded-lg border-neutral-300 has-[:focus]:border-primary-500'>
									<Select
										onValueChange={(v) =>
											handleAreaCode(
												`applicant.${applicantId}.disclosures.fatca.details.phoneNumber.areaCode`,
												v
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
										<SelectContent className='h-64'>
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
											`applicant.${applicantId}.disclosures.fatca.details.phoneNumber.lineNumber`,
											{
												required: 'Please enter phone number',
												validate: (v) =>
													validator.isMobilePhone(v) ||
													'Please enter valid phone number',
												deps: `applicant.${applicantId}.disclosures.fatca.details.phoneNumber.areaCode`,
											}
										)}
										placeholder='Enter Foreign Telephone Number'
										className='border-none'
									/>
								</div>
							</FormControl>
							<div className='flex'>
								<div className='w-1/4'>
									<ErrorMessage
										errors={errors}
										name={`applicant.${applicantId}.disclosures.fatca.details.phoneNumber.areaCode`}
										as={<FormError />}
									/>
								</div>
								<div>
									<ErrorMessage
										errors={errors}
										name={`applicant.${applicantId}.disclosures.fatca.details.phoneNumber.lineNumber`}
										as={<FormError />}
									/>
								</div>
							</div>
						</FormItem>
					</div>
					{/* TIN */}
					<div>
						<FormItem className='space-y-2'>
                            <FormLabel
                                className={
									isErrored(
										`applicant.${applicantId}.disclosures.fatca.details.tin`
									)
										? 'text-error-500'
										: undefined
								}
                            >
								Foreign Tax Identification Number (TIN)/Social Security Number
								(SSN)/National Identity Number(NIN)
							</FormLabel>
							<FormControl>
								<Input
									{...register(
										`applicant.${applicantId}.disclosures.fatca.details.tin`,
										{
											required: 'Please enter tin',
										}
									)}
									placeholder='Enter TIN/SSN/NIN'
								/>
							</FormControl>
							<ErrorMessage
								errors={errors}
								name={`applicant.${applicantId}.disclosures.fatca.details.tin`}
								as={<FormError />}
							/>
						</FormItem>
					</div>
				</div>
			)}
		</>
	);
}

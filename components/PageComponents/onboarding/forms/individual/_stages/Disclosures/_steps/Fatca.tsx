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
								<AccordionContent className='space-y-8'>
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
	const { control, watch, register, setValue, getValues, resetField } =
		useFormContext<IndividualFormSchema>();

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
		},
		[setValue, countryList]
    );
    
    useEffect( () =>
    {
        if ( currentFatcaStatus.length === 0 )
        {
            resetField(`applicant.${applicantId}.disclosures.fatca.details`)
        }
    }, [currentFatcaStatus,resetField,applicantId])

	return (
		<>
			{/* FATCA Status */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.disclosures.fatca.status`}
					render={({ field }) => (
						<FormItem className='space-y-5'>
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
						<FormItem className='space-y-5'>
							<FormLabel>Ownership(%)</FormLabel>
							<FormControl>
								<Input
									{...register(
										`applicant.${applicantId}.disclosures.fatca.details.ownership`
									)}
									placeholder='Enter Ownership'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					</div>
					{/* Foreign Residential Address */}
					<div>
						<FormItem className='space-y-5'>
							<FormLabel>Foreign Residential Address</FormLabel>
							<FormControl>
								<Input
									{...register(
										`applicant.${applicantId}.disclosures.fatca.details.foreignResidentialAddress`
									)}
									placeholder='Enter Foreign Residential Address'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					</div>
					{/* Foreign Mailing Address */}
					<div>
						<FormItem className='space-y-5'>
							<FormLabel>Foreign Mailing Address</FormLabel>
							<FormControl>
								<Input
									{...register(
										`applicant.${applicantId}.disclosures.fatca.details.foreignMailingAddress`
									)}
									placeholder='Enter Foreign Mailing Address'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					</div>
					{/* Foreign Telephone Number */}
					<div>
						<FormField
							control={control}
							name={`applicant.${applicantId}.disclosures.fatca.details.phoneNumber.lineNumber`}
							render={({ field }) => (
								<FormItem className='space-y-5 relative'>
									<FormLabel>Foreign Telephone Number</FormLabel>
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
												placeholder='Enter Foreign Telephone Number'
												className='border-none'
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{/* TIN */}
					<div>
						<FormItem className='space-y-5'>
							<FormLabel>
								Foreign Tax Identification Number (TIN)/Social Security Number
								(SSN)/National Identity Number(NIN)
							</FormLabel>
							<FormControl>
								<Input
									{...register(
										`applicant.${applicantId}.disclosures.fatca.details.tin`
									)}
									placeholder='Enter TIN/SSN/NIN'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					</div>
				</div>
			)}
		</>
	);
}

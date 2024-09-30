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
import type { SingleCategoryForm } from './NextOfKin_Bio';

interface NextOfKinContactsProps {
	countryList: Country[];
}

export default function NextOfKinContacts({ countryList }: NextOfKinContactsProps) {
	const form = useFormContext<IndividualFormSchema>();
	const { watch } = form;
	const applicant = useMemo(() => watch('applicant'), [watch]);

	return (
		<>
			<FormHeader>
				<FormTitle>Next of Kin - Contact Details</FormTitle>
				<FormSubHeader>Enter the contact information of your next of kin.</FormSubHeader>
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
									<NextOfKinContactForm
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

function NextOfKinContactForm({ applicantId, countryList }: SingleCategoryForm) {
	const { control, setValue, getValues } =
		useFormContext<IndividualFormSchema>();

	const currentMobileAreaCode = getValues(
		`applicant.${applicantId}.nextOfKin.contacts.mobile.areaCode`
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
					name={`applicant.${applicantId}.nextOfKin.contacts.residentialAddress`}
					render={({ field }) => (
						<FormItem className='space-y-5'>
							<FormLabel>Residential Address (Not a P.O Box)</FormLabel>
							<FormControl>
								<Input
                                    { ...field }
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
					name={`applicant.${applicantId}.nextOfKin.contacts.city`}
					render={({ field }) => (
						<FormItem className='space-y-5'>
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
			{/* Phone Number */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.nextOfKin.contacts.mobile.lineNumber`}
					render={({ field }) => (
						<FormItem className='space-y-5 relative'>
							<FormLabel>Phone Number</FormLabel>
							<FormControl>
								<div className='flex w-full border rounded-lg border-neutral-300 has-[:focus]:border-primary-500'>
									<Select
                                        onValueChange={ ( v ) => handleAreaCode(
                                            `applicant.${ applicantId }.nextOfKin.contacts.mobile.areaCode`,
                                            v
                                        )}>
										<SelectTrigger className='w-full border-none'>
                                            { currentMobileAreaCode ? (
                                                <p className='text-neutral-700'>
                                                    {currentMobileAreaCode}
                                                </p>
											) : (
												<SelectValue placeholder={'+233'}/>
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
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* Email Address */}
			<div>
				<FormField
					control={control}
					name={`applicant.${applicantId}.nextOfKin.contacts.email`}
					render={({ field }) => (
						<FormItem className='space-y-5'>
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
		</>
	);
}

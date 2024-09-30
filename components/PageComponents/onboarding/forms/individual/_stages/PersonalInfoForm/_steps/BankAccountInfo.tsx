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
import { useMemo } from 'react';
import Image from 'next/image';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import DatePicker from '@/components/UIcomponents/CompoundUI/DatePicker';
import type { IndividualFormSchema } from '@/types/forms/individual';
import type { Country, BankList } from '@/types/forms/universal';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import type { SingleCategoryForm } from './BiographicalInfo';
import { LoaderCircle } from 'lucide-react';

interface BankAccountInfoProps {
	countryList: Country[];
	bankList: BankList[];
	isLoadingBanks: boolean;
}

export default function BankAccountInfo({
	countryList,
	bankList,
	isLoadingBanks,
}: BankAccountInfoProps) {
	const form = useFormContext<IndividualFormSchema>();
	const { watch } = form;
	const applicant = useMemo(() => watch('applicant'), [watch]);

	return (
		<>
			<FormHeader>
				<FormTitle>Settlement Bank Account</FormTitle>
				<FormSubHeader>Enter your bank account information.</FormSubHeader>
			</FormHeader>
			<FormContent>
				{isLoadingBanks && (
					<div className='absolute bottom-10 left-10 z-10'>
						<LoaderCircle className='animate-spin text-primary-500' />
					</div>
				)}
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
									<BankForm
										applicantId={i}
										countryList={countryList}
										bankList={bankList}
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

interface BankFormProps extends SingleCategoryForm {
	bankList: BankList[];
}

function BankForm({ applicantId, countryList, bankList }: BankFormProps) {
    const { control } = useFormContext<IndividualFormSchema>();
    
    const today = new Date();

	return (
		<>
			{/* Bank Country */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.bank.country` }
                    rules={ {
                        required: "Select your Bank Country",
                    }}
                    render={ ( { field } ) =>
                    {
                        const flagUrl = FormHelpers.getFlagURL(field.value, countryList)
                        return(
						<FormItem className='space-y-2'>
                            <FormLabel>Bank Country</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value} >
								<SelectTrigger >
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
										<SelectValue placeholder={'Select Bank Country'} />
									</div>
								</SelectTrigger>
								<SelectContent className='w-full h-56 overflow-scroll' onCloseAutoFocus={field.onBlur}>
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
					)}}
				/>
			</div>
			{/* Bank Name */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.bank.name` }
                    rules={ {
                        required: "Select your bank"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Name of Bank</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<SelectTrigger className=''>
									<div className='flex space-x-2'>
										<SelectValue placeholder={'Select Name of Bank'} />
									</div>
								</SelectTrigger>
								<SelectContent className='w-full h-56 overflow-scroll' onCloseAutoFocus={field.onBlur}>
									{bankList.map((b) => (
										<SelectItem
											value={b.bank_name}
											key={b.bank_name}
											className='capitalize'>
											{b.bank_name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* Bank Branch */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.bank.branch` }
                    rules={ {
                        required: "Please enter the bank branch"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Bank Branch</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter Bank Branch'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* Account Name */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.bank.accountDetails.name` }
                    rules={ {
                        required: "Please enter account name"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Account Name</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter Account Name'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* Account Number */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.bank.accountDetails.number` }
                    rules={ {
                        required: "Please enter account number"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Account Number</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter Account Number'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* BVN Number */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.bank.accountDetails.bvn` }
                    rules={ {
                        required: "Please enter bvn"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>BVN Number</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter BVN Number'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* Acount Type */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.bank.accountDetails.type` }
                    rules={ {
                        required: "Please enter account type"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Acount Type</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter Acount Type'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
            </div>
            {/* Date Opened */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.bank.accountDetails.dateOpened` }
                    rules={ {
                        required: "Select date account was opened"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel className='block'>Date Opened</FormLabel>
							<FormControl>
								<DatePicker
									onChange={field.onChange}
                                    currentDate={ field.value }
                                    endMonth={ today }
                                    disabled={{ after: today }}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* Swift Code */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.bank.accountDetails.swiftCode` }
                    rules={ {
                        required: "Please enter SWIFT code"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Swift Code</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter Swift Code'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* Routing Number */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.bank.accountDetails.routingNumber` }
                    rules={ {
                        required: "Please enter rounting number"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Routing Number</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter Routing Number'
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

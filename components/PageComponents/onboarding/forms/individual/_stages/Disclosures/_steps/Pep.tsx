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
import Image from 'next/image';
import {
	FormHeader,
	FormTitle,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import type { IndividualFormSchema } from '@/types/forms/individual';
import type { Country } from '@/types/forms/universal';
import { CustomToggle } from '@/components/UIcomponents/CompoundUI/CustomToggle';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import { useMemo } from 'react';
import type { SingleCategoryForm } from '../../NextOfKin/_steps/NextOfKin_Bio';
import { ErrorMessage } from '@hookform/error-message';

interface PepProps {
	countryList: Country[];
}

export default function Pep({ countryList }: PepProps) {
	const form = useFormContext<IndividualFormSchema>();
	const { watch } = form;

	const applicant = useMemo(() => watch('applicant'), [watch]);

	return (
		<>
			<FormHeader>
				<FormTitle>
					Politically Exposed Person (PEP) Self-Certification
				</FormTitle>
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
								<AccordionContent
									className='data-[state=closed]:hidden'
									forceMount>
									<PepForm
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

function PepForm({ applicantId, countryList }: SingleCategoryForm) {
	const {
		control,
		watch,
		register,
        setValue,
        clearErrors,
		formState: { errors },
		getFieldState,
	} = useFormContext<IndividualFormSchema>();

	const currentPepStatus = watch(
		`applicant.${applicantId}.disclosures.pepInfo.isPep`
	);

	const { ref, name, onBlur, onChange } = register(
		`applicant.${applicantId}.disclosures.pepInfo.pepDetails.country`,
		{
			required: currentPepStatus === 'Yes' ? 'Select country' : false,
			deps: `applicant.${applicantId}.disclosures.pepInfo.isPep`,
		}
	);

	const currentCountry = watch(name);

	const flagUrl = FormHelpers.getFlagURL(currentCountry, countryList);

	const isErrored = (fieldName: any) =>
		getFieldState(fieldName).error !== undefined;

	return (
		<div>
			<div className='space-y-10'>
				<div className='text-base font-normal leading-relaxed p-4 bg-neutral-50 rounded-md border border-neutral-100 space-y-2.5'>
					<p className='max-w-prose'>
						In accordance with Anti-Money Laundering (AML) legislation, Kestrel
						Capital, Databank, and Afrinvest have an obligation to verify those
						clients who are classified as a Politically Exposed Person (PEP). In
						that regard, please read the definition below carefully, select the
						relevant box confirming you are/are not a PEP and sign the
						declaration at the bottom of the form. It is your obligation to
						inform us of a change to your status as a PEP should it change at
						any time in the future.
					</p>
					<p>
						A PEP means any individual who is or in the past has been, entrusted
						with a prominent public or political function and includes:
					</p>
					<ul className='pl-[20px]'>
						<li>(a) members of Cabinet;</li>
						<li>(b) senior executives of state-owned corporations;</li>
						<li>(c) important political party officials;</li>
						<li>
							(d) senior military officials and other members of the disciplined
							forces;
						</li>
						<li>(e) members of the Judiciary;</li>
						<li>(f) senior State Officers;</li>
						<li>(g) senior Public Officers;</li>
						<li>(h) senior Official of an International Organisation;</li>
						<li>
							(i) any immediate family member or close business associate of a
							person referred to under the categories (a) to (h).
						</li>
					</ul>
					<p>
						<b>PEP Family and Close Associates</b>
						<br />
						An “immediate family member” of a PEP includes any of the following:
					</p>
					<ul className='pl-[20px]'>
						<li>(a) any spouse of the PEP</li>
						<li>
							(b) any person who is considered to be the equivalent to a spouse
							of the PEP
						</li>
						<li>(c) any child, adopted child or step-child of the PEP</li>
						<li>(d) any parent of the PEP</li>
						<li>(e) any sibling, adopted sibling or step- sibling of a PEP</li>
					</ul>
					<p>
						<b>A “close associate” includes any of the following persons: </b>
					</p>
					<ul className='pl-[20px]'>
						<li>
							(a) any individual who is widely and publicly known or believed to
							have joint beneficial ownership of legal entities or legal
							arrangements (e.g. foundations, partnerships, trust agreements,
							power of attorney), or any other close business relations with a
							PEP;
						</li>
						<li>
							(b) any person who is the legal or nominal owner of a legal entity
							or legal arrangement that is known or believed to have been set up
							for the benefit of a PEP;
						</li>
						<li>
							(c) any personal advisor or consultant of a PEP, including a
							financial advisor or a person acting in a financial fiduciary
							capacity; and
						</li>
						<li>
							(d) any person who is publicly known and believed to be acting on
							behalf of a PEP.
						</li>
					</ul>
				</div>
				<div className='space-y-5'>
					<FormField
						control={control}
						name={`applicant.${applicantId}.disclosures.pepInfo.isPep`}
						rules={{
							required: 'Please select PEP option',
						}}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='mb-5 space-y-2'>
									Having read and understood the above definition please confirm
									if you, or any of your directors, authorised persons,
									shareholders or beneficial owners are a PEP?
								</FormLabel>
								<div className=' grid grid-cols-2 gap-x-3 gap-y-5'>
									<CustomToggle
										label={'Yes'}
										{...field}
										value={'Yes'}
										selected={field.value === 'Yes'}
									/>
									<CustomToggle
										label={'No'}
										{...field}
										value={'No'}
										selected={field.value === 'No'}
									/>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
					{currentPepStatus === 'Yes' && (
						<>
							<FormItem className='col-span-full space-y-2'>
								<FormLabel>If &quot;Yes&quot;, Please Specify How</FormLabel>
								<FormControl>
									<Input
										{...register(
											`applicant.${applicantId}.disclosures.pepInfo.pepDetails.desc`,
											{
												required: 'Please give a specific reason',
											}
										)}
										placeholder='Specify how'
									/>
								</FormControl>
								<ErrorMessage
									name={`applicant.${applicantId}.disclosures.pepInfo.pepDetails.desc`}
									errors={errors}
									as={<FormError />}
								/>
							</FormItem>

							<FormItem className='space-y-2'>
								<FormLabel
									className={
										isErrored(
											`applicant.${applicantId}.disclosures.pepInfo.pepDetails.country`
										)
											? 'text-error-500'
											: undefined
									}>
									In which country
								</FormLabel>
								<Select
									onValueChange={async (v) => {
                                        setValue( name, v );
                                        clearErrors( `applicant.${ applicantId }.disclosures.pepInfo.pepDetails.country` );
									}}
									value={currentCountry}>
									<SelectTrigger ref={ref}>
										<div className='flex space-x-2'>
											<div className='w-[20px] h-[20] flex items-center'>
												{flagUrl && (
													<Image
														src={flagUrl}
														width={20}
														height={20}
														alt={`country flag`}
														className='aspect-square'
													/>
												)}
											</div>
											<SelectValue placeholder={'Select Country'} />
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
									errors={errors}
									name={`applicant.${applicantId}.disclosures.pepInfo.pepDetails.country`}
									as={<FormError />}
								/>
							</FormItem>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

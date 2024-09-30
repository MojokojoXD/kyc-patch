import { useFormContext } from 'react-hook-form';
import {
	FormField,
	FormItem,
	FormControl,
	FormLabel,
    FormMessage,
} from '@/components/UIcomponents/ui/form';
import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/UIcomponents/ui/accordion';
import { Input } from '@/components/UIcomponents/ui/input';
import { useMemo } from 'react';
import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import type { IndividualFormSchema } from '@/types/forms/individual';
import type { SingleCategoryForm } from './BiographicalInfo';
import { CustomToggle } from '@/components/UIcomponents/CompoundUI/CustomToggle';
import MULTI_CHOICE_RESPONSES from '@/utils/vars/_formDefaults/personal_multiple_choice.json'
import validator from 'validator';

interface RiskProfileProps
{
    
}

export default function RiskProfile({  }: RiskProfileProps) {
	const form = useFormContext<IndividualFormSchema>();
	const { watch } = form;
    const applicant = useMemo( () => watch( 'applicant' ), [ watch ] );
    

	return (
		<>
			<FormHeader>
				<FormTitle>Investment & Risk Profile</FormTitle>
				<FormSubHeader>Complete your investment & risk profile.</FormSubHeader>
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
									<RiskProfileForm
										applicantId={i}
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

interface RiskProfileFormProps extends Omit<SingleCategoryForm,"countryList"> {}

function RiskProfileForm({ applicantId }: RiskProfileFormProps) {
    const { control,watch,resetField, clearErrors } = useFormContext<IndividualFormSchema>();
    
    const currentTopUpFrequency = watch( `applicant.${ applicantId }.riskProfile.topUpFrequency.frequency` );
    const currentWithdrawalFrequency = watch( `applicant.${ applicantId }.riskProfile.withdrawalFrequency.frequency` );
    const currentSourceOfFunds = watch( `applicant.${ applicantId }.riskProfile.sourceOfFunds` );

	return (
        <>
            {/* Risk Tolerance */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.riskProfile.tolerance` }
                    rules={ {
                        required: "Select risk tolerance"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Risk Tolerance</FormLabel>
							<div className='grid grid-cols-3 gap-x-3'>
								{MULTI_CHOICE_RESPONSES.riskProfile.riskTolerance.map((c) => (
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
			{/* Investment Objective */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.riskProfile.investmentObjective` }
                    rules={ {
                        required: "Please enter investment objective"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Investment Objective</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter Investment Objective'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* Beneficial Owner */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.riskProfile.beneficialOwner` }
                    rules={ {
                        required: "Please enter beneficial owner"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Beneficial Owner</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter Beneficial Owner'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
            </div>
            {/* Investment Horizon */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.riskProfile.investmentHorizon` }
                    rules={ {
                        required: "Select investment horizon"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Investment Horizon</FormLabel>
							<div className='grid gap-y-3'>
								{MULTI_CHOICE_RESPONSES.riskProfile.investmentHorizon.map((c) => (
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
            {/* Initial Investment Amount */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.riskProfile.initialAmount` }
                    rules={ {
                        required: "Please enter initial investment amount",
                        validate: v => validator.isNumeric(v) || "must be a number"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Initial Investment Amount(GHS)</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter Initial Investment Amount'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
            </div>
            {/* TopUps Frequency */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.riskProfile.topUpFrequency.frequency` }
                    rules={ {
                        required: "Select deposit amount frequency"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Anticipated Investment Activity: Top-ups</FormLabel>
							<div className='grid grid-cols-2 gap-3'>
								{MULTI_CHOICE_RESPONSES.riskProfile.transactionFrequency.map((c) => (
									<CustomToggle
										key={c}
										label={c}
                                        { ...field }
                                        onChange={ ( e ) =>
                                        {
                                            e.target.value !== "Other" && resetField( `applicant.${ applicantId }.riskProfile.topUpFrequency.other`, { defaultValue: "" } );

                                            field.onChange( e );
                                        } }
										value={c}
										selected={field.value === c}
									/>
								))}
							</div>
							<FormMessage />
						</FormItem>
					)}
                />
                {currentTopUpFrequency === 'Other' && <FormField
					control={control}
                    name={ `applicant.${ applicantId }.riskProfile.topUpFrequency.other` }
                    rules={ {
                        required: "Please enter other deposit frequency"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2 mt-5'>
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
				/>}
            </div>
			{/* Top Up Amount */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.riskProfile.topUpAmount` }
                    rules={ {
                        required: "Please enter regular deposit amount",
                        validate: v => validator.isNumeric(v) || "must be a number"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Expected Regular Top-up Amount (GHS)</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter Top Up Amount'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
            </div>
            {/* Withdrawal Frequency */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.riskProfile.withdrawalFrequency.frequency` }
                    rules={ {
                        required: "Select withdrawal amount frequency"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Anticipated Investment Activity: Withdrawals</FormLabel>
							<div className='grid grid-cols-2 gap-3'>
								{MULTI_CHOICE_RESPONSES.riskProfile.transactionFrequency.map((c) => (
									<CustomToggle
										key={c}
										label={c}
                                        { ...field }
                                        onChange={ ( e ) =>
                                        {
                                            e.target.value !== "Other" && resetField( `applicant.${ applicantId }.riskProfile.withdrawalFrequency.other`, { defaultValue: "" } );

                                            field.onChange( e );
                                        } }
										value={c}
										selected={field.value === c}
									/>
								))}
							</div>
							<FormMessage />
						</FormItem>
					)}
                />
                {currentWithdrawalFrequency === 'Other' && <FormField
					control={control}
                    name={ `applicant.${ applicantId }.riskProfile.withdrawalFrequency.other` }
                    rules={ {
                        required: "Please enter other withdrawal frequency"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2 mt-5'>
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
				/>}
            </div>
            {/* Withdrawal Amount */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.riskProfile.withdrawalAmount` }
                    rules={ {
                        required: "Please enter withdrawal amount",
                        validate: v => validator.isNumeric(v) || "must be a number"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Expected Regular Withdrawal Amount (GHS)</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter Withdrawal Amount'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
            </div>
            {/* Withdrawal Timetable */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.riskProfile.significantWithdrawalTimetable` }
                    rules={ {
                        required: "Select significant withdrawal frequency"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>When do you plan to withdraw a significant portion of your money?</FormLabel>
							<div className='grid gap-y-3'>
								{MULTI_CHOICE_RESPONSES.riskProfile.withdrawalTimetable.map((c) => (
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
            {/* Emergency Funding */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.riskProfile.emergencyFunds` }
                    rules={ {
                        required: "Select emergency funds availability"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Do you have an emergency fund (ie 6 months of after-tax income)?</FormLabel>
							<div className='grid gap-y-3'>
								{MULTI_CHOICE_RESPONSES.riskProfile.emergencyFunds.map((c) => (
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
            {/* Investment Knowledge */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.riskProfile.investmentKnowledge` }
                    rules={ {
                        required: "Select your investment knowledge"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>What is the level of your investment knowledge</FormLabel>
							<div className='grid grid-cols-3 gap-3'>
								{MULTI_CHOICE_RESPONSES.riskProfile.investmentKnowledge.map((c) => (
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
            {/* Source of Income */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.riskProfile.sourceOfFunds` }
                    rules={ {
                        required: "Select source of funds"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Source of Funds</FormLabel>
							<div className='grid gap-3'>
                                { MULTI_CHOICE_RESPONSES.riskProfile.sourceOfFunds.map( ( c ) => (
                                    <CustomToggle
                                        key={ c }
                                        label={ c }
                                        { ...field }
                                        onChange={ e =>
                                        {
                                            let temp: string[];
                                            if ( e.target.checked )
                                            {
                                                temp = [ ...field.value, e.target.value ];
                                                field.onChange( temp );
                                                return;
                                            }
                                            
                                            temp = [ ...field.value.filter( s => s !== e.target.value ) ];

                                            field.onChange( temp );
                                            
                                        } }
                                        type={ 'checkbox' }
                                        name={ field.name }
                                        id={field.name}
                                        value={c}
                                        selected={currentSourceOfFunds.includes(c)}
									/>
								))}
							</div>
							<FormMessage />
						</FormItem>
					)}
                />
            </div>
            {/* Statement Delivery */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.riskProfile.statements.deliveryMode` }
                    rules={ {
                        required: "Select method of statement delivery"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Mode of Statement Delivery</FormLabel>
							<div className='grid gap-3'>
								{MULTI_CHOICE_RESPONSES.riskProfile.statements.deliveryModeOptions.map((c) => (
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
            {/* Statement Frequency */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.riskProfile.statements.frequency` }
                    rules={ {
                        required: "Select statement delivery frequency"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>Statement Frequency</FormLabel>
							<div className='grid grid-cols-3 gap-3'>
								{MULTI_CHOICE_RESPONSES.riskProfile.statements.frequencyOptions.map((c) => (
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
            {/* Reaction */}
			<div>
				<FormField
					control={control}
                    name={ `applicant.${ applicantId }.riskProfile.reaction` }
                    rules={ {
                        required: "Select your investment reaction"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel>How would you react if an investment you have invested in lost 10% of its value in the first year:</FormLabel>
							<div className='grid gap-3'>
								{MULTI_CHOICE_RESPONSES.riskProfile.reactionOptions.map((c) => (
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
            {/* Terms and Agreement */}
            <div className='space-y-2'>
                <FormField
                    control={ control }
                    name={ `applicant.${ applicantId }.riskProfile.agreementOfTerms` }
                    rules={ {
                        validate: v => v === 'true' || 'You must acknowledge the risk terms and agreement to proceed'
                    }}
                    render={ ( { field } ) => (
                        <FormItem>
                            <FormControl>
                                <CustomToggle
                                    label='I/We understand investing in equities/shares is inherently riskier than investing in fixed income products and holding cash'
                                    { ...field }
                                    onChange={ e =>
                                    {  
                                        clearErrors(`applicant.${applicantId}.riskProfile.agreementOfTerms`)
                                        field.onChange( e.target.checked.toString())
                                    }  }
                                    type='checkbox'
                                    className='text-base py-10'
                                    selected={field.value === 'true'}
                                />                   
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>
		</>
	);
}

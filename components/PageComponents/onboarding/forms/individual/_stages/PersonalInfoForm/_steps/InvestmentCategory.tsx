import { useFormContext } from 'react-hook-form';
import {
	FormField,
	FormItem,
	FormControl,
	FormLabel,
	FormMessage,
} from '@/components/UIcomponents/ui/form';
import { Input } from '@/components/UIcomponents/ui/input';
import {
	FormHeader,
	FormTitle,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import type { IndividualFormSchema } from '@/types/forms/individual';
import { CustomToggle } from '@/components/UIcomponents/CompoundUI/CustomToggle';

export default function InvestmentCategory() {
	const form = useFormContext<IndividualFormSchema>();

	const { watch } = form;

	const { catInvestment, taxexempt } = watch();

	return (
		<>
			<FormHeader>
				<FormTitle>Category of Investment</FormTitle>
			</FormHeader>
			<FormContent>
				<FormField
					control={form.control}
					name={'csdNumber'}
					render={({ field }) => (
						<FormItem className='space-y-2.5'>
							<FormLabel>CSD Number (If Applicable)</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={'catInvestment'}
					rules={{
						required: 'Select an option',
					}}
					render={({ field }) => (
						<FormItem className='space-y-2.5'>
							<FormLabel>Category of Investment</FormLabel>
							<div className=' grid grid-cols-2 gap-3'>
								<CustomToggle
									label='Fixed Income'
									{...field}
									value={'Fixed Income'}
									selected={catInvestment === 'Fixed Income'}
								/>
								<CustomToggle
									label='Equities/Shares'
									{...field}
									value={'Equities/Shares'}
									selected={catInvestment === 'Equities/Shares'}
								/>
                            </div>
                            <FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
                    name={ 'taxexempt' }
                    rules={ {
                        required: "Select an option"
                    }}
					render={({ field }) => (
						<FormItem className='space-y-2.5'>
							<FormLabel>Are you tax exempt?</FormLabel>
							<div className=' grid grid-cols-2 gap-3'>
								<CustomToggle
									label='Yes'
									{...field}
									value={'Yes'}
									selected={taxexempt === 'Yes'}
								/>
								<CustomToggle
									label='No'
									{...field}
									value={'No'}
									selected={taxexempt === 'No'}
								/>
                            </div>
                            <FormMessage/>
						</FormItem>
					)}
				/>
			</FormContent>
		</>
	);
}

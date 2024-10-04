import { useFormContext } from 'react-hook-form';
import {
	FormField,
	FormItem,
    FormLabel,
    FormMessage
} from '@/components/UIcomponents/ui/form';
import {
	FormContent,
	FormTitle,
	FormHeader,
} from '@/components/UIcomponents/FormLayout';
import type { IndividualFormSchema } from '@/types/forms/individual';
import { CustomToggle } from '@/components/UIcomponents/CompoundUI/CustomToggle';

export default function RetailClient() {
	const form = useFormContext<IndividualFormSchema>();

	return (
		<>
			<FormHeader>
				<FormTitle>Retail Client</FormTitle>
			</FormHeader>
            <FormContent>
                <div className='space-y-[40px]'>
                    <FormField
                        control={form.control}
                        name={'clientType'}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Client Type</FormLabel>
                                <div className='grid grid-cols-2 gap-[8px]'>
                                    <CustomToggle
                                        label='Individual'
                                        {...field}
                                        value={'Individual'}
                                        selected={field.value === 'Individual'}
                                    />
                                    <CustomToggle
                                        label='Joint Account'
                                        {...field}
                                        value={'Joint Account'}
                                        selected={field.value === 'Joint Account'}
                                    />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={'clientStatus'}
                        rules={{
                            required: 'Select an option',
                        }}
                        render={ ( { field } ) => (
                        
                            <FormItem className='space-y-2.5'>
                                <FormLabel>Client Status</FormLabel>
                                <div className=' grid grid-cols-2 gap-[8px]'>
                                    <CustomToggle
                                        label='New Client'
                                        {...field}
                                        value={'New Client'}
                                        selected={field.value === 'New Client'}
                                    />
                                    <CustomToggle
                                        label='Existing Client'
                                        {...field}
                                        value={'Existing Client'}
                                        selected={field.value === 'Existing Client'}
                                    />
                                </div>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                </div>
			</FormContent>
		</>
	);
}

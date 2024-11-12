import { useEffect } from 'react';
import type { FactoryComponentProps } from '@/types/Components/formFactory';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import { useFormContext, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { FormItem, FormControl, FormMessage } from '../../ui/form';
import { CustomToggle } from '../../CompoundUI/CustomToggle';

interface FormAgreementProps extends FactoryComponentProps {}

export default function FormAgreement({
	name,
	label,
	defaultValue = false,
    rules = { 
        required: 'Click on the button above to agree to the terms above to continue',
            validate: v => Boolean(v) || "Click on the button above to agree to the terms above to continue",
     },
	componentProps = { agreementVersion: '-1' },
}: FormAgreementProps) {
	const { control, getValues, setValue } =
		useFormContext();

	const currentValue = getValues(name as Path<IndividualFormSchema>);

	useEffect(() => {
		const rootPath = name.split('.').slice(0, -1);
		const versionPath = [...rootPath, 'version'].join(
			'.'
		) as Path<IndividualFormSchema>;
		const timestampPath = [...rootPath, 'timestamp'].join(
			'.'
		) as Path<IndividualFormSchema>;
		if (Boolean(currentValue)) {
			versionPath &&
				setValue(versionPath, componentProps.agreementVersion);
			timestampPath &&
				setValue(timestampPath, new Date().toISOString());
		} else {
			versionPath && setValue(versionPath, '-1');
			timestampPath && setValue(timestampPath, '');
		}
	}, [currentValue, componentProps,name, setValue]);

	return (
		<Controller
			control={control}
			name={name as Path<IndividualFormSchema>}
			defaultValue={defaultValue}
			rules={ !rules ? {} : rules }
			render={({ field, fieldState }) => (
				<FormItem>
					<FormControl>
						<CustomToggle
							{...field}
							label={label}
                            type={ 'checkbox' }
                            className='normal-case'
							onChange={(e) => field.onChange(e.target.checked)}
							selected={field.value}
						/>
					</FormControl>
                    <FormMessage>
                        {fieldState.error?.message}
                    </FormMessage>
				</FormItem>
			)}
		/>
	);
}

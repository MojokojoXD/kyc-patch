// import { useEffect } from 'react';
import type { FactoryComponentProps } from '@/types/Components/formFactory';
import { useFormContext, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { FormItem, FormControl, FormMessage } from '../../../ui/form';
import { CustomToggle } from '@/components/ui/CompoundUI/CustomToggle';
import { cn } from '@/lib/utils';

interface FormAgreementProps extends FactoryComponentProps<'agreement'> {}

export default function FormAgreement({
	name,
	label,
	defaultValue = false,
	rules = {
		required: 'Click on the button above to agree to the terms above to continue',
		validate: (v) =>
			Boolean(v) ||
			'Click on the button above to agree to the terms above to continue',
	},
	componentProps = {
		agreementVersion: '-1',
		classNames: { errorPosition: 'absolute', toggleStyles: '' },
	},
}: FormAgreementProps) {
	const { control, getValues, setValue } = useFormContext();
	const currentValue = getValues(name);

	const rootPath = name.split('.').slice(0, -1);
	const versionPath = [...rootPath, 'version'].join('.') as Path<{
		[index: string]: unknown;
	}>;
	const timestampPath = [...rootPath, 'timestamp'].join('.') as Path<{
		[index: string]: unknown;
	}>;
	if (Boolean(currentValue)) {
		versionPath && setValue(versionPath, componentProps.agreementVersion);
		timestampPath && setValue(timestampPath, new Date().toISOString());
	} else {
		versionPath && setValue(versionPath, '-1');
		timestampPath && setValue(timestampPath, '');
	}
	// useEffect(() => {
	// }, [ currentValue, config, name, setValue ] );

	return (
		<Controller
			control={control}
			name={name}
			defaultValue={defaultValue}
			rules={!rules ? {} : rules}
			render={({ field, fieldState }) => (
				<FormItem>
					<FormControl>
						<CustomToggle
							{...field}
							label={label}
							type={'checkbox'}
							className={cn('normal-case', componentProps.classNames?.toggleStyles)}
							onChange={(e) => field.onChange(e.target.checked)}
							selected={field.value}
						/>
					</FormControl>
					<FormMessage position={componentProps.classNames?.errorPosition}>
						{fieldState.error?.message}
					</FormMessage>
				</FormItem>
			)}
		/>
	);
}

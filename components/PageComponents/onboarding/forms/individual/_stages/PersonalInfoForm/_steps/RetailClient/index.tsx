import { useFormContext } from 'react-hook-form';
import {
	FormContent,
	FormTitle,
	FormHeader,
} from '@/components/UIcomponents/FormLayout';
import type { IndividualFormSchema } from '@/types/forms/individual';
import { retailClientFields } from './formbuilder/retailClientFormFields';
import FormFactory from '@/components/UIcomponents/FormFactory';
import { useEffect } from 'react';
import type { ClientType } from '@/types/forms/individual';

export enum ClientTypeCount {
	INDIVIDUAL = 1,
	JOINT_ACCOUNT = 2,
}

export default function RetailClient() {
	const { watch, setValue } = useFormContext<IndividualFormSchema>();

	const currentClientType = watch(`clientType`);

	useEffect(() => {
		setValue(
			`_formMetadata.applicantCount`,
			currentClientType === 'Individual' ? 1 : 2
		);
	}, [currentClientType]);

	return (
		<>
			<FormHeader>
				<FormTitle>Retail Client</FormTitle>
			</FormHeader>
			<FormContent>
				<div className='space-y-[40px]'>
					{retailClientFields.map((f) => (
						<FormFactory
							key={f.name}
							{...f}
						/>
					))}
				</div>
			</FormContent>
		</>
	);
}

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
import type { FormStep } from '@/types/Components/onboarding';

export enum ClientApplicantMapping {
	INDIVIDUAL = 1,
	JOINT_ACCOUNT = 2,
}

export const RetailClient: FormStep = () => {
	const { watch, setValue } = useFormContext<IndividualFormSchema>();
	const currentClientType = watch(`clientType`);

	useEffect(() => {
		setValue(
			`_formMetadata.applicantCount`,
			currentClientType === 'Individual'
				? ClientApplicantMapping.INDIVIDUAL
				: ClientApplicantMapping.JOINT_ACCOUNT
		);
	}, [currentClientType, setValue]);

	return (
		<>
			<FormHeader>
				<FormTitle>Retail Client</FormTitle>
			</FormHeader>
			<FormContent>
				<div className='space-y-[40px] py-5'>
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
};

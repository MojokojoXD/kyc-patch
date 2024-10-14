// import { useFormContext } from 'react-hook-form';
// import type { IndividualFormSchema } from '@/types/forms/individual';
import {
	FormContent,
	FormHeader,
	FormSubHeader,
	FormTitle,
} from '@/components/UIcomponents/FormLayout';
// import { useMemo } from 'react';
import type { FormStep } from '@/types/Components/onboarding';

export const Review: FormStep = () =>
{



	return (
		<>
			<FormHeader>
				<FormTitle>Application Summary</FormTitle>
				<FormSubHeader>
					Review your submissions for any inaccuracies
				</FormSubHeader>
            </FormHeader>
            <FormContent>

            </FormContent>
		</>
	);
};

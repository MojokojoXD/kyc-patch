import type { FormStep } from '@/types/Components/onboarding';
import {
	FormContent,
	FormHeader,
	FormTitle,
} from '@/components/UIcomponents/FormLayout';


export const Submit$Corporate: FormStep = () => {

	return (
		<>
			<FormHeader>
				<FormTitle>All Done!</FormTitle>
			</FormHeader>
            <FormContent>
                In the works!
                Under construction
			</FormContent>
		</>
	);
};

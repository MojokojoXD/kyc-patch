import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import type { FormStep } from '@/types/Components/onboarding';
import FormFactory from '@/components/UIcomponents/FormFactory';
import { afrinvestPrivacyPolicyFields } from './formBuilder/afrinvestPrivacyPolicyFields';

export const AfrinvestPrivacyPolicy:FormStep = () => {

	return (
		<>
			<FormHeader>
				<FormTitle>Privacy Policy - Afrinvest</FormTitle>
				<FormSubHeader>
					Please read and consent to the privacy policy below.
				</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='text-neutral-700 paragraph2Regular px-6 py-10 bg-neutral-50 rounded-md border border-neutral-100 space-y-6 overflow-auto max-w-prose '>
					<p>
						We will like to hold and process your personal data for the
						provision of financial services to you subject to your express
						consent authorising us to do so and such data will not be disclosed
						to or accessed by any third party except with your prior approval,
						for regulatory reasons or if such disclosure is required for the
						performance of the financial services to you.
					</p>
				</div>
				<div >
                    {
                        afrinvestPrivacyPolicyFields.map( f => (
                            <FormFactory key={f.name} { ...f }/>
                        ) )
                    }
				</div>
			</FormContent>
		</>
	);
}


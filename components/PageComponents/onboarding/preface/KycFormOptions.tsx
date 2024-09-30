import { Button } from '@/components/UIcomponents/ui/button';
import { CustomToggle } from '@/components/UIcomponents/CompoundUI/CustomToggle';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
	FormContent,
	FormHeader,
	FormTitle,
	FormSubHeader,
} from '@/components/UIcomponents/FormLayout';

const formOptions = [
	{
		id: 'KYC_IND',
		label: 'Individual or Joint',
		href: '/individual',
	},
	{
		id: 'KYC_CORP',
		label: 'Corporate',
		href: '/corporate',
	},
	{
		id: 'KYC_ITF',
		label: 'ITF',
		href: '/itf',
	},
];

export default function KycFormOptions() {
	const router = useRouter();
	const [formID, setFormID] = useState<string>('');
	const [selectionError, setSelectionError] = useState<string>('');

	const handleFormSelection = (formIDUpdate: string) => setFormID(formIDUpdate);

	const handleContinue = () => {
		const selectedForm = formOptions.filter((o) => o.id === formID).at(0);

		if (!selectedForm) {
			setSelectionError('form selection failure');
			return;
		}

		const formPath = selectedForm.href;

		router.replace('/onboarding' + formPath);
	};

	useEffect(() => {
		const initOnboardingIds = () => {
			if (
				sessionStorage.getItem('clientId') &&
				sessionStorage.getItem('submissionId')
            )
            {
				return;
            }

			const { slug } = router.query;

			if (!slug || !Array.isArray(slug)) {
				router.replace('/404');
				return;
			}

			const [clientId, submissionId] = slug;

            //check if clientId is valid
            
			sessionStorage.setItem('clientId', clientId);
			sessionStorage.setItem('submissionId', submissionId);
		};

		initOnboardingIds();
	}, [router]);

	return (
		<>
			<FormHeader>
				<FormTitle>KYC Verification</FormTitle>
				<FormSubHeader>Select application</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='flex flex-col space-y-5 mt-10'>
					{/* <h6 className={typography.paragraph2Medium}>Select Account type</h6> */}
					{formOptions.map((o) => (
						<div
							key={o.id}
							className='w-full'>
							<CustomToggle
								selected={formID === o.id}
								label={o.label}
								type={'checkbox'}
								value={o.id}
								onChange={() => handleFormSelection(o.id)}
							/>
						</div>
					))}
					<div className='h-10'>
						{selectionError && (
							<p className='text-error-500 text-center'>{selectionError}</p>
						)}
					</div>
				</div>
				<div className='absolute w-full bottom-0 inset-x-0 flex justify-end h-fit px-10 py-5'>
					<Button
						onClick={handleContinue}
						disabled={!formID}
						size='lg'>
						Continue
					</Button>
				</div>
			</FormContent>
		</>
	);
}

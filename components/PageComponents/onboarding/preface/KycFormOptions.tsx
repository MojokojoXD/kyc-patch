import { Button } from '@/components/UIcomponents/ui/button';
import { CustomToggle } from '@/components/UIcomponents/CompoundUI/CustomToggle';
import { useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import {
	FormContent,
	FormHeader,
	FormTitle,
	FormSubHeader,
} from '@/components/UIcomponents/FormLayout';
import { BASE_URL } from '@/utils/vars/uri';
import axios from 'axios';

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

const BROKER_INFO_URL = BASE_URL + '/';



export default function KycFormOptions() {
	const router = useRouter();
	const [formID, setFormID] = useState<string>('');
	const [selectionError, setSelectionError] = useState<string>('');
    
	const handleFormSelection = (formIDUpdate: string) => setFormID(formIDUpdate);

	const handleContinue = () => {
        const selectedForm = formOptions.filter( ( o ) => o.id === formID ).at( 0 );
        
		if (!selectedForm) {
			setSelectionError('form selection failure');
			return;
		}

		const formPath = selectedForm.href;

		router.replace('/onboarding' + formPath);
	};

	

	return (
        <>
			<FormHeader>
				<FormTitle>KYC Verification</FormTitle>
				<FormSubHeader>
					Comply with regulations and help us secure our platform and users with
					our quick and easy KYC verification process. Select the type of
					account you want to create.
				</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='flex flex-col space-y-[40px]'>
					<p className='paragraph2Medium'>Select Account Type</p>
					{/* <h6 className={typography.paragraph2Medium}>Select Account type</h6> */}
					<div className='space-y-[8px]'>
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
						<div>
							{selectionError && (
								<p className='text-error-500 mt-5'>{selectionError}</p>
							)}
						</div>
					</div>
					<div className=' flex justify-end'>
						<Button
							onClick={handleContinue}
							disabled={!formID}
							size='lg'>
							Continue
						</Button>
					</div>
				</div>
			</FormContent>
		</>
	);
}

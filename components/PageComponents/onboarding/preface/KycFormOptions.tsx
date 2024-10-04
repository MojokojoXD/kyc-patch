import { Button } from '@/components/UIcomponents/ui/button';
import { CustomToggle } from '@/components/UIcomponents/CompoundUI/CustomToggle';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import {
	FormContent,
	FormHeader,
	FormTitle,
	FormSubHeader,
} from '@/components/UIcomponents/FormLayout';
import { BASE_URL } from '@/utils/vars/uri';
import axios from 'axios';
import { UserActions } from '@/utils/clientActions/userActions';
import Loading from '@/components/UIcomponents/Loading';
import { UserContext } from '@/Contexts/UserProfileProvider';

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
    const [ isLoading, setIsLoading ] = useState<boolean>( false );
    
    //use app wide context;
    const appWideData = useContext( UserContext );

	const handleFormSelection = (formIDUpdate: string) => setFormID(formIDUpdate);

	const handleContinue = () => {
		const selectedForm = formOptions.filter((o) => o.id === formID).at(0);
        if ( selectionError ) return;
		if (!selectedForm) {
			setSelectionError('form selection failure');
			return;
		}

		const formPath = selectedForm.href;

		router.replace('/onboarding' + formPath);
	};

	const initOnboardingIds = async () => {
		const { slug } = router.query;

		if (!slug || !Array.isArray(slug)) {
			router.replace('/404');
			return;
		}

        const [ clientId, submissionId ] = slug;

        try {
            setIsLoading(true)
    
            const isValid = await UserActions.isClientIdValid( clientId );

            if ( !isValid  )
            {
                setIsLoading( false );
                setSelectionError( "This link has expired. Contact your broker for a new one!" )
                return;
            }
    
            const broker = await UserActions.getUserAndBrokerInfo( clientId, submissionId );

            if ( !broker )
            {
                setIsLoading( false );
                setSelectionError( 'Failed to load broker information. Please contact system admin' );
                return;
            }

            appWideData?.getOnboardingFacts( {
                clientID: clientId,
                broker: {...broker}
            })
            
            setIsLoading( false );
            
        } catch (error) {
            console.log( error );
        }
    
	};

	useEffect(() => {
		initOnboardingIds();
    }, [] );
    

	return (
        <>
            { isLoading && <Loading/> }
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

import { createContext, useState, useEffect } from 'react';
import type { Profile } from '@/types/accounts/user';
import type { Broker } from '@/types/forms/broker';
import { UserActions } from '@/utils/clientActions/userActions';

type OnboardingFacts = {
    clientID: string;
    broker: Broker;
}

export interface UserContextSchema {
	profile: Profile | undefined;
    onboardingFacts: OnboardingFacts | undefined;
    getUserProfile: ( profile: Profile ) => void;
    getOnboardingFacts: ( facts: OnboardingFacts ) => void;
}

interface UserContextProviderProps {
	children: React.ReactNode;
}

export const UserContext = createContext<UserContextSchema | null>(null);

function UserContextProvider({ children }: UserContextProviderProps) {
    const [ userProfile, setUserProfile ] = useState<Profile | undefined>( undefined );
    const [ onboardingFacts, setOnboardingFacts ] = useState<OnboardingFacts | undefined>()

    const getUserProfile = ( profile: Profile ) => setUserProfile( profile );

    const getOnboardingFacts = ( facts: OnboardingFacts | undefined ) => setOnboardingFacts( facts );


	//fetch user profile using access token set in site cookie
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const profile = await UserActions.getUserProfile();

				setUserProfile(profile);
			} catch (error) {
				console.log(error);
			}
		}

		fetchProfile();
	}, []);

	return (
        <UserContext.Provider value={
            {
                profile: userProfile,
                onboardingFacts: onboardingFacts,
                getUserProfile,
                getOnboardingFacts
            }
        }>
			{children}
		</UserContext.Provider>
	);
}

export default UserContextProvider;

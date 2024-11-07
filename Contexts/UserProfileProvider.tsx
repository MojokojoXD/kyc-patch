import { createContext, useState, useEffect } from 'react';
import type { Profile } from '@/types/accounts/user';
import { UserActions } from '@/utils/clientActions/userActions';


export interface UserContextSchema {
	profile: Profile | undefined;
    getUserProfile: ( profile: Profile ) => void;
}

interface UserContextProviderProps {
	children: React.ReactNode;
}

export const UserContext = createContext<UserContextSchema | null>(null);

function UserContextProvider({ children }: UserContextProviderProps) {
    const [ userProfile, setUserProfile ] = useState<Profile | undefined>( undefined );

    const getUserProfile = ( profile: Profile ) => setUserProfile( profile );


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
                getUserProfile,
            }
        }>
			{children}
		</UserContext.Provider>
	);
}

export default UserContextProvider;

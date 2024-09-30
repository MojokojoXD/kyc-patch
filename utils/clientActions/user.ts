import type { Profile } from '@/types/accounts/user';
import axios from 'axios';
import { BASE_URL } from '../vars/uri';

const userProfileEndpoint = 'users/self';

export class UserActions {
	static TokenPattern: RegExp = /token=([^;]+)/;

	//Can only be used client side
	static async getUserProfile(): Promise<Profile | undefined> {
		if (typeof document === 'undefined') {
			throw new Error(
				this.getUserProfile.name + ' can only be used in the browser'
			);
		}

		const siteCookies = document.cookie;

		const accessToken = siteCookies.match(this.TokenPattern);

		if (!accessToken) return;

		const filterTokenCollection = accessToken.filter(Boolean);

		if (filterTokenCollection.length === 0) return;

		try {
			const res = await axios.get(`${BASE_URL}/${userProfileEndpoint}`, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${filterTokenCollection[1]}`,
				},
			});

			if (res.status === 200) {
				return res.data.profile;
			} else {
				throw new Error(`failed to load user profile, request status: ${res.status}.
                Server message: ${res.statusText}`);
			}
		} catch (error: any) {
			console.log(error.message);
		}
	}
}

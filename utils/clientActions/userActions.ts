import type { Profile } from '@/types/accounts/user';
import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../vars/uri';
import type { BrokerDetails } from '@/types/forms/broker';

const USER_PROFILE_ENDPOINT = 'users/self';

const SUBMISSION_URL = BASE_URL + '/kyc/client/submit';

interface UserBrokerResponse {
	data: {
		brokerData: BrokerDetails;
	};
}

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
			const res = await axios.get(`${BASE_URL}/${USER_PROFILE_ENDPOINT}`, {
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
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		}
	}

	static async getUserAndBrokerInfo(clientId: string, submissionId: string) {
		if (!clientId || !submissionId)
			throw new Error('missing client or submission ids');

		try {
			const res = await axios<unknown, AxiosResponse<UserBrokerResponse>>(
				SUBMISSION_URL + `?clientID=${clientId}&submissionID=${submissionId}`,
				{
					withCredentials: true,
				}
			);

			if (res.status === 200) {
				const { broker_id, org_code, org_con1_email, org_cty, org_email } =
					res.data.data.brokerData;

				return { broker_id, org_code, org_con1_email, org_cty, org_email };
			}

			console.log(res);
		} catch (error) {
			console.log(error);
		}
	}

	static async isClientIdValid(clientId: string) {
		if (!clientId) throw new Error('missing client or submission ids');

		try {
			const res = await axios<
				unknown,
				AxiosResponse<{ Status: 'Invalid' | 'Valid' }>
			>(SUBMISSION_URL + `/${clientId}`, {
				withCredentials: true,
			});

			if (res.status === 200) {
				return res.data.Status === 'Valid';
			}
            console.log( res );

            return false;
		} catch (error) {
            console.log( error );
            return false
		}
	}
}

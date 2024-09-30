import { useEffect, useCallback } from 'react';
import type { UseFormReset } from 'react-hook-form';
import { ClientType } from '@/pages/onboarding/individual';
import INDIVIDUAL_FORM_DEFAULTS from '../../../../../../utils/vars/_formDefaults/defaults_individual.json';
import type { IndividualFormSchema } from '@/types/forms/individual';

const MAX_APPLICANTS_JOINT_ACCOUNT = 2;

export default function useApplicantAdjustor(
	clientType: ClientType,
	reset: UseFormReset<IndividualFormSchema>
) {
	const adjustApplicantCount = useCallback(
		(clientConfig: ClientType) => {
			if (clientConfig === ClientType.INDIVIDUAL) {
				reset((currentFormValues) => ({
					...currentFormValues,
					_formMetadata: {
						applicant: [currentFormValues._formMetadata.applicant[0]],
					},
					applicant: [currentFormValues.applicant[0]],
				}));
				return;
			}

			reset((currentFormValues) => {
				const applicantCount = currentFormValues.applicant?.length;
				const formMetadataCount = currentFormValues.applicant?.length;

				if (
					applicantCount < MAX_APPLICANTS_JOINT_ACCOUNT ||
					formMetadataCount < MAX_APPLICANTS_JOINT_ACCOUNT
				) {
					return {
						...currentFormValues,
						_formMetadata: {
							applicant: [
								...currentFormValues._formMetadata.applicant,
								{ ...INDIVIDUAL_FORM_DEFAULTS._formMetadata.applicant[0] },
							],
						},
						applicant: [
							...currentFormValues.applicant,
							{ ...INDIVIDUAL_FORM_DEFAULTS.applicant[0], id: 2 },
						],
					};
				}

				return currentFormValues;
			});
		},
		[reset]
	);

	useEffect(() => {
		adjustApplicantCount(clientType);
	}, [clientType, adjustApplicantCount]);
}

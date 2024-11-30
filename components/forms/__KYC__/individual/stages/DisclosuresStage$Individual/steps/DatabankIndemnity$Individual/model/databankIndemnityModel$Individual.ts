import type { FormFactoryProps } from '@/types/Components/formFactory';

export const databankIndemnityModel$Individual = ({
	index,
	clientID = '',
}: {
	index: number;
	clientID?: string;
}): FormFactoryProps[] => [
	{
        fieldType: 'signature',
        label: '',
		name: `applicant.${index}.disclosures.databank.emailIndemnity.signatureResource`,
		componentProps: {
			clientID: clientID,
		},
	},
];

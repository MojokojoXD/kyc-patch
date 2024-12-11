import type { FormFactoryProps } from '@/types/Components/formFactory';

export const afrinvestIndemnityModel$Individual: FormFactoryProps[] = [
	{
		fieldType: 'agreement',
		name: `agreements.afrinvest.emailIndemnity.agreed`,
		label: 'I/We agree to the above indemnity provisions',
		componentProps: {
      agreementVersion: '1.0',
		},
	},
];

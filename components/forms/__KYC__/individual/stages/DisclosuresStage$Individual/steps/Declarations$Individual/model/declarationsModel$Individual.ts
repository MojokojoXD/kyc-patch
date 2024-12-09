import type { FormFactoryProps } from '@/types/Components/formFactory';

export const declarationsModel$Individual: FormFactoryProps[] = [
	{
		fieldType: 'agreement',
		name: `agreements.declarations.agreed`,
		label: 'I/We agree to the above declarations',
		componentProps: {
			type: 'agreement',
			agreementVersion: '1.0',
		},
	},
];

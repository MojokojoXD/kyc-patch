import type { FormFactoryProps } from '@/types/Components/formFactory';

export const afrinvestIndemnityModel$Corporate: FormFactoryProps[] = [
	{
		fieldType: 'agreement',
        name: `disclosures.afrinvest.emailIndemnity.agreed`,
        label: 'I/We agree to the above indemnity provisions.',
		rules: {
			required: 'You must accept the term above to continue',
        },
        componentProps: {
            agreementVersion: '1.0',
        }
	},
];

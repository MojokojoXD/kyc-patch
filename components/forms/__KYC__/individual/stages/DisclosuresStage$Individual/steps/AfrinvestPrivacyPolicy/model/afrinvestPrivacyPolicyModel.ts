import type { FormFactoryProps } from '@/types/Components/formFactory';

export const afrinvestPrivacyPolicyModel: FormFactoryProps[] = [
	{
		fieldType: 'agreement',
		name: `agreements.afrinvest.privacyPolicy.agreed`,
		label:
			'We can confirm that, we have read, understood and hereby accept the above privacy statement and we expressly give our consent and authorise you to collect, process and use our personal data for the provision of financial services to us.',
		rules: {
			required: 'You must accept the above privacy policy to continue',
			validate: (v) =>
				Boolean(v) || 'You must accept the above privacy policy to continue',
		},
		componentProps: {
			agreementVersion: '1.0',
		},
	},
];

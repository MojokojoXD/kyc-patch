import type { FormFactoryProps } from '@/types/Components/formFactory';

export const incorporationFields = ({}: { index?: number }): FormFactoryProps[] => [
	{
		fieldType: 'text',
		name: 'businessInfo.incorporation.certificateNo',
		label: 'Incorporation/Certificate Number',
		placeholder: 'Enter certificate number',
		rules: {
			required: 'Please enter certificate number',
		},
	},
	{
		fieldType: 'text',
		name: 'businessInfo.incorporation.tin',
		label: 'Tax Identification Number',
		placeholder: 'Enter TIN',
	},
	{
		fieldType: 'text',
		name: 'businessInfo.incorporation.KRAPin',
		label: 'KRA PIN',
		placeholder: 'Enter KRA PIN',
		tags: ['KESTR'],
	},
	{
		fieldType: 'date',
		name: 'businessInfo.incorporation.date',
		label: 'Date of Incorporation',
		rules: {
			required: 'Select date',
		},
		componentProps: {
			disableFutureDays: true,
		},
	},
	{
		fieldType: 'text',
		name: 'businessInfo.incorporation.licenseNo',
		label: 'License Number',
		placeholder: 'Enter license number',
		rules: {
			required: 'Please enter license number',
		},
	},
	{
		fieldType: 'dropdown',
		name: 'businessInfo.incorporation.parentCountryIncorporation',
		label: "Parent Company's Country of Incorporation (If Applicable)",
		placeholder: 'Select country',
		componentProps: {
			isCountryList: true,
		},
	},
];

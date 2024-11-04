import type { FormFactoryProps } from '@/types/Components/formFactory';
import type { Country,CountryList } from '@/types/forms/common';

const today = new Date();

export const incorporationFields = ({
	countryList = [],
}: {
	index?: number;
	countryList?: CountryList;
}): FormFactoryProps[] => [
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
	},
	{
		fieldType: 'date',
		name: 'businessInfo.incorporation.date',
		label: 'Date of Incorporation',
		rules: {
			required: 'Select date',
		},
		componentProps: {
			endMonth: today,
			defaultMonth: today,
			disabled: { after: today },
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
		options: {
			keys: countryList[1],
			keySelector(key) {
				return (key as Country).cty_name;
			},
			priorityKeys: countryList[0],
		},
	},
];

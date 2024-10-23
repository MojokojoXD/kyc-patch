import type { FormFactoryProps } from '@/types/Components/formFactory';
import type { Country } from '@/types/forms/universal';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import validator from 'validator';

const NOK_contactFieldsModel = ({
	index,
	countryList = [],
}: {
	index: number;
	countryList?: Country[];
}): FormFactoryProps[] => [
	{
		fieldType: 'text',
		name: `nextOfKin.${index}.contacts.residentialAddress`,
		label: 'Residential Address (Not P.O Box)',
		placeholder: 'Enter residential address',
		rules: {
			required: 'Please enter residential address',
		},
	},
	{
		fieldType: 'text',
		name: `nextOfKin.${index}.contacts.city`,
		label: 'City/Town',
		placeholder: 'Enter city/town',
		rules: {
			required: 'Please enter city/town',
		},
	},
	{
		fieldType: 'phone',
		name: `nextOfKin.${index}.contacts.phoneNumber`,
		label: 'Phone Number',
		placeholder: 'Enter phone number',
		rules: {
			required: 'Please enter phone number',
			validate: (v) =>
				isPossiblePhoneNumber(v) || 'Please enter valid phone number',
		},
		componentProps: {
			phoneMode: 'single',
		},
		options: {
			keySelector: (key) => (key as Country).cty_name,
			keys: countryList,
			priorityKeys: (keys) =>
				(keys as Country[]).filter(
					(k) =>
						k.cty_code === 'GH' ||
						k.cty_code === 'NG' ||
						k.cty_code === 'KE'
				),
		},
        },
        {
            fieldType: 'text',
            name: `nextOfKin.${index}.contacts.email`,
            label: 'Email Address (Optional)',
            placeholder: 'Enter email',
        },
];

export { NOK_contactFieldsModel };

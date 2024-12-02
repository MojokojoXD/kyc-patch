import type { FormFactoryProps } from '@/types/Components/formFactory';
import type { CountryList } from '@/types/forms/common';

export const contactModel$NOK$Individual = ({
	index,
	countryList = [],
}: {
	index: number;
	countryList?: CountryList;
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
		componentProps: {
			phoneMode: 'single',
		},
		options: {
			keys: countryList[1],
			priorityKeys: countryList[0],
		},
        },
        {
            fieldType: 'text',
            name: `nextOfKin.${index}.contacts.email`,
            label: 'Email Address (Optional)',
            placeholder: 'Enter email',
        },
];


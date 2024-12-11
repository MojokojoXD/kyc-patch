import type { FormFactoryProps } from '@/types/Components/formFactory';

export const contactModel$NOK$Individual = ({
	index,
}: {
	index: number;
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
        },
        {
            fieldType: 'text',
            name: `nextOfKin.${index}.contacts.email`,
            label: 'Email Address (Optional)',
            placeholder: 'Enter email',
        },
];


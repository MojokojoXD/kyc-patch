import type { FormFactoryProps } from "@/types/Components/formFactory";

const retailClientFields: FormFactoryProps[] = [
	{
		fieldType: 'radio',
		name: 'clientType',
		defaultValue: 'Individual',
        label: 'Client Type',
		options: {
			keySelector: (key) => key as string,
			keys: ['Individual', 'Joint Account'],
		},
		componentProps: {
			className: 'grid grid-cols-2 gap-[4px]',
        },
	},
	{
		fieldType: 'radio',
		name: 'clientStatus',
        label: 'Client Status',
		options: {
			keySelector: (key) => key as string,
			keys: ['New Client', 'Existing Client'],
		},
		componentProps: {
			className: 'grid grid-cols-2 gap-[4px]',
        },
        rules: {
            required: 'Select client status'
        }
	},
];

export { retailClientFields };

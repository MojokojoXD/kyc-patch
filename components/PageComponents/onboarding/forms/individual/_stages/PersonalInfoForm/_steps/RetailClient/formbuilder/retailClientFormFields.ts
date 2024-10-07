import type { FormFactoryProps } from '@/components/UIcomponents/FormFactory';

const retailClientFields: FormFactoryProps[] = [
	{
		fieldType: 'radio',
		name: 'clientType',
		defaultValue: 'Individual',
        label: 'Client Type',
		options: {
			keySelector: (key: string) => key,
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
			keySelector: (key: string) => key,
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

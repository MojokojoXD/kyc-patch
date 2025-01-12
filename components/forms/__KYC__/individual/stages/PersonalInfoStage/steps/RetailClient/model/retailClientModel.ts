import type { FormFactoryProps } from '@/types/Components/formFactory';

export const retailClientModel: FormFactoryProps[] = [
	{
		fieldType: 'radio',
		name: 'clientType',
		defaultValue: 'Individual',
		label: 'Client Type',
		options: {
			keys: ['Individual', 'Joint Account','SSX'],
		},
    componentProps: {
			classNames: { radioGroupStyles: 'grid grid-cols-2 gap-[4px]' },
		},
  },
  {
    fieldType: 'text',
    name: 'clientName',
    label: 'Client Name',
    placeholder: 'Client Name goes here'
  },
	{
		fieldType: 'radio',
		name: 'clientStatus',
		label: 'Client Status',
		options: {
			keys: ['New Client', 'Existing Client'],
		},
		componentProps: {
			classNames: {radioGroupStyles: 'grid grid-cols-2 gap-[4px]'},
		},
		rules: {
			required: 'Select client status',
		},
	},
];

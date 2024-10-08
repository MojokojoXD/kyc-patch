import type { FormFactoryProps } from '@/components/UIcomponents/FormFactory';
import { isPossiblePhoneNumber } from 'react-phone-number-input';

const KESTREL_CONTACT_FIELDS = (indexer: number): FormFactoryProps[] => [
	{
		fieldType: 'text',
		name: `applicant.${indexer}.contacts.postalCode`,
		label: 'Zip/Postal Code',
        placeholder: 'Enter zip/postal code',
        rules: {
            required: 'Please enter zip/postal code'
        }
    },
	{
		fieldType: 'phone',
		name: `applicant.${indexer}.contacts.faxNumber`,
		label: 'Fax Number',
        placeholder: 'Enter Fax Number',
        rules: {
            required: 'Please enter fax number',
            validate: v => isPossiblePhoneNumber(v) || 'Please enter valid phone number'
        },
        componentProps: {
            phoneMode: 'single'
        }
    },
    
];

export { KESTREL_CONTACT_FIELDS }

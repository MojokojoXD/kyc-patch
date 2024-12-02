import type { FormFactoryProps } from "@/types/Components/formFactory";
import type { CountryList } from "@/types/forms/common";
import validator from 'validator';

export const addClientFormModel = ( { countryList = [] }: { countryList?: CountryList } ): FormFactoryProps[] => [
    {
        fieldType: 'text',
        name: 'clientFirstName',
        label: 'First Name',
        placeholder: 'First name',
        rules: {
            required: 'Please enter first name',
            minLength: {
                value: 2,
                message: 'Entry is too short'
            }
        }
    },
    {
        fieldType: 'text',
        name: 'clientLastName',
        label: 'Last Name',
        placeholder: 'Last name',
        rules: {
            required: 'Please enter last name',
            minLength: {
                value: 2,
                message: 'Entry is too short'
            }
        }
    },
    {
        fieldType: 'phone',
        name: 'clientPhone',
        label: 'Phone Number',
        placeholder: 'Enter Phone Number',
        options: {
            keys: countryList[ 1 ],
            priorityKeys: countryList[ 0 ],
        },
        componentProps: {
            phoneMode: 'single'
        }
    },
    {
        fieldType: 'text',
        name: 'clientEmail',
        label: 'Email Address',
        placeholder: 'Enter email address',
        rules: {
            required: 'Please enter email address',
            validate: v => (typeof v === 'string' && validator.isEmail( v )) || 'Email must be of the format: name@example.com'
        }
    },
    {
        fieldType: 'radio',
        name: 'typeOfClient',
        label: 'Client Type',
        rules: {
            required: 'Select client type'
        },
        options: {
            keys: [ 'Individual or Joint', 'Corporate' ]
        }
    }
]
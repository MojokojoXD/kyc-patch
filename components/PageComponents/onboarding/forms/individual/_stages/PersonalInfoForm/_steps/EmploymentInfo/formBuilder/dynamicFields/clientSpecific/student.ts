import type { FormFactoryProps } from "@/components/UIcomponents/FormFactory";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import validator from "validator";

const studentFields = ( indexer: number ): FormFactoryProps[] => [
    {
        fieldType: 'phone',
        name: `applicant.${ indexer }.employment.statusDetails.phoneNumber`,
        label: 'Employer/Business/School Phone Number',
        placeholder: 'Enter phone number',
        rules: {
            required: 'Please enter phone number',
            validate: v => isPossiblePhoneNumber(v) || 'Please enter valid phone number'
        },
        componentProps: {
            phoneMode: 'multi'
        }
    },
    {
        fieldType: 'text',
        name: `applicant.${ indexer }.employment.statusDetails.email`,
        label: 'Employer/Business/School Email Address',
        placeholder: 'Enter email address',
        rules: {
            required: 'Please enter email address',
            validate: v => validator.isEmail(v) || 'Email must be of the format: name@example.com'
        },
        componentProps: {
            phoneMode: 'multi'
        }
    }
];

export { studentFields }
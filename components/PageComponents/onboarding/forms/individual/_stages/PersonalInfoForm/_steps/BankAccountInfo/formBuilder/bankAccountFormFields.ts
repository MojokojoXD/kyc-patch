import type { FormFactoryProps } from '@/types/forms/Components/FormFactory';
import type { Country, Bank } from "@/types/forms/universal";
import countries from '@/utils/vars/_formDefaults/countries.json'

const baseBankAccountFields = ( index: number ): FormFactoryProps[] => [
    {
        fieldType: 'dropdown',
        name: `applicant.${ index }.bank.name`,
        label: 'Bank Country',
        placeholder: 'Select country',
        rules: {
            required: 'Select country'
        },
        options: {
            keySelector: ( key ) => key.cty_name,
            k
        }
    }
]
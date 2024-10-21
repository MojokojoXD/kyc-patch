import type { FormFactoryProps } from '@/types/Components/formFactory';
import type { Country } from '@/types/forms/universal';
// import validator from 'validator';

const today = new Date();

const NOK_bioFieldsModel = ({
	index,
	countryList = [],
}: {
	index: number;
	countryList?: Country[];
}): FormFactoryProps[] => [
	{
		fieldType: 'radio',
		name: `nextOfKin.${index}.title.presets`,
		label: 'Title',
		options: {
			keySelector: (key) => key as string,
			keys: ['Mr', 'Mrs', 'Ms', 'Prof', 'Dr'],
        },
        rules: {
            required: 'Select Title'
        },
		componentProps: {
			className: 'grid grid-cols-5',
		},
	},
	{
		fieldType: 'text',
		inline: true,
		name: `nextOfKin.${index}.firstName`,
		label: 'Full Name',
		rules: {
			required: 'Please enter first name',
			validate: (v: string) => v.length > 1 || 'entry is too short',
		},
		placeholder: 'First name',
	},
	{
		fieldType: 'text',
		inline: true,
		name: `nextOfKin.${index}.middleName`,
		label: '',
		placeholder: 'Middle name(Optional)',
	},
	{
		fieldType: 'text',
		inline: true,
		name: `nextOfKin.${index}.lastName`,
		label: '',
		rules: {
			required: 'Please enter last name',
			validate: (v: string) => v.length > 1 || 'entry is too short',
		},
		placeholder: 'Last name',
	},
	{
		fieldType: 'date',
		name: `nextOfKin.${index}.dateOfBirth`,
		label: 'Date of Birth',
		rules: {
			required: 'Select date of birth',
		},
		placeholder: 'Select dates',
		componentProps: {
			disabled: { after: today },
			defaultMonth: today,
			startMonth: today,
		},
        },
        {
            fieldType: 'text',
            name: `nextOfKin.${index}.relationshipToApplicant`,
            label: 'Relationship to Applicant',
            placeholder: 'Enter relationship to applicant',
            rules: {
                required: 'Please enter relationship to applicant'
            }
        },
        {
            fieldType: 'radio',
            name: `nextOfKin.${index}.gender`,
            label: 'Gender',
            rules: {
                required: 'Select gender',
            },
            options: {
                keySelector: (key) => key as string,
                keys: [ 'Male', 'Female' ],
            },
            componentProps: {
                className: 'grid grid-cols-2 gap-[4px]',
            },
        },
        {
            fieldType: 'radio',
            name: `nextOfKin.${index}.maritalStatus`,
            label: 'Marital Status',
            rules: {
                required: 'Select marital status',
            },
            options: {
                keySelector: (key) => key as string,
                keys: ['Single','Married','Divorced','Separated'],
            },
            componentProps: {
                className: 'grid grid-cols-4 gap-[4px]',
            },
        },
        {
            fieldType: 'dropdown',
            name: `nextOfKin.${index}.countryOfBirth`,
            label: 'Country of Birth',
            rules: {
                required: 'Select country of birth',
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
            placeholder: 'Select country',
        },
        {
            fieldType: 'text',
            name: `nextOfKin.${index}.placeOfBirth`,
            label: 'Place of Birth(Optional)',
            placeholder: 'Enter place of birth',
        },
        {
            fieldType: 'dropdown',
            name: `nextOfKin.${index}.countryOfResidence`,
            label: 'Country of Residence',
            rules: {
                required: 'Select country of residence',
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
            placeholder: 'Select country',
        },
    
        {
            fieldType: 'dropdown',
            name: `nextOfKin.${index}.countryOfCitizenship`,
            label: 'Nationality/Country of Citizenship',
            rules: {
                required: 'Select nationality',
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
            placeholder: 'Select country',
        },
        {
            fieldType: 'text',
            name: `nextOfKin.${ index }.percentageAllocation`,
            label: 'Percentage Allocation (Optional)',
            placeholder: 'Enter number',
        }
];

export { NOK_bioFieldsModel };

import type { FormFactoryProps } from '@/types/Components/formFactory';

export const signatureUploadModel = ({
  index,
}: {
    index: number;
}): FormFactoryProps[] => [
	{
		fieldType: 'signature',
		name: `applicant.${index}.disclosures.signatureResource`,
		label: 'Signature',
		rules: {
			required: 'Please upload your signature',
		},
    componentProps: {
      fileNameEncoding: [
        `applicant.${ index }.firstName`,
        `applicant.${ index }.middleName`,
        `applicant.${ index }.lastName`,
        `applicant.${ index }.contacts.email`,
      ]
		},
	},
];

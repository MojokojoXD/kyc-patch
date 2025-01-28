import type { FormFactoryProps } from '@/types/Components/formFactory';

export const kestrelNomineeModel$Individual = ({ index }: { index: number }): FormFactoryProps[] => [
  {
    fieldType: 'signature',
    label: 'Signature',
    name: `applicant.${index}.disclosures.kestrel.nomineeAgreement.signatureResource`,
    rules: {
      required: 'Please upload signature',
    },
    componentProps: {
      fileNameEncoding: [
        `applicant.${index}.firstName`,
        `applicant.${index}.lastName`,
        `applicant.${index}.contacts.email`,
      ],
    },
  },
];

import type { FormFactoryProps } from '@/types/Components/formFactory';

export const databankIndemnityModel$Individual = ({
  index,
}: {
  index: number;
}): FormFactoryProps[] => [
  {
    fieldType: 'signature',
    label: '',
    name: `applicant.${index}.disclosures.databank.emailIndemnity.signatureResource`,
    componentProps: {
      fileNameEncoding: [
        `applicant.${index}.firstName`,
        `applicant.${index}.lastName`,
        `applicant.${index}.contacts.email`,
      ],
    },
  },
];

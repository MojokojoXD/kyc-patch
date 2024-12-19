import type { BeneficialOwner, Director, Signatory } from '@/types/forms/corporateSchema';
import { directorsDefaultValues } from '../steps/Directors/model/directorsModel';

/* 
  - for convenients I'm terming both directors and beneficiaries as officials
  - remove all officials forms with _fillSrc not set
  - filter out manually added officials forms.
  - get all existing official ids to compare with current signatory officials
  - if there's an exisiting signatory official, merge new and old data
  - if not create and new signatory official if there's a new signatory or discard existing signatory official if corresponding signatory id doesn't exist.
  - combine auto filled official with manually filled director with auto filled ones taking precedence
*/

export function directorOrBeneficialOwnerBuilder(
  currentSignatories: Signatory[],
  existingDirectors: Director[],
  config: 'directors'
): Director[];
export function directorOrBeneficialOwnerBuilder(
  currentSignatories: Signatory[],
  exisitingBeneficiaries: BeneficialOwner[],
  config: 'beneficiaries'
): BeneficialOwner[];
export function directorOrBeneficialOwnerBuilder(
  currentSignatories: Signatory[],
  existingOfficial: (Director | BeneficialOwner)[] = [],
  config: 'directors' | 'beneficiaries'
) {
  const existingOfficialCopy = [...existingOfficial.filter(o => typeof o._fillSrc !== 'undefined')];

  const manualOfficial = existingOfficialCopy.filter(d => d._fillSrc === 'MANUAL');

  if (!currentSignatories.some(s => s.role.length > 0)) return [...manualOfficial];

  const existingAutoOfficialIDs = existingOfficialCopy
    .filter(d => d._fillSrc === 'AUTO')
    .map(d => d._id);

  const updatedOrNewOfficial: (Director | BeneficialOwner)[] = [];

  for (const signatory of currentSignatories) {
    if (signatory.role.includes('Director/Executive/Trustee/Admin') && config === 'directors') {
      updatedOrNewOfficial.push({
        ...(existingAutoOfficialIDs.includes(signatory._id)
          ? existingOfficialCopy.find(o => o._id === signatory._id)!
          : directorsDefaultValues),
        _id: signatory._id,
        firstName: signatory.firstName,
        middleName: signatory.middleName ?? '',
        lastName: signatory.lastName,
        phoneNumber: signatory.address.phoneNumber,
        pepInfo: signatory.pepInfo,
        idNumber: signatory.proofOfIdentity.idNumber,
        idType: signatory.proofOfIdentity.idType,
        _fillSrc: 'AUTO',
      });
      continue;
    }

    if (signatory.role.includes('Beneficial Owner') && config === 'beneficiaries') {
      updatedOrNewOfficial.push({
        ...(existingAutoOfficialIDs.includes(signatory._id)
          ? existingOfficialCopy.find(o => o._id === signatory._id)!
          : directorsDefaultValues),
        _id: signatory._id,
        firstName: signatory.firstName,
        middleName: signatory.middleName ?? '',
        lastName: signatory.lastName,
        phoneNumber: signatory.address.phoneNumber,
        pepInfo: signatory.pepInfo,
        idNumber: signatory.proofOfIdentity.idNumber,
        idType: signatory.proofOfIdentity.idType,
        dateOfBirth: signatory.dateOfBirth,
        residentialAddress: `${signatory.address.residentialAddress} ${signatory.address.city} ${signatory.countryOfResidence}`,
        _fillSrc: 'AUTO',
      });
    }
  }

  return [...updatedOrNewOfficial, ...manualOfficial];
}

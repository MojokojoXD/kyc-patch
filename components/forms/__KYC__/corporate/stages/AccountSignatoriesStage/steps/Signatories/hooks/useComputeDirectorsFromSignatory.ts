import { useMemo } from "react";
import type { Director, Signatory } from "@/types/forms/corporateSchema";
import { directorsDefaultValues } from "../../Directors/model/directorsModel";


export function useComputeDirectorsFromSignatory( currentSignatory: Signatory, exisitingDirectors: Director[] )
{
  const {
    role,
    _id,
    firstName,
    middleName,
    lastName,
    address: { phoneNumber },
  } = currentSignatory;

  return useMemo( () =>
  {

    const tempDirectors = [ ...exisitingDirectors ];
    const existingSignatoryDirectorIndex = tempDirectors.findIndex(
    d => d.id === _id && d.isPrefill );


    if ( role.includes( 'Director/Executive/Trustee/Admin' ) )
    {

    const existingDirectorOrNewDirector: Director =
         {
          ...( existingSignatoryDirectorIndex > -1 ? tempDirectors[existingSignatoryDirectorIndex] : directorsDefaultValues),
          id: _id,
          isPrefill: true,
          firstName,
          lastName,
          middleName: middleName ?? '',
          phoneNumber,
    };
      
      if ( existingSignatoryDirectorIndex === -1 ) return[ existingDirectorOrNewDirector, ...tempDirectors ];
      
      tempDirectors[ existingSignatoryDirectorIndex ] = {...existingDirectorOrNewDirector }
      
      return tempDirectors;
    } else if ( !role.includes( 'Director/Executive/Trustee/Admin' ) && existingSignatoryDirectorIndex > -1 )
    {
      tempDirectors.splice( existingSignatoryDirectorIndex, 1 );
      return tempDirectors;
    }


    
  },[_id, exisitingDirectors, firstName, lastName, middleName, phoneNumber, role])

}